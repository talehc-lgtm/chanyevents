import {describe,it,expect} from 'vitest';
import {permission} from '@/lib/casting';

describe('Private casting reports',()=>{
 for(const action of ['report_upload','report_list','report_read']){
  it(`${action} is restricted to administrators`,()=>{
   expect(permission('admin',action)).toBe(true);
   expect(permission('jury',action)).toBe(false);
   expect(permission('reception',action)).toBe(false);
   expect(permission('anonymous',action)).toBe(false);
  });
 }
});