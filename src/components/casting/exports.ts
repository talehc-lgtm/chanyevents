import * as XLSX from 'xlsx';
import {jsPDF} from 'jspdf';
import autoTable from 'jspdf-autotable';
import {consolidate,recommendation,total} from '@/lib/casting';
import type {Application,State} from './types';
import {candidateNumber,DECISIONS,STATUS,dateLabel} from './types';
function meta(state:State){return `${state.event.name} — Édition du ${new Date().toLocaleString('fr-FR',{timeZone:'Africa/Douala'})}`;}
export function excel(state:State,apps:Application[],kind='Classement'){
 if(state.role!=='admin')throw new Error('Export réservé à l’administrateur');
 const rows=kind==='Planning'?state.assignments.filter(s=>apps.some(a=>a.id===s.application_id)).map(s=>{const a=apps.find(x=>x.id===s.application_id);return {'N°':candidateNumber(a?.number??0),Nom:state.people.find(p=>p.id===a?.person_id)?.full_name,Poste:state.posts.find(p=>p.id===s.post_id)?.name,Journée:s.day,Début:s.start_time,Fin:s.end_time};}):apps.map(a=>{const p=state.people.find(p=>p.id===a.person_id);const r=consolidate(state.evaluations.filter(e=>e.application_id===a.id),state.rubric.criteria,state.event.required_evaluations);return {'N°':candidateNumber(a.number),Nom:p?.full_name,Téléphone:p?.phone,Poste:a.position,Statut:STATUS[a.status],Score:r.score,Évaluations:r.count,Résultat:r.provisional?'Provisoire':'Complet',Recommandation:recommendation(r.score),Décision:DECISIONS[a.decision],Briefing:a.briefing_available?'Disponible':'Non confirmé',...Object.fromEntries(state.rubric.criteria.map(c=>[c.label,r.count?r.means[c.key]:null]))};});
 const ws=XLSX.utils.aoa_to_sheet([[meta(state)],[]]);XLSX.utils.sheet_add_json(ws,rows,{origin:'A3'});const wb=XLSX.utils.book_new();XLSX.utils.book_append_sheet(wb,ws,kind.slice(0,31));XLSX.writeFile(wb,`casting-${kind.toLowerCase()}-${new Date().toISOString().slice(0,10)}.xlsx`);
}
export function pdf(state:State,a:Application,kind:'candidate'|'evaluation'){
 if(state.role!=='admin')throw new Error('Export réservé à l’administrateur');
 const doc=new jsPDF();const person=state.people.find(p=>p.id===a.person_id);doc.setFontSize(16);doc.text('CHANY EVENTS — Casting',14,18);doc.setFontSize(10);doc.text(doc.splitTextToSize(meta(state),180),14,26);doc.setFontSize(13);doc.text(`${candidateNumber(a.number)} — ${person?.full_name??''}`,14,45);doc.setFontSize(10);doc.text(a.position,14,53);
 if(kind==='candidate'){
 const details=person?.details??{};const body=[['Téléphone',person?.phone??''],['E-mail',details.email??''],['Ville / quartier',`${details.city??''} / ${details.district??''}`],['Langues',Object.entries(details.languages??{}).map(([k,v])=>`${k}: ${v}`).join(', ')],['Formation',details.training??''],['Briefing',a.briefing_available?'Disponible':'Non confirmé'],['Disponibilités',a.availability.map(s=>`${s.day} ${s.start_time}–${s.end_time}`).join('\n')],['Contraintes',a.constraints],['Tenues',Object.entries(details.clothing??{}).map(([k,v])=>`${k}: ${v}`).join(', ')],['Expériences',(details.experiences??[]).map((e:any)=>`${e.event} / ${e.role} / ${e.period}\n${e.tasks}`).join('\n')],['Décision',DECISIONS[a.decision]],['Notes administratives',a.admin_notes]];autoTable(doc,{startY:60,body,theme:'grid',styles:{fontSize:10},columnStyles:{0:{cellWidth:42}}});
 }else{const r=consolidate(state.evaluations.filter(e=>e.application_id===a.id),state.rubric.criteria,state.event.required_evaluations);autoTable(doc,{startY:60,head:[['Critère','Maximum','Moyenne','Commentaire']],body:state.rubric.criteria.map(c=>[c.label,String(c.max),r.count?r.means[c.key].toFixed(1):'Non évalué',state.evaluations.filter(e=>e.application_id===a.id&&e.status==='validated').map(e=>e.comments[c.key]??'').filter(Boolean).join('\n')]),styles:{fontSize:9}});const y=(doc as any).lastAutoTable.finalY+12;doc.text(`Total : ${r.score?.toFixed(1)??'—'} / 100 — ${r.provisional?'Résultat provisoire':'Résultat complet'}`,14,y);}
 doc.save(`${candidateNumber(a.number)}-${kind==='candidate'?'fiche':'evaluation'}.pdf`);
}
export function printPresence(state:State,apps:Application[]){
 const doc=new jsPDF();doc.setFontSize(14);doc.text('Liste de présence — CHANY EVENTS',14,18);doc.setFontSize(9);doc.text(doc.splitTextToSize(meta(state),180),14,26);autoTable(doc,{startY:42,head:[['N°','Nom','Poste','Statut','Arrivée','Signature']],body:apps.map(a=>[candidateNumber(a.number),state.people.find(p=>p.id===a.person_id)?.full_name??'',a.position,STATUS[a.status],a.arrived_at?new Date(a.arrived_at).toLocaleTimeString('fr-FR',{timeZone:'Africa/Douala'}):'','']),styles:{fontSize:9}});doc.save('liste-presence.pdf');
}
