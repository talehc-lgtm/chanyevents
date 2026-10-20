import React, { useEffect, useMemo, useState } from 'react';
import { Download, LogOut, Plus, Trash2, Trophy } from 'lucide-react';
import { Link } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import AdminLogin from '@/components/admin/AdminLogin';
import { useAdminAccess } from '@/hooks/useAdminAccess';

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

const AdminCasting: React.FC = () => {
  const admin = useAdminAccess();
  const { toast } = useToast();
  const [rows, setRows] = useState<Row[]>([]);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [minAvg, setMinAvg] = useState(0);
  const [decision, setDecision] = useState('all');
  const [search, setSearch] = useState('');

  const load = async () => {
    const { data, error } = await supabase.from('casting_evaluations').select('*').order('created_at');
    if (error) return toast({ title: 'Erreur', description: error.message, variant: 'destructive' });
    setRows(data as Row[]);
  };
  useEffect(() => { if (admin.authenticated) load(); }, [admin.authenticated]);

  const add = async (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim().length < 2) return;
    const number = rows.reduce((m, r) => Math.max(m, r.number ?? 0), 0) + 1;
    const { data, error } = await supabase.from('casting_evaluations').insert({ full_name: name.trim(), phone: phone.trim() || null, number }).select().single();
    if (error) return toast({ title: 'Erreur', description: error.message, variant: 'destructive' });
    setRows((r) => [...r, data as Row]); setName(''); setPhone('');
  };

  const update = async (id: string, patch: Partial<Row>) => {
    setRows((r) => r.map((x) => (x.id === id ? { ...x, ...patch } : x)));
    const { error } = await supabase.from('casting_evaluations').update(patch).eq('id', id);
    if (error) toast({ title: 'Non enregistré', description: error.message, variant: 'destructive' });
  };

  const remove = async (id: string) => {
    if (!confirm('Supprimer cette candidate ?')) return;
    await supabase.from('casting_evaluations').delete().eq('id', id);
    setRows((r) => r.filter((x) => x.id !== id));
  };

  const list = useMemo(() => rows
    .map((r) => ({ ...r, avg: average(r) }))
    .filter((r) => (r.avg ?? 0) >= minAvg && (decision === 'all' || r.decision === decision) && r.full_name.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => (b.avg ?? -1) - (a.avg ?? -1)), [rows, minAvg, decision, search]);

  const exportCsv = () => {
    const head = ['Rang', 'N°', 'Nom', 'Téléphone', ...CRITERIA.map(([, l]) => l), 'Moyenne', 'Décision', 'Commentaire'];
    const lines = list.map((r, i) => [i + 1, r.number, r.full_name, r.phone, ...CRITERIA.map(([k]) => r[k]), r.avg, DECISIONS[r.decision], r.comment]
      .map((v) => `"${String(v ?? '').replace(/"/g, '""')}"`).join(';'));
    const blob = new Blob(['\ufeff' + [head.join(';'), ...lines].join('\n')], { type: 'text/csv;charset=utf-8' });
    const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = 'casting-hotesses.csv'; a.click();
  };

  if (!admin.authenticated) return <AdminLogin checking={admin.checking} hasAdmin={admin.hasAdmin} onSignIn={admin.signIn} onSetup={admin.createFirstAdmin} />;

  const sel = 'h-10 rounded-sm border border-border bg-background px-2 text-sm';
  return (
    <Layout>
      <section className="pt-36 pb-24 container-luxury px-6">
        <div className="flex flex-wrap items-end justify-between gap-4 mb-8">
          <div>
            <span className="eyebrow">Espace privé</span>
            <h1 className="text-section font-serif text-foreground mt-3">Casting hôtesses</h1>
            <p className="text-muted-foreground mt-2">Notez chaque candidate de 0 à 10 par critère ; la liste est classée par moyenne. <Link to="/admin/candidatures" className="text-primary underline">Candidatures en ligne</Link></p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={exportCsv}><Download className="w-4 h-4 mr-2" />Exporter</Button>
            <Button variant="outline" onClick={admin.signOut} aria-label="Se déconnecter"><LogOut className="w-4 h-4" /></Button>
          </div>
        </div>

        <form onSubmit={add} className="flex flex-wrap gap-3 p-4 bg-card border border-border rounded-sm mb-6">
          <Input placeholder="Nom de la candidate" value={name} onChange={(e) => setName(e.target.value)} className="flex-1 min-w-[200px]" />
          <Input placeholder="Téléphone" value={phone} onChange={(e) => setPhone(e.target.value)} className="w-48" />
          <Button type="submit"><Plus className="w-4 h-4 mr-2" />Ajouter</Button>
        </form>

        <div className="flex flex-wrap items-center gap-3 mb-6 text-sm">
          <Input placeholder="Rechercher un nom" value={search} onChange={(e) => setSearch(e.target.value)} className="w-56" />
          <label>Moyenne min.</label>
          <select className={sel} value={minAvg} onChange={(e) => setMinAvg(Number(e.target.value))}>{[0, 5, 6, 7, 8, 9].map((v) => <option key={v} value={v}>{v}</option>)}</select>
          <label>Décision</label>
          <select className={sel} value={decision} onChange={(e) => setDecision(e.target.value)}>
            <option value="all">Toutes</option>{Object.entries(DECISIONS).map(([k, l]) => <option key={k} value={k}>{l}</option>)}
          </select>
          <span className="text-muted-foreground">{list.length} / {rows.length} candidate(s)</span>
        </div>

        <div className="overflow-x-auto border border-border rounded-sm">
          <table className="w-full text-sm">
            <thead className="bg-muted text-left">
              <tr><th className="p-2">Rang</th><th className="p-2">Candidate</th>{CRITERIA.map(([k, l]) => <th key={k} className="p-2">{l}</th>)}<th className="p-2">Moyenne</th><th className="p-2">Décision</th><th className="p-2">Commentaire</th><th /></tr>
            </thead>
            <tbody>
              {list.map((r, i) => (
                <tr key={r.id} className="border-t border-border align-top">
                  <td className="p-2 font-serif text-lg text-primary">{i < 3 && r.avg != null && <Trophy className="w-4 h-4 inline mr-1" />}{i + 1}</td>
                  <td className="p-2"><div className="font-semibold">#{r.number} {r.full_name}</div><div className="text-muted-foreground">{r.phone}</div></td>
                  {CRITERIA.map(([k]) => (
                    <td key={k} className="p-2">
                      <select aria-label={k} className={sel} value={r[k] ?? ''} onChange={(e) => update(r.id, { [k]: e.target.value === '' ? null : Number(e.target.value) } as Partial<Row>)}>
                        <option value="">—</option>{Array.from({ length: 11 }, (_, n) => <option key={n} value={n}>{n}</option>)}
                      </select>
                    </td>
                  ))}
                  <td className="p-2 font-semibold text-base">{r.avg ?? '—'}</td>
                  <td className="p-2"><select className={sel} value={r.decision} onChange={(e) => update(r.id, { decision: e.target.value })}>{Object.entries(DECISIONS).map(([k, l]) => <option key={k} value={k}>{l}</option>)}</select></td>
                  <td className="p-2"><Input defaultValue={r.comment ?? ''} onBlur={(e) => e.target.value !== (r.comment ?? '') && update(r.id, { comment: e.target.value })} className="min-w-[180px]" /></td>
                  <td className="p-2"><Button size="sm" variant="ghost" onClick={() => remove(r.id)} aria-label="Supprimer"><Trash2 className="w-4 h-4" /></Button></td>
                </tr>
              ))}
              {list.length === 0 && <tr><td colSpan={10} className="p-6 text-center text-muted-foreground">Aucune candidate pour ce filtre.</td></tr>}
            </tbody>
          </table>
        </div>
      </section>
    </Layout>
  );
};

export default AdminCasting;
