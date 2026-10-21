import {describe,it,expect} from 'vitest';
import {DEFAULT_CRITERIA as C,complete,total,consolidate,recommendation,welcomeAlert,permission,overlaps,available,FIRST_EVENT} from '@/lib/casting';
const scores=(n:number)=>Object.fromEntries(C.map(c=>[c.key,n]));
describe('private casting rules',()=>{
 it('uses the ten requested weights totalling 100',()=>{expect(C.map(c=>c.max)).toEqual([10,15,10,15,15,10,10,5,5,5]);expect(total(scores(5),C)).toBe(100);});
 it('requires every criterion and never treats an empty score as completed',()=>{expect(complete({},C)).toBe(false);expect(complete({...scores(0),french:null},C)).toBe(false);expect(complete(scores(0),C)).toBe(true);});
 it('consolidates validated evaluations only, with one decimal',()=>{const r=consolidate([{scores:scores(4),status:'validated'},{scores:scores(5),status:'draft'},{scores:scores(3),status:'validated'}],C,3);expect(r.score).toBe(70);expect(r.means.french).toBe(10.5);expect(r.count).toBe(2);expect(r.provisional).toBe(true);});
 it('flags differences strictly greater than 15',()=>{expect(consolidate([{scores:scores(5),status:'validated'},{scores:scores(4),status:'validated'}],C).discrepancy).toBe(true);});
 it('recommends priority at 85',()=>expect(recommendation(85)).toBe('Prioritaire'));
 it('recommends selected at 70',()=>expect(recommendation(70)).toBe('Retenu recommandé'));
 it('recommends reserve at 60',()=>expect(recommendation(60)).toBe('Réserve / formation'));
 it('rejects below 60',()=>expect(recommendation(59.9)).toBe('Non retenu recommandé'));
 it('requires welcome 9 and instructions 6 for welcome posts',()=>{expect(welcomeAlert({welcome:9,instructions:6},true,1)).toBe(false);expect(welcomeAlert({welcome:8.9,instructions:6},true,1)).toBe(true);expect(welcomeAlert({welcome:9,instructions:5.9},true,1)).toBe(true);});
  it('only admin can decide or manage access',()=>{expect(permission('jury','decision')).toBe(false);expect(permission('reception','member_save')).toBe(false);expect(permission('admin','decision')).toBe(true);expect(permission('jury','member_save')).toBe(false);expect(permission('admin','member_save')).toBe(true);});
 it('reception cannot evaluate',()=>{expect(permission('reception','evaluation_save')).toBe(false);expect(permission('jury','evaluation_save')).toBe(true);});
 it('detects time conflict without treating adjacent shifts as overlap',()=>{const a={day:'2026-11-26',start_time:'08:00',end_time:'12:00'};expect(overlaps(a,{...a,start_time:'11:00',end_time:'14:00'})).toBe(true);expect(overlaps(a,{...a,start_time:'12:00',end_time:'14:00'})).toBe(false);expect(available({...a,end_time:'13:00'},[a])).toBe(false);});
 it('sets the first casting to 21 October at 14h in Douala',()=>{expect(FIRST_EVENT.casting_at).toBe('2026-10-21T13:00:00Z');expect(FIRST_EVENT.mission_start).toBe('2026-11-26');expect(FIRST_EVENT.mission_end).toBe('2026-11-28');});
});
