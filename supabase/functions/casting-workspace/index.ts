import {createClient} from 'npm:@supabase/supabase-js@2';
import {corsHeaders} from 'npm:@supabase/supabase-js@2/cors';
import {z} from 'npm:zod@3';
import {DEFAULT_CRITERIA, FIRST_EVENT, complete, consolidate, expectedDecision, permission, available, overlaps, welcomeAlert} from './domain.ts';
const json=(body:unknown,status=200)=>new Response(JSON.stringify(body),{status,headers:{...corsHeaders,'Content-Type':'application/json'}});
const uuid=z.string().uuid();
const text=z.string().trim().max(2000);
const calendarDate=z.string().regex(/^\d{4}-\d{2}-\d{2}$/).refine(v=>!Number.isNaN(Date.parse(v))&&new Date(v).toISOString().slice(0,10)===v,'Date invalide');
const clock=z.string().regex(/^([01]\d|2[0-3]):[0-5]\d(:[0-5]\d)?$/).transform(v=>v.slice(0,5));
const slot=z.object({day:calendarDate,start_time:clock,end_time:clock}).refine(s=>s.end_time>s.start_time,'Créneau invalide');
const criteria=z.array(z.object({key:z.string().regex(/^[a-z_]+$/),label:z.string().min(1).max(150),max:z.number().int().min(1).max(100),test:text.optional()})).min(1).max(30).refine(c=>c.reduce((s,x)=>s+x.max,0)===100 && new Set(c.map(x=>x.key)).size===c.length,'La grille doit totaliser 100 points avec des critères uniques');
Deno.serve(async req=>{
 if(req.method==='OPTIONS')return new Response('ok',{headers:corsHeaders});
 try{
 const url=Deno.env.get('SUPABASE_URL'),key=Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
 if(!url||!key)throw new Error('Configuration indisponible');
 const db=createClient(url,key);
 const token=req.headers.get('Authorization')?.replace(/^Bearer\s+/i,'');
 if(!token)return json({error:'Connexion requise.'},401);
 const {data:auth,error:authError}=await db.auth.getUser(token);
 if(authError||!auth.user)return json({error:'Session expirée. Reconnectez-vous.'},401);
 const user=auth.user;
 const b=z.object({action:z.string(),event_id:uuid.optional()}).passthrough().parse(await req.json()) as any;
 const check=async(q:any)=>{const r=await q;if(r.error)throw new Error(r.error.message);return r.data;};
 const globalAdmin=!!(await check(db.from('user_roles').select('id').eq('user_id',user.id).eq('role','admin').maybeSingle()));
 const memberships=await check(db.from('cw_members').select('*').eq('user_id',user.id));
 if(!globalAdmin&&!memberships.length)return json({error:'Ce compte n’a pas accès au casting.'},403);
 let role=globalAdmin?'admin':memberships.find((m:any)=>m.event_id===b.event_id)?.role;
 if(b.action==='access'){
 const events=await check(globalAdmin?db.from('cw_events').select('*').order('created_at'):db.from('cw_events').select('*').in('id',memberships.map((m:any)=>m.event_id)).order('created_at'));
 return json({user_id:user.id,email:user.email,admin:globalAdmin,events,memberships});
 }
 if(b.action==='initialize'){
 if(!globalAdmin)return json({error:'Accès refusé'},403);
 const existing=await check(db.from('cw_events').select('id').limit(1));
 if(existing.length)return json({ok:true});
 const event=await check(db.from('cw_events').insert(FIRST_EVENT).select().single());
 await check(db.from('cw_rubrics').insert({event_id:event.id,criteria:DEFAULT_CRITERIA}));
 await check(db.from('cw_posts').insert(['Accueil général','Accueil VIP','Enregistrement et badges','Orientation','Assistance exposants','Appui logistique'].map(name=>({event_id:event.id,name,quota:0,welcome_required:name!=='Appui logistique'}))));
 return json({ok:true,event_id:event.id});
 }
 if(b.action==='event_save'){
 if(!globalAdmin)return json({error:'Accès refusé'},403);
 const data=z.object({name:z.string().min(2).max(200),casting_at:z.string().datetime(),location:text,mission_start:calendarDate,mission_end:calendarDate,mission_location:text,timezone:z.literal('Africa/Douala'),required_evaluations:z.number().int().min(1).max(20)}).refine(e=>e.mission_end>=e.mission_start).parse(b.event);
 const event=await check(b.event_id?db.from('cw_events').update(data).eq('id',b.event_id).select().single():db.from('cw_events').insert(data).select().single());
 if(!b.event_id)await check(db.from('cw_rubrics').insert({event_id:event.id,criteria:DEFAULT_CRITERIA}));
 await check(db.from('cw_audit').insert({event_id:event.id,actor_id:user.id,action:'event_save'}));
 return json({ok:true,event_id:event.id});
 }
 if(!b.event_id||!role)return json({error:'Événement non autorisé.'},403);
 if(!permission(role,b.action))return json({error:'Action non autorisée pour votre rôle.'},403);
 const event=await check(db.from('cw_events').select('*').eq('id',b.event_id).single());
 const audit=async(action:string,target_id?:string,detail:unknown={})=>check(db.from('cw_audit').insert({event_id:event.id,actor_id:user.id,action,target_id,detail}));
 const application=async(id:unknown)=>check(db.from('cw_applications').select('*').eq('id',uuid.parse(id)).eq('event_id',event.id).single());
 const ownApp=async(id:unknown)=>{const a=await application(id);if(role==='jury'&&!a.jury_ids.includes(user.id))throw new Error('Candidate non affectée à votre jury');return a;};
 const rubric=await check(db.from('cw_rubrics').select('*').eq('event_id',event.id).order('version',{ascending:false}).limit(1).single());
 if(b.action==='state'){
 const all=await check(db.from('cw_applications').select('*').eq('event_id',event.id).order('number'));
 const apps=role==='jury'?all.filter((a:any)=>a.jury_ids.includes(user.id)):all;
 const ids=apps.map((a:any)=>a.id);
 const people=ids.length?await check(db.from('cw_people').select('*').in('id',apps.map((a:any)=>a.person_id))):[];
 let evals=ids.length?await check(db.from('cw_evaluations').select('*').in('application_id',ids)):[];
 if(role==='reception')evals=[];
 if(role==='jury')evals=evals.filter((e:any)=>e.juror_id===user.id||evals.some((mine:any)=>mine.application_id===e.application_id&&mine.juror_id===user.id&&mine.status==='validated')&&e.status==='validated');
 const members=await check(db.from('cw_members').select('id,event_id,user_id,display_name,role').eq('event_id',event.id));
 const posts=await check(db.from('cw_posts').select('*').eq('event_id',event.id));
 const assignments=ids.length?await check(db.from('cw_assignments').select('*').in('application_id',ids)):[];
 const log=globalAdmin?await check(db.from('cw_audit').select('*').eq('event_id',event.id).order('created_at',{ascending:false}).limit(100)):[];
 return json({event,role,user_id:user.id,rubric,members,posts,assignments,audit:log,applications:apps.map((a:any)=>role==='jury'?{...a,admin_notes:''}:a),people:people.map((p:any)=>role==='jury'?{...p,phone:'',normalized_phone:'',details:{experiences:p.details.experiences,languages:p.details.languages,training:p.details.training,photo_path:p.details.photo_path}}:p),evaluations:evals,legacy:globalAdmin?await check(db.from('casting_evaluations').select('*').order('created_at')):[]});
 }
 if(event.archived&& !['archive','file_read'].includes(b.action))return json({error:'Cet événement est archivé.'},409);
 if(b.action==='import_received'){
 const result=await check(db.rpc('cw_import_received',{_event_id:event.id,_actor_id:user.id}));
 return json(result);
 }
 if(b.action==='person_save'){
 const p=z.object({full_name:z.string().trim().min(2).max(100),phone:z.string().trim().min(8).max(25),details:z.object({email:z.union([z.string().email(),z.literal('')]).optional(),whatsapp:z.string().max(25).optional(),city:z.string().max(100).optional(),district:z.string().max(100).optional(),languages:z.record(z.string().max(100)).optional(),training:text.optional(),experiences:z.array(z.object({event:text,role:text,period:text,tasks:text})).max(3).optional(),clothing:z.record(z.string().max(40)).optional(),photo_path:z.string().max(200).optional(),cv_path:z.string().max(200).optional()}).strict()}).parse(b.person);
 for(const k of ['photo_path','cv_path'])if(p.details[k]&&!new RegExp(`^${event.id}/[0-9a-f-]{36}\\.(jpg|jpeg|png|webp|pdf|doc|docx)$`).test(String(p.details[k])))return json({error:'Pièce jointe invalide'},400);
 const normalized_phone=p.phone.replace(/\D/g,'');
 if(b.person_id){const a=await application(b.application_id);if(a.person_id!==b.person_id)return json({error:'Fiche incompatible'},403);if(!globalAdmin){const shared=await check(db.from('cw_applications').select('id').eq('person_id',a.person_id).neq('event_id',event.id).limit(1));if(shared.length)return json({error:'La modification de cette fiche partagée est réservée à l’administrateur.'},403);}}
 const person=await check(b.person_id?db.from('cw_people').update({...p,normalized_phone}).eq('id',uuid.parse(b.person_id)).select().single():db.from('cw_people').insert({...p,normalized_phone}).select().single());
 const eventPeople=await check(db.from('cw_applications').select('person_id').eq('event_id',event.id));
 const duplicates=globalAdmin?await check(db.from('cw_people').select('id,full_name').eq('normalized_phone',normalized_phone).neq('id',person.id)):eventPeople.length?await check(db.from('cw_people').select('id,full_name').eq('normalized_phone',normalized_phone).neq('id',person.id).in('id',eventPeople.map((a:any)=>a.person_id))):[];
 const newApplication=b.person_id?null:await check(db.from('cw_applications').insert({event_id:event.id,person_id:person.id,position:'À préciser'}).select('id').single());
 if(newApplication)await audit('registration',newApplication.id);
 return json({ok:true,person,duplicates,application_id:newApplication?.id??b.application_id});
 }
 if(b.action==='application_save'){
 const data=z.object({position:z.string().trim().min(2).max(100),availability:z.array(slot).max(100),briefing_available:z.boolean(),constraints:text,admin_notes:text,dossier_checked:z.boolean()}).parse(b.application);
 if(b.application_id){await application(b.application_id);await check(db.from('cw_applications').update(data).eq('id',b.application_id));return json({ok:true});}
 if(!globalAdmin)return json({error:'La réutilisation d’une fiche est réservée à l’administrateur.'},403);
 const person_id=uuid.parse(b.person_id);await check(db.from('cw_people').select('id').eq('id',person_id).single());
 const a=await check(db.from('cw_applications').insert({...data,event_id:event.id,person_id}).select().single());
 await audit('registration',a.id);return json({ok:true,application:a});
 }
 if(b.action==='checkin'){
 const a=await application(b.application_id);
 const data=z.object({status:z.enum(['registered','present','waiting','evaluating','evaluated','absent','withdrawn']),queue_order:z.number().int().min(1).max(100000).nullable(),jury_ids:z.array(uuid).max(20),dossier_checked:z.boolean().optional()}).parse(b.patch);
 if(data.jury_ids.length){const ms=await check(db.from('cw_members').select('user_id').eq('event_id',event.id).eq('role','jury').in('user_id',data.jury_ids));if(ms.length!==data.jury_ids.length)return json({error:'Jury non autorisé'},400);}
 await check(db.from('cw_applications').update({...data,arrived_at:a.arrived_at??(['present','waiting','evaluating'].includes(data.status)?new Date().toISOString():null)}).eq('id',a.id));await audit('checkin',a.id,data);return json({ok:true});
 }
 if(b.action==='evaluation_save'){
 const a=await ownApp(b.application_id);
 const input=z.object({scores:z.record(z.number().int().min(0).max(5).nullable()),comments:z.record(text),appreciation:text,status:z.enum(['draft','validated'])}).parse(b.evaluation);
 if(input.status==='validated'&&!complete(input.scores,rubric.criteria))return json({error:'Renseignez tous les critères avant de valider.'},400);
 if(Object.keys(input.scores).some(k=>!rubric.criteria.some((c:any)=>c.key===k)))return json({error:'Critère inconnu'},400);
 const old=await check(db.from('cw_evaluations').select('*').eq('application_id',a.id).eq('juror_id',user.id).maybeSingle());
 if(old?.status==='validated')return json({error:'Évaluation verrouillée. Demandez une réouverture à l’administrateur.'},409);
 const data={...input,application_id:a.id,juror_id:user.id,rubric_id:rubric.id,updated_at:new Date().toISOString(),validated_at:input.status==='validated'?new Date().toISOString():null};
 const saved=await check(db.from('cw_evaluations').upsert(data,{onConflict:'application_id,juror_id'}).select().single());
 const evals=await check(db.from('cw_evaluations').select('scores,status').eq('application_id',a.id));const result=consolidate(evals,rubric.criteria,event.required_evaluations);
 await check(db.from('cw_applications').update({status:result.count>=event.required_evaluations?'evaluated':'evaluating'}).eq('id',a.id));
 if(input.status==='validated')await audit('evaluation_validated',a.id,{evaluation_id:saved.id});
 return json({ok:true,evaluation:saved});
 }
 if(b.action==='reopen'){
 const reason=z.string().trim().min(3).max(2000).parse(b.reason);const a=await application(b.application_id);const id=uuid.parse(b.evaluation_id);
 await check(db.from('cw_evaluations').update({status:'draft',validated_at:null}).eq('id',id).eq('application_id',a.id));await check(db.from('cw_applications').update({status:'evaluating'}).eq('id',a.id));await audit('evaluation_reopened',a.id,{reason,evaluation_id:id});return json({ok:true});
 }
 if(b.action==='decision'){
 const a=await application(b.application_id);const decision=z.enum(['pending','selected','reserve','rejected','withdrawn']).parse(b.decision);const reason=text.parse(b.reason??'');
 const es=await check(db.from('cw_evaluations').select('scores,status').eq('application_id',a.id));const result=consolidate(es,rubric.criteria,event.required_evaluations);
 if(decision!==expectedDecision(result.score)&&reason.trim().length<3)return json({error:'Un motif est requis pour une décision différente de la recommandation.'},400);
 await check(db.from('cw_applications').update({decision,decision_reason:reason}).eq('id',a.id));await audit('decision',a.id,{decision,reason});return json({ok:true});
 }
 if(b.action==='rubric_save'){if(rubric.locked_at)return json({error:'La grille est verrouillée depuis la première évaluation.'},409);await check(db.from('cw_rubrics').update({criteria:criteria.parse(b.criteria)}).eq('id',rubric.id));await audit('rubric_save',rubric.id);return json({ok:true});}
 if(b.action==='post_save'){
 const p=z.object({name:z.string().min(2).max(100),quota:z.number().int().min(0).max(1000),welcome_required:z.boolean()}).parse(b.post);
 await check(b.post_id?db.from('cw_posts').update(p).eq('id',uuid.parse(b.post_id)).eq('event_id',event.id):db.from('cw_posts').insert({...p,event_id:event.id}));await audit('post_save');return json({ok:true});
 }
 if(b.action==='assignment_save'){
 const a=await application(b.application_id);if(a.decision!=='selected')return json({error:'Seuls les candidats retenus peuvent être affectés.'},400);
 const s=slot.parse(b.slot);if(s.day<event.mission_start||s.day>event.mission_end)return json({error:'Date hors de la mission.'},400);
 const post=await check(db.from('cw_posts').select('*').eq('id',uuid.parse(b.post_id)).eq('event_id',event.id).single());
 const assignments=await check(db.from('cw_assignments').select('*').eq('application_id',a.id));
 const occupied=await check(db.from('cw_assignments').select('*').eq('post_id',post.id).eq('day',s.day));
 const es=await check(db.from('cw_evaluations').select('scores,status').eq('application_id',a.id));const result=consolidate(es,rubric.criteria,event.required_evaluations);
 const warnings=[];if(post.welcome_required&&(result.count===0||welcomeAlert(result.means,true,result.count)))warnings.push('Seuils accueil non atteints');if(result.provisional)warnings.push('Évaluation provisoire');if(!available(s,a.availability))warnings.push('Disponibilité incompatible');if(assignments.some((x:any)=>overlaps(x,s)))warnings.push('Conflit d’horaires');if(occupied.filter((x:any)=>overlaps(x,s)).length>=post.quota)warnings.push('Quota dépassé');
 if(warnings.length&&!b.override_reason)return json({error:warnings.join(' • '),warnings},409);
 const reason=text.parse(b.override_reason??'');if(warnings.length&&reason.trim().length<3)return json({error:'Motif de dérogation requis'},400);
 const saved=await check(db.from('cw_assignments').insert({...s,application_id:a.id,post_id:post.id}).select().single());await audit('assignment_saved',saved.id,{warnings,reason});return json({ok:true,warnings});
 }
 if(b.action==='assignment_delete'){const a=await application(b.application_id);await check(db.from('cw_assignments').delete().eq('id',uuid.parse(b.id)).eq('application_id',a.id));await audit('assignment_deleted',a.id);return json({ok:true});}
 if(b.action==='member_save'){
 const m=z.object({email:z.string().email(),display_name:z.string().min(2).max(100),role:z.enum(['reception','jury'])}).parse(b.member);
 const {data,error}=await db.auth.admin.listUsers({perPage:1000});if(error)throw error;
 let member=data.users.find(u=>u.email?.toLowerCase()===m.email.toLowerCase());
 if(!member){const invite=await db.auth.admin.inviteUserByEmail(m.email,{redirectTo:b.redirect_to&&['https://chanyevents.com','https://www.chanyevents.com','https://chanyevents.lovable.app'].some(o=>b.redirect_to===o+'/casting')?b.redirect_to:'https://www.chanyevents.com/casting'});if(invite.error)throw invite.error;member=invite.data.user;}
 if(!member)throw new Error('Invitation impossible');
 await check(db.from('cw_members').upsert({event_id:event.id,user_id:member.id,display_name:m.display_name,role:m.role},{onConflict:'event_id,user_id'}));
 const existing=await check(db.from('user_roles').select('id').eq('user_id',member.id).eq('role','user').maybeSingle());if(!existing)await check(db.from('user_roles').insert({user_id:member.id,role:'user'}));
 await audit('member_access',member.id,{role:m.role});return json({ok:true});
 }
 if(b.action==='member_remove'){await check(db.from('cw_members').delete().eq('id',uuid.parse(b.id)).eq('event_id',event.id));await audit('member_removed');return json({ok:true});}
 if(b.action==='archive'){await check(db.from('cw_events').update({archived:z.boolean().parse(b.archived)}).eq('id',event.id));await audit('archive',event.id,{archived:b.archived});return json({ok:true});}
 if(b.action==='application_delete'){const a=await application(b.application_id);await audit('application_deleted',a.id);await check(db.from('cw_applications').delete().eq('id',a.id));return json({ok:true});}
 if(b.action==='file_upload'){
 const ext=z.enum(['jpg','jpeg','png','webp','pdf','doc','docx']).parse(b.extension);const path=`${event.id}/${crypto.randomUUID()}.${ext}`;const r=await db.storage.from('casting-private').createSignedUploadUrl(path);if(r.error)throw r.error;return json({ok:true,path,token:r.data.token});
 }
 if(b.action==='file_read'){
 if(role==='jury'&&b.kind==='cv_path')return json({error:'Le CV est réservé à l’accueil et à l’administrateur.'},403);
 const a=await ownApp(b.application_id);const p=await check(db.from('cw_people').select('details').eq('id',a.person_id).single());const kind=z.enum(['photo_path','photo_city','cv_path']).parse(b.kind);let path=p.details[kind];let bucket='casting-private';
 if(!path&&a.source_application_id){const source=await check(db.from('job_applications').select('cv_path,photo_paths').eq('id',a.source_application_id).single());path=kind==='cv_path'?source.cv_path:source.photo_paths?.[kind==='photo_city'?1:0];bucket='applications';}
 if(!path)return json({error:'Fichier absent'},404);
 const r=await db.storage.from(bucket).createSignedUrl(path,300);if(r.error)throw r.error;return json({url:r.data.signedUrl});
 }
 if(b.action==='demo_create'){
 for(const [i,name] of ['DÉMO — Alice Exemple','DÉMO — Brice Exemple','DÉMO — Carine Exemple'].entries()){
 const p=await check(db.from('cw_people').insert({full_name:name,phone:`000000000${i}`,normalized_phone:`000000000${i}`,details:{city:'Douala',languages:{Français:'courant',Anglais:'moyen'}}}).select().single());
 await check(db.from('cw_applications').insert({event_id:event.id,person_id:p.id,position:i===1?'Personnel d’appui':'Hôtesse / Steward',demo:true,briefing_available:true,availability:[{day:event.mission_start,start_time:'08:00',end_time:'18:00'}]}));
 }await audit('demo_created');return json({ok:true});
 }
 if(b.action==='demo_delete'){const apps=await check(db.from('cw_applications').select('id,person_id').eq('event_id',event.id).eq('demo',true));if(apps.length){await check(db.from('cw_applications').delete().in('id',apps.map((a:any)=>a.id)));for(const a of apps){const others=await check(db.from('cw_applications').select('id').eq('person_id',a.person_id));if(!others.length)await check(db.from('cw_people').delete().eq('id',a.person_id));}}await audit('demo_deleted');return json({ok:true});}
 return json({error:'Action inconnue.'},400);
 }catch(e){return json({error:e instanceof z.ZodError?'Données invalides : '+e.issues.map(x=>x.message).join(', '):e instanceof Error?e.message:'Une erreur est survenue.'},400);}
});
