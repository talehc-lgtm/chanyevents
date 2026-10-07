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
  age?: number | null
  height_cm?: number | null
  speaks_french?: boolean | null
  speaks_english?: boolean | null
  full_availability?: boolean | null
  cv_path?: string | null
  photo_paths?: string[] | null
  profile?: Record<string, unknown> | null
}

const isHostessRole = (p: string) => /h[ôo]tesse/i.test(p)

function expHits(app: ApplicationPayload, keywords: string[]) {
  const text = `${app.experience ?? ''} ${app.message ?? ''}`.toLowerCase()
  return keywords.filter((k) => text.includes(k)).length
}

// ---- Rule-based score (0-100) aligned with the In Vino Italia Douala 2026 casting criteria ----
function computeRuleScore(app: ApplicationPayload): number {
  let score = 0
  const douala = !!app.city && /douala/i.test(app.city)
  const hasExp = !!app.experience && app.experience.trim().length > 10
  if (isHostessRole(app.position)) {
    if (app.age != null && app.age >= 21 && app.age <= 30) score += 15
    if (douala) score += 15
    if (app.height_cm != null && app.height_cm >= 175) score += 15
    score += langPts(app, 'lang_fr', 7) + langPts(app, 'lang_en', 8)
    if (app.full_availability) score += 10
    if (hasExp) score += 6
    score += Math.min(expHits(app, ['événement', 'evenement', 'event', 'hôtesse', 'hotesse', 'accueil', 'salon', 'foire', 'protocole', 'stand']) * 3, 9)
    if (app.cv_path) score += 8
    if ((app.photo_paths?.length ?? 0) >= 2) score += 7
  } else {
    if (douala) score += 20
    score += langPts(app, 'lang_fr', 10) + langPts(app, 'lang_en', 10)
    if (app.full_availability) score += 15
    if (hasExp) score += 10
    score += Math.min(expHits(app, ['événement', 'evenement', 'event', 'logistique', 'secrétariat', 'secretariat', 'coordination', 'salon', 'organisation', 'exposant', 'prestataire']) * 4, 20)
    if (app.cv_path) score += 15
  }
  const pr = app.profile ?? {}
  // Image-rights consent is mandatory: an unsigned application cannot score above 40
  if (!pr.image_rights || !String(pr.signature_name ?? '').trim()) score = Math.min(score, 40)
  if ((app.age ?? 99) < 18 && !String(pr.parent_signature ?? '').trim()) score = Math.min(score, 30)
  return Math.max(0, Math.min(score, 100))
}

function langPts(app: ApplicationPayload, key: string, max: number) {
  const lvl = String(app.profile?.[key] ?? '')
  if (lvl === 'courant') return max
  if (lvl === 'moyen') return Math.round(max * 0.6)
  if (lvl === 'notions') return Math.round(max * 0.2)
  return key === 'lang_fr' ? (app.speaks_french ? max : 0) : (app.speaks_english ? max : 0)
}

// ---- AI evaluation via Lovable AI Gateway (Responses API, streamed) ----
async function aiEvaluate(app: ApplicationPayload): Promise<{ summary: string; recommendation: string } | null> {
  const apiKey = Deno.env.get('LOVABLE_API_KEY')
  if (!apiKey) return null

  const hostess = isHostessRole(app.position)
  const criteria = hostess
    ? "âgée de 21 à 30 ans, résidant à Douala, taille minimum 1,75 m, bonne présentation, maîtrise du français et de l'anglais, expérience dans l'événementiel, disponible les 26, 27 et 28 novembre, dynamique, organisée et à l'aise avec le public. Dossier complet : CV + une photo professionnelle + une photo en tenue de ville."
    : "résidant à Douala, expérience en événementiel, logistique ou secrétariat, maîtrise du français et de l'anglais, disponible pendant toute la période, organisé, ponctuel et à l'aise en équipe. Dossier complet : CV."
  const yn = (b?: boolean | null) => (b ? 'oui' : 'non')

  const prompt = `Tu es un recruteur senior pour une agence événementielle premium au Cameroun.
Évalue cette candidature pour le poste « ${app.position} » au salon In Vino Italia Douala (1er Salon des Vins Italiens en Afrique Centrale, 26-28 novembre 2026, Best Western Plus Soaho Hotel, Douala).
Critères officiels : ${criteria}
Seules les candidatures complètes répondant aux critères sont examinées : signale clairement tout critère non rempli ou information manquante. Le droit à l'image doit être accepté et signé (et l'autorisation parentale pour les mineurs). Tiens compte des mensurations, du domaine de compétence, des niveaux de langue, des études et de la disponibilité indiqués dans la fiche.

Candidature :
- Nom : ${app.full_name}
- Téléphone : ${app.phone}
- Email : ${app.email ?? 'non fourni'}
- Ville : ${app.city ?? 'non fournie'}
- Âge : ${app.age ?? 'non indiqué'}
${hostess ? `- Taille : ${app.height_cm ? app.height_cm + ' cm' : 'non indiquée'}\n` : ''}- Français : ${yn(app.speaks_french)} / Anglais : ${yn(app.speaks_english)}
- Disponible sur toute la période : ${yn(app.full_availability)}
- CV joint : ${yn(!!app.cv_path)}${hostess ? `\n- Photos jointes (professionnelle + tenue de ville) : ${app.photo_paths?.length ?? 0}/2` : ''}
- Expériences récentes : ${app.experience ?? 'non renseignées'}
- Fiche casting complète (JSON) : ${JSON.stringify(app.profile ?? {}).slice(0, 4000)}
- Message : ${app.message ?? 'aucun'}

Réponds en JSON avec exactement deux champs :
- "summary" : résumé du profil en 2-3 phrases en français, en citant les critères remplis et non remplis.
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
