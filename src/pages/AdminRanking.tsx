import React, { useEffect, useMemo, useState } from 'react';
import { Loader2, LogOut, MessageCircle, RefreshCw, Send, Trophy } from 'lucide-react';
import { Link } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import AdminLogin from '@/components/admin/AdminLogin';
import { useAdminAccess } from '@/hooks/useAdminAccess';

interface App {
  id: string; created_at: string; position: string; full_name: string; phone: string; email: string | null;
  city: string | null; age: number | null; height_cm: number | null; score: number | null;
  ai_recommendation: string | null; cv_url?: string | null; photo_urls?: string[];
}

const scoreClass = (s: number | null) =>
  s == null ? 'bg-muted text-muted-foreground' : s >= 70 ? 'bg-green-600/15 text-green-700' : s >= 45 ? 'bg-amber-500/15 text-amber-700' : 'bg-destructive/15 text-destructive';

const summary = (a: App, rank: number) =>
  [
    `#${rank} — ${a.full_name} (${a.position})`,
    `Score : ${a.score ?? '—'}/100`,
    a.age != null ? `Âge : ${a.age} ans` : '',
    a.height_cm != null ? `Taille : ${a.height_cm} cm` : '',
    a.city ? `Ville : ${a.city}` : '',
    `Tél : ${a.phone}`,
    a.ai_recommendation ? `Avis : ${a.ai_recommendation}` : '',
    a.cv_url ? `CV : ${a.cv_url}` : '',
    ...(a.photo_urls ?? []).map((u, i) => `Photo ${i + 1} : ${u}`),
  ].filter(Boolean).join('\n');

const share = (text: string) => window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank', 'noopener,noreferrer');

const AdminRanking: React.FC = () => {
  const { toast } = useToast();
  const admin = useAdminAccess();
  const [loading, setLoading] = useState(false);
  const [apps, setApps] = useState<App[]>([]);
  const [minScore, setMinScore] = useState(0);

  const load = async () => {
    setLoading(true);
    const { data, error } = await supabase.functions.invoke('admin-applications');
    setLoading(false);
    if (error) { toast({ title: 'Accès refusé', description: 'Votre session a expiré.', variant: 'destructive' }); return false; }
    setApps(data?.applications ?? []);
    return true;
  };

  useEffect(() => { if (admin.authenticated) load(); }, [admin.authenticated]);

  const groups = useMemo(() => {
    const m = new Map<string, App[]>();
    apps.filter((a) => (a.score ?? 0) >= minScore).forEach((a) => m.set(a.position, [...(m.get(a.position) ?? []), a]));
    m.forEach((list) => list.sort((x, y) => (y.score ?? -1) - (x.score ?? -1)));
    return [...m.entries()];
  }, [apps, minScore]);

  if (!admin.authenticated) return <AdminLogin checking={admin.checking} hasAdmin={admin.hasAdmin} onSignIn={admin.signIn} onSetup={admin.createFirstAdmin} />;

  return (
    <Layout>
      <section className="pt-36 pb-24 container-luxury px-6">
        <div className="flex flex-wrap items-end justify-between gap-4 mb-10">
          <div>
            <span className="eyebrow">Espace privé</span>
            <h1 className="text-section font-serif text-foreground mt-3">Classement par poste</h1>
            <p className="text-muted-foreground mt-2">{apps.length} candidature(s) — classées par score décroissant. <Link to="/admin/candidatures" className="text-primary underline">Voir le détail complet</Link></p>
          </div>
          <div className="flex items-center gap-3">
            <label className="text-sm text-foreground">Score min.</label>
            <select value={minScore} onChange={(e) => setMinScore(Number(e.target.value))} className="h-10 rounded-sm border border-border bg-background px-3 text-sm">
              {[0, 45, 70, 85].map((v) => <option key={v} value={v}>{v}</option>)}
            </select>
            <Button variant="outline" onClick={() => load()}><RefreshCw className="w-4 h-4 mr-2" />Actualiser</Button>
            <Button variant="outline" onClick={admin.signOut} aria-label="Se déconnecter"><LogOut className="w-4 h-4" /></Button>
          </div>
        </div>

        {groups.length === 0 && <p className="text-muted-foreground">Aucune candidature pour ce filtre.</p>}

        <div className="space-y-14">
          {groups.map(([position, list]) => (
            <div key={position}>
              <div className="flex flex-wrap items-center justify-between gap-3 mb-5 pb-3 border-b border-border">
                <h2 className="font-serif text-3xl text-foreground">{position} <span className="text-base text-muted-foreground font-sans">({list.length})</span></h2>
                <Button size="sm" onClick={() => share(`Classement — ${position}\n\n` + list.slice(0, 10).map((a, i) => summary(a, i + 1)).join('\n\n'))} className="bg-[hsl(142_70%_40%)] hover:bg-[hsl(142_70%_35%)] text-primary-foreground">
                  <Send className="w-4 h-4 mr-2" />Envoyer le top 10 par WhatsApp
                </Button>
              </div>
              <ol className="space-y-3">
                {list.map((a, i) => (
                  <li key={a.id} className="grid grid-cols-[3rem_1fr_auto] gap-4 items-center p-4 bg-card border border-border rounded-sm">
                    <span className="font-serif text-2xl text-primary flex items-center gap-1">{i < 3 && <Trophy className="w-4 h-4" />}{i + 1}</span>
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="font-semibold text-foreground">{a.full_name}</span>
                        <span className={`text-xs px-2 py-0.5 rounded-sm font-semibold ${scoreClass(a.score)}`}>{a.score ?? '—'}/100</span>
                      </div>
                      <p className="text-sm text-muted-foreground truncate">
                        {[a.age != null && `${a.age} ans`, a.height_cm != null && `${a.height_cm} cm`, a.city, a.phone].filter(Boolean).join(' · ')}
                      </p>
                      {a.ai_recommendation && <p className="text-xs text-foreground/70 mt-1 line-clamp-2">{a.ai_recommendation}</p>}
                    </div>
                    <div className="flex flex-col sm:flex-row gap-2">
                      <Button size="sm" variant="outline" onClick={() => share(summary(a, i + 1))}><Send className="w-4 h-4 mr-1" />Partager</Button>
                      <Button size="sm" variant="outline" asChild>
                        <a href={`https://wa.me/${a.phone.replace(/\D/g, '').replace(/^(?!237)(\d{9})$/, '237$1')}`} target="_blank" rel="noopener noreferrer"><MessageCircle className="w-4 h-4 mr-1" />Candidat</a>
                      </Button>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          ))}
        </div>
      </section>
    </Layout>
  );
};

export default AdminRanking;
