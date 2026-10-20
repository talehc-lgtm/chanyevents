import Workspace from '@/components/casting/Workspace';
const CRITERIA = [
  ['presentation', 'Présentation'],
  ['posture', 'Posture / démarche'],
  ['elocution', 'Élocution'],
  ['smile', 'Sourire / attitude'],
  ['experience', 'Expérience'],
] as const;
type Key = typeof CRITERIA[number][0];
type Row = { id: string; full_name: string; phone: string | null; number: number | null; comment: string | null; decision: string } & Record<Key, number | null>;

const DECISIONS: Record<string, string> = { pending: 'En attente', selected: 'Retenue', reserve: 'Réserve', rejected: 'Non retenue' };

export const average = (r: Partial<Record<Key, number | null>>) => {
  const v = CRITERIA.map(([k]) => r[k]).filter((x): x is number => typeof x === 'number');
  return v.length ? Math.round((v.reduce((a, b) => a + b, 0) / v.length) * 10) / 10 : null;
};

const AdminCasting = () => <Workspace />;
export default AdminCasting;
