export type Criterion = { key: string; label: string; max: number; test?: string };
export const DEFAULT_CRITERIA: Criterion[] = [
 { key:'presentation', label:'Présentation professionnelle', max:10, test:'Tenue soignée, propreté, posture et respect des consignes vestimentaires.' },
 { key:'french', label:'Expression en français', max:15, test:'Présentez-vous en 60 secondes et expliquez votre intérêt pour cette mission.' },
 { key:'english', label:'Expression en anglais', max:10, test:'Welcome a visitor and explain how to reach the registration desk.' },
 { key:'welcome', label:'Sens de l’accueil', max:15, test:'Un visiteur arrive sans savoir où retirer son badge. Prenez-le en charge.' },
 { key:'reactivity', label:'Réactivité et maîtrise de soi', max:15, test:'Un invité se plaint de ne pas trouver son nom sur la liste. Que faites-vous ?' },
 { key:'instructions', label:'Compréhension et respect des consignes', max:10, test:'Communiquer trois instructions, demander leur reformulation puis leur application.' },
 { key:'experience', label:'Expérience et compétences utiles', max:10, test:'Décrivez une expérience concrète et les compétences utiles à cette mission.' },
 { key:'teamwork', label:'Travail en équipe', max:5, test:'Votre collègue est débordé alors que votre poste est calme. Comment réagissez-vous ?' },
 { key:'reliability', label:'Ponctualité et fiabilité', max:5, test:'Respect des engagements et communication en cas d’imprévu.' },
 { key:'motivation', label:'Motivation et compréhension du poste', max:5, test:'Compréhension des tâches et contraintes annoncées.' },
];
export type Scores = Record<string, number | null>;
export type Evaluation = { scores: Scores; status: string };
export const round = (n:number) => Math.round(n*10)/10;
export function complete(scores:Scores,criteria:Criterion[]) { return criteria.every(c=>Number.isInteger(scores[c.key]) && Number(scores[c.key])>=0 && Number(scores[c.key])<=5); }
export function total(scores:Scores,criteria:Criterion[]) { return round(criteria.reduce((sum,c)=>sum+(typeof scores[c.key]==='number'?Number(scores[c.key])/5*c.max:0),0)); }
export function consolidate(evals:Evaluation[], criteria:Criterion[], required=1) {
 const valid=evals.filter(e=>e.status==='validated' && complete(e.scores,criteria));
 const totals=valid.map(e=>total(e.scores,criteria));
 const means:Record<string,number>={};
 for(const c of criteria) means[c.key]=valid.length?round(valid.reduce((s,e)=>s+Number(e.scores[c.key])/5*c.max,0)/valid.length):0;
 return { score:valid.length?round(totals.reduce((a,b)=>a+b,0)/valid.length):null, means, count:valid.length, provisional:valid.length<required, discrepancy:totals.length>1 && Math.max(...totals)-Math.min(...totals)>15 };
}
export function recommendation(score:number|null) { return score===null?'Non évalué':score>=85?'Prioritaire':score>=70?'Retenu recommandé':score>=60?'Réserve / formation':'Non retenu recommandé'; }
export function expectedDecision(score:number|null) { return score===null?'pending':score>=70?'selected':score>=60?'reserve':'rejected'; }
export function welcomeAlert(means:Record<string,number>, required:boolean, count:number) { return required && count>0 && ((means.welcome??0)<9 || (means.instructions??0)<6); }
export type Slot={day:string;start_time:string;end_time:string};
export function overlaps(a:Slot,b:Slot) { return a.day===b.day && a.start_time<b.end_time && b.start_time<a.end_time; }
export function available(slot:Slot,availability:Slot[]) { return availability.some(a=>a.day===slot.day && a.start_time<=slot.start_time && a.end_time>=slot.end_time); }
export function permission(role:string,action:string) {
 if(role==='admin') return true;
 if(['state','access','file_read'].includes(action)) return role==='reception'||role==='jury';
 if(['person_save','application_save','checkin','file_upload'].includes(action)) return role==='reception';
 if(action==='evaluation_save') return role==='jury';
 return false;
}
export const FIRST_EVENT={name:'Casting IN VINO ITALIA DOUALA 2026',casting_at:'2026-10-21T13:00:00Z',location:'Bureaux DAS, Bépanda Axe Lourd, Douala',mission_start:'2026-11-26',mission_end:'2026-11-28',mission_location:'SOAHO Douala Airport Hotel',timezone:'Africa/Douala',required_evaluations:1};
