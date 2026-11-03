import React, { useEffect, useMemo, useState } from 'react';
import { LogOut, Search } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { supabase } from '@/integrations/supabase/client';
import AdminLogin from '@/components/admin/AdminLogin';
import { useAdminAccess } from '@/hooks/useAdminAccess';
import { hostessPhotos } from '@/data/hostesses';

interface Row { id: string; full_name: string; position: string; phone: string | null; email: string | null; photo: string | null; city: string | null }

const AdminHostesses: React.FC = () => {
  const admin = useAdminAccess();
  const [rows, setRows] = useState<Row[]>([]);
  const [q, setQ] = useState('');

  useEffect(() => {
    if (!admin.authenticated) return;
    supabase.from('hostess_directory').select('*').order('sort_order').then(({ data }) => setRows((data as Row[]) ?? []));
  }, [admin.authenticated]);

  const list = useMemo(() => {
    const s = q.trim().toLowerCase();
    return s ? rows.filter((r) => [r.full_name, r.phone, r.email].some((v) => v?.toLowerCase().includes(s))) : rows;
  }, [rows, q]);

  if (!admin.authenticated) return <AdminLogin checking={admin.checking} hasAdmin={admin.hasAdmin} onSignIn={admin.signIn} onSetup={admin.createFirstAdmin} />;

  return (
    <Layout>
      <section className="pt-36 pb-24 container-luxury px-6">
        <div className="flex flex-wrap items-end justify-between gap-4 mb-8">
          <div>
            <span className="eyebrow">Espace privé</span>
            <h1 className="text-section font-serif text-foreground mt-3">Répertoire des hôtesses</h1>
            <p className="text-muted-foreground mt-2">{rows.length} hôtesse(s) — In Vino Italia Douala 2026</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-3 text-muted-foreground" />
              <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Nom, téléphone, e-mail" className="pl-9 w-64" aria-label="Rechercher" />
            </div>
            <Button variant="outline" onClick={admin.signOut} aria-label="Se déconnecter"><LogOut className="w-4 h-4" /></Button>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {list.map((r) => (
            <div key={r.id} className="flex gap-4 border border-border rounded-sm p-3 bg-card">
              <div className="w-24 h-32 shrink-0 overflow-hidden rounded-sm bg-muted">
                {r.photo && hostessPhotos[r.photo] && <img src={hostessPhotos[r.photo]} alt={r.full_name} loading="lazy" className="w-full h-full object-cover" />}
              </div>
              <div className="min-w-0 text-sm space-y-1">
                <p className="font-serif text-base text-foreground leading-tight">{r.full_name}</p>
                <p className="text-muted-foreground">{r.position}</p>
                {r.phone && <a href={`tel:${r.phone}`} className="block text-primary">{r.phone}</a>}
                {r.email && <a href={`mailto:${r.email}`} className="block text-primary truncate">{r.email}</a>}
                {r.city && <p className="text-muted-foreground">{r.city}</p>}
              </div>
            </div>
          ))}
        </div>
      </section>
    </Layout>
  );
};

export default AdminHostesses;
