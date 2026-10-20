ALTER TABLE public.cw_applications ADD COLUMN source_application_id uuid;
CREATE UNIQUE INDEX cw_applications_event_source_unique ON public.cw_applications(event_id, source_application_id) WHERE source_application_id IS NOT NULL;
CREATE FUNCTION public.cw_import_received(_event_id uuid, _actor_id uuid) RETURNS jsonb LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE source public.job_applications%ROWTYPE; person_id uuid; inserted integer := 0; skipped integer := 0;
BEGIN
 IF NOT EXISTS (SELECT 1 FROM public.user_roles WHERE user_id=_actor_id AND role='admin') THEN RAISE EXCEPTION 'Accès administrateur requis'; END IF;
 PERFORM id FROM public.cw_events WHERE id=_event_id AND archived=false FOR UPDATE;
 IF NOT FOUND THEN RAISE EXCEPTION 'Événement absent ou archivé'; END IF;
 FOR source IN SELECT * FROM public.job_applications ORDER BY created_at,id LOOP
  IF EXISTS (SELECT 1 FROM public.cw_applications WHERE event_id=_event_id AND source_application_id=source.id) THEN skipped := skipped+1; CONTINUE; END IF;
  INSERT INTO public.cw_people(full_name,phone,normalized_phone,details) VALUES(source.full_name,source.phone,regexp_replace(source.phone,'[^0-9]','','g'),jsonb_build_object('email',coalesce(source.email,''),'city',coalesce(source.city,''),'district',coalesce(source.profile->>'district',''),'experiences',CASE WHEN coalesce(source.experience,'')<>'' THEN jsonb_build_array(jsonb_build_object('event','','role','','period','','tasks',source.experience)) ELSE '[]'::jsonb END,'languages','{}'::jsonb,'clothing','{}'::jsonb)) RETURNING id INTO person_id;
  INSERT INTO public.cw_applications(event_id,person_id,position,source_application_id,admin_notes) VALUES(_event_id,person_id,source.position,source.id,concat('Candidature reçue en ligne le ',to_char(source.created_at AT TIME ZONE 'Africa/Douala','DD/MM/YYYY'),'. Disponibilités à confirmer au casting.',CASE WHEN coalesce(source.message,'')<>'' THEN E'\n'+source.message ELSE '' END));
  inserted := inserted+1;
 END LOOP;
 INSERT INTO public.cw_audit(event_id,actor_id,action,detail) VALUES(_event_id,_actor_id,'received_import',jsonb_build_object('imported',inserted,'already_imported',skipped));
 RETURN jsonb_build_object('ok',true,'imported',inserted,'already_imported',skipped);
END; $$;
REVOKE ALL ON FUNCTION public.cw_import_received(uuid,uuid) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.cw_import_received(uuid,uuid) TO service_role;