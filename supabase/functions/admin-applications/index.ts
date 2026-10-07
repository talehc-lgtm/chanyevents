import { corsHeaders } from 'npm:@supabase/supabase-js@2/cors'
import { createClient } from 'npm:@supabase/supabase-js@2'

const headers = {
  ...corsHeaders,
  'Access-Control-Allow-Headers': `${corsHeaders['Access-Control-Allow-Headers']}, x-admin-code`,
}
const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: { ...headers, 'Content-Type': 'application/json' } })

const TABLES = ['job_applications', 'quote_requests', 'contact_messages'] as const
const STATUSES = ['new', 'in_progress', 'done']

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers })

  const expectedCode = Deno.env.get('ADMIN_ACCESS_CODE')
  const providedCode = req.headers.get('x-admin-code')
  if (!expectedCode || !providedCode || providedCode !== expectedCode) {
    return json({ error: 'Accès refusé' }, 401)
  }

  try {
    const supabase = createClient(Deno.env.get('SUPABASE_URL')!, Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!)

    let body: any = {}
    try { body = await req.json() } catch { /* empty body */ }
    const action = body?.action ?? 'list'

    if (action === 'update_status' || action === 'delete') {
      const table = body.table
      const id = body.id
      if (!TABLES.includes(table) || typeof id !== 'string' || !/^[0-9a-f-]{36}$/i.test(id)) {
        return json({ error: 'Invalid input' }, 400)
      }
      if (action === 'delete') {
        const { error } = await supabase.from(table).delete().eq('id', id)
        if (error) return json({ error: error.message }, 500)
        return json({ ok: true })
      }
      if (table === 'job_applications' || !STATUSES.includes(body.status)) {
        return json({ error: 'Invalid status' }, 400)
      }
      const { error } = await supabase.from(table).update({ status: body.status }).eq('id', id)
      if (error) return json({ error: error.message }, 500)
      return json({ ok: true })
    }

    const [apps, quotes, messages] = await Promise.all(
      TABLES.map((t) => supabase.from(t).select('*').order('created_at', { ascending: false })),
    )
    const err = apps.error || quotes.error || messages.error
    if (err) return json({ error: err.message }, 500)

    return json({ applications: apps.data, quotes: quotes.data, messages: messages.data })
  } catch (err) {
    console.error(err)
    return json({ error: 'Internal error' }, 500)
  }
})
