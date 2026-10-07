import { corsHeaders } from 'npm:@supabase/supabase-js@2/cors'
import { createClient } from 'npm:@supabase/supabase-js@2'

const headers = { ...corsHeaders }
const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: { ...headers, 'Content-Type': 'application/json' } })

const TABLES = ['job_applications', 'quote_requests', 'contact_messages'] as const
const STATUSES = ['new', 'in_progress', 'done']

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers })

  try {
    const supabase = createClient(Deno.env.get('SUPABASE_URL')!, Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!)

    let body: any = {}
    try { body = await req.json() } catch { /* empty body */ }
    const action = body?.action ?? 'list'

    const { count: adminCount, error: countError } = await supabase
      .from('user_roles')
      .select('id', { count: 'exact', head: true })
      .eq('role', 'admin')
    if (countError) return json({ error: countError.message }, 500)

    if (action === 'admin_status') return json({ hasAdmin: (adminCount ?? 0) > 0 })

    if (action === 'bootstrap_admin') {
      if ((adminCount ?? 0) > 0) return json({ error: 'Un administrateur existe déjà.' }, 409)
      const expectedCode = Deno.env.get('ADMIN_ACCESS_CODE')
      if (!expectedCode || body?.setupCode !== expectedCode) return json({ error: 'Code de configuration incorrect.' }, 401)
      if (typeof body?.email !== 'string' || typeof body?.password !== 'string' || body.password.length < 8) {
        return json({ error: 'Email ou mot de passe invalide.' }, 400)
      }
      const { data: created, error: createError } = await supabase.auth.admin.createUser({
        email: body.email.trim().toLowerCase(),
        password: body.password,
        email_confirm: true,
      })
      if (createError || !created.user) return json({ error: createError?.message ?? 'Création impossible.' }, 400)
      const { error: roleError } = await supabase.from('user_roles').insert({ user_id: created.user.id, role: 'admin' })
      if (roleError) {
        await supabase.auth.admin.deleteUser(created.user.id)
        return json({ error: roleError.message }, 500)
      }
      return json({ ok: true })
    }

    const authorization = req.headers.get('Authorization')
    const token = authorization?.replace(/^Bearer\s+/i, '')
    if (!token) return json({ error: 'Authentification requise.' }, 401)
    const { data: userData, error: userError } = await supabase.auth.getUser(token)
    if (userError || !userData.user) return json({ error: 'Session invalide.' }, 401)
    const { data: role } = await supabase
      .from('user_roles')
      .select('id')
      .eq('user_id', userData.user.id)
      .eq('role', 'admin')
      .maybeSingle()
    if (!role) return json({ error: 'Accès administrateur refusé.' }, 403)
    if (action === 'check_access') return json({ authorized: true })

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

    const sign = async (path: string) => {
      const { data } = await supabase.storage.from('applications').createSignedUrl(path, 60 * 60)
      return data?.signedUrl ?? null
    }
    const applications = await Promise.all((apps.data ?? []).map(async (a: any) => ({
      ...a,
      cv_url: a.cv_path ? await sign(a.cv_path) : null,
      photo_urls: a.photo_paths?.length ? (await Promise.all(a.photo_paths.map(sign))).filter(Boolean) : [],
    })))

    return json({ applications, quotes: quotes.data, messages: messages.data })
  } catch (err) {
    console.error(err)
    return json({ error: 'Internal error' }, 500)
  }
})
