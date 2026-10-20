import { describe, it, expect } from 'vitest';
import { average } from '@/pages/AdminCasting';

describe('casting average', () => {
  it('averages only filled criteria', () => {
    expect(average({ presentation: 8, posture: 7, elocution: null })).toBe(7.5);
  });
  it('returns null when nothing is graded', () => {
    expect(average({})).toBeNull();
  });
});
