import {describe,it,expect} from 'vitest';
import {permission,consolidate,DEFAULT_CRITERIA} from '@/lib/casting';
describe('received casting applications',()=>{
 it('restricts import of received applications to administrators',()=>{expect(permission('admin','import_received')).toBe(true);expect(permission('jury','import_received')).toBe(false);expect(permission('reception','import_received')).toBe(false);});
 it('does not turn recruitment automatic scores into jury evaluations',()=>{const imported={score:98,evaluations:[]};expect(consolidate(imported.evaluations,DEFAULT_CRITERIA).score).toBeNull();});
});
