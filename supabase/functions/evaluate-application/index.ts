import { corsHeaders } from 'npm:@supabase/supabase-js@2/cors'
import { createClient } from 'npm:@supabase/supabase-js@2'

const GATEWAY_URL = 'https://ai.gateway.lovable.dev/v1/responses'
const MODEL = 'openai/gpt-6-astra'

interface ApplicationPayload {
  position: string
  full_name: string
  phone: string
  email?: string | null
  city?: string | null
  experience?: string | null
  message?: string | null
}

// ---- Rule-based score (0-100) ----
function computeRuleScore(app: ApplicationPayload): number {
  let score = 0
  // Completeness
  if (app.email) score += 10
  if (app.city) score += 10
  if (app.experience && app.experience.trim().length > 10) score += 15
  if (app.message && app.message.trim().length > 10) score += 5
  if (app.phone && app.phone.replace(/\D/g, '').length >= 8) score += 10
  // Douala residency (key requirement)
  if (app.city && /douala/i.test(app.city)) score += 25
  // Event experience keywords
  const text = `${app.experience ?? ''} ${app.message ?? ''}`.toLowerCase()
  const keywords = [
    'événement', 'evenement', 'event', 'accueil', 'hôtesse', 'hotesse',
    'salon', 'foire', 'logistique', 'coordination', 'protocole', 'stand',
    'animation', 'organisation', 'vip', 'mariage', 'cérémonie',
  ]
  const hits = keywords.filter((k) => text.includes(k)).length
  score += Math.min(hits * 5, 25)
  return Math.min(score, 100)
}

// ---- AI evaluation via Lovable AI Gateway (Responses API, streamed) ----
async function aiEvaluate(app: ApplicationPayload): Promise<{ summary: string; recommendation: string } | null> {
  const apiKey = Deno.env.get('LOVABLE_API_KEY')
  if (!apiKey) return null

  const prompt = `Tu es un recruteur senior pour une agence événementielle premium au Cameroun.
Évalue cette candidature pour le poste « ${app.position} » au salon In Vino Italia Douala (26-28 novembre 2026, Best Western Plus Soaha Hotel, Douala).
Exigences clés : résider à Douala, disponibilité sur toute la durée du salon, expérience événementielle, bonne présentation et sens du service.

Candidature :
- Nom : ${app.full_name}
- Téléphone : ${app.phone}
- Email : ${app.email ?? 'non fourni'}
- Ville : ${app.city ?? 'non fournie'}
- Expérience : ${app.experience ?? 'non renseignée'}
- Message : ${app.message ?? 'aucun'}

Réponds en JSON avec exactement deux champs :
- "summary" : résumé du profil en 2-3 phrases en français.
- "recommendation" : avis clair en français ("Profil recommandé", "Profil à considérer" ou "Profil peu adapté") suivi d'une courte justification.`

  const body = {
    model: MODEL,
    stream: true,
    store: false,
    reasoning: { effort: 'low', summary: 'auto' },
    include: ['reasoning.encrypted_content'],
    input: [{ role: 'user', content: prompt }],
    text: {
      format: {
        type: 'json_schema',
        name: 'evaluation',
        strict: true,
        schema: {
          type: 'object',
          properties: {
            summary: { type: 'string' },
            recommendation: { type: 'string' },
          },
          required: ['summary', 'recommendation'],
          additionalProperties: false,
        },
      },
    },
  }

  const res = await fetch(GATEWAY_URL, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
      'X-Lovable-AIG-SDK': 'fetch',
    },
    body: JSON.stringify(body),
  })

  if (!res.ok || !res.body) {
    console.error('AI gateway error', res.status, await res.text())
    return null
  }

  // Consume the SSE stream and accumulate output text deltas
  const reader = res.body.getReader()
  const decoder = new TextDecoder()
  let buffer = ''
  let outputText = ''

  for (;;) {
    const { done, value } = await reader.read()
    if (done) break
    buffer += decoder.decode(value, { stream: true })
    const lines = buffer.split('\n')
    buffer = lines.pop() ?? ''
    for (const line of lines) {
      if (!line.startsWith('data:')) continue
      const data = line.slice(5).trim()
      if (!data || data === '[DONE]') continue
      try {
        const event = JSON.parse(data)
        if (event.type === 'response.output_text.delta' && typeof event.delta === 'string') {
          outputText += event.delta
        } else if (event.type === 'response.completed' && event.response?.output) {
          for (const item of event.response.output) {
            if (item.type === 'message') {
              for (const part of item.content ?? []) {
                if (part.type === 'output_text' && typeof part.text === 'string' && !outputText) {
                  outputText = part.text
                }
              }
            }
          }
        }
      } catch {
        // ignore malformed SSE chunks
      }
    }
  }

  if (!outputText) return null
  try {
    const parsed = JSON.parse(outputText)
    if (typeof parsed.summary === 'string' && typeof parsed.recommendation === 'string') {
      return { summary: parsed.summary, recommendation: parsed.recommendation }
    }
    return null
  } catch {
    console.error('AI output parse failed', outputText.slice(0, 200))
    return null
  }
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const app: ApplicationPayload = await req.json()
    if (!app?.position || !app?.full_name || !app?.phone) {
      return new Response(JSON.stringify({ error: 'Missing required fields' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    )

    // Find the most recent unevaluated application matching this candidate
    const { data: rows, error: findError } = await supabase
      .from('job_applications')
      .select('id')
      .eq('phone', app.phone)
      .eq('full_name', app.full_name)
      .eq('position', app.position)
      .is('evaluated_at', null)
      .order('created_at', { ascending: false })
      .limit(1)

    if (findError || !rows?.length) {
      return new Response(JSON.stringify({ error: 'Application not found' }), {
        status: 404,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }

    const score = computeRuleScore(app)
    const ai = await aiEvaluate(app)

    const { error: updateError } = await supabase
      .from('job_applications')
      .update({
        score,
        ai_summary: ai?.summary ?? null,
        ai_recommendation: ai?.recommendation ?? null,
        evaluated_at: new Date().toISOString(),
      })
      .eq('id', rows[0].id)

    if (updateError) {
      return new Response(JSON.stringify({ error: updateError.message }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }

    return new Response(
      JSON.stringify({ ok: true, score, ai: ai ?? null }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  } catch (err) {
    console.error(err)
    return new Response(JSON.stringify({ error: 'Internal error' }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  }
})
