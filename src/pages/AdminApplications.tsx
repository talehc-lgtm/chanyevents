import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import {
  Loader2, Trash2, FileText, Inbox, Users, Star, Phone, Mail, MapPin, MessageCircle, RefreshCw, User, LogOut,
  Pencil, Upload, Download,
} from 'lucide-react';
import * as XLSX from 'xlsx';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { useLanguage } from '@/contexts/LanguageContext';
import { supabase } from '@/integrations/supabase/client';
import AdminLogin from '@/components/admin/AdminLogin';
import { useAdminAccess } from '@/hooks/useAdminAccess';

interface Application {
  id: string;
  created_at: string;
  position: string;
  full_name: string;
  phone: string;
  email: string | null;
  city: string | null;
  experience: string | null;
  message: string | null;
  score: number | null;
  ai_summary: string | null;
  ai_recommendation: string | null;
  evaluated_at: string | null;
  age?: number | null; height_cm?: number | null; speaks_french?: boolean | null; speaks_english?: boolean | null;
  full_availability?: boolean | null; cv_url?: string | null; photo_urls?: string[]; profile?: Record<string, unknown> | null;
}

type EditableApplication = Pick<Application, 'position' | 'full_name' | 'phone' | 'email' | 'city' | 'experience' | 'message' | 'age' | 'height_cm' | 'full_availability' | 'score' | 'ai_summary' | 'ai_recommendation'>;

const exportHeaders: Record<keyof EditableApplication | 'created_at', string> = {
  created_at: 'Date', position: 'Poste', full_name: 'Nom complet', phone: 'Téléphone', email: 'Email', city: 'Ville',
  age: 'Âge', height_cm: 'Taille (cm)', full_availability: 'Disponibilité complète', experience: 'Expérience', message: 'Message',
  score: 'Score', ai_summary: 'Résumé automatique', ai_recommendation: 'Recommandation automatique',
};

const importAliases: Record<string, keyof EditableApplication> = {
  poste: 'position', position: 'position', 'nom complet': 'full_name', nom: 'full_name', full_name: 'full_name',
  téléphone: 'phone', telephone: 'phone', phone: 'phone', email: 'email', ville: 'city', city: 'city', âge: 'age', age: 'age',
  'taille (cm)': 'height_cm', taille: 'height_cm', height_cm: 'height_cm', expérience: 'experience', experience: 'experience',
  message: 'message', score: 'score', 'disponibilité complète': 'full_availability', full_availability: 'full_availability',
  'résumé automatique': 'ai_summary', ai_summary: 'ai_summary', 'recommandation automatique': 'ai_recommendation', ai_recommendation: 'ai_recommendation',
};

interface QuoteRequest {
  id: string; created_at: string; name: string; email: string; phone: string | null; company: string | null;
  event_type: string | null; event_date: string | null; guests: string | null; budget: string | null;
  location: string | null; details: string | null; status: string;
  organization?: string | null; job_title?: string | null; country?: string | null; city?: string | null; needs?: string[] | null;
}
interface ContactMessage { id: string; created_at: string; name: string; email: string; message: string; status: string; }

const scoreColor = (score: number | null) => {
  if (score === null) return 'text-muted-foreground border-border';
  if (score >= 70) return 'text-green-400 border-green-400/40';
  if (score >= 45) return 'text-amber-400 border-amber-400/40';
  return 'text-red-400 border-red-400/40';
};

const AdminApplications: React.FC = () => {
  const { language } = useLanguage();
  const { toast } = useToast();
  const admin = useAdminAccess();
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(false);
  const [quotes, setQuotes] = useState<QuoteRequest[]>([]);
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [tab, setTab] = useState<'applications' | 'quotes' | 'messages'>('applications');
  const [editing, setEditing] = useState<Application | null>(null);
  const [editForm, setEditForm] = useState<EditableApplication | null>(null);
  const [saving, setSaving] = useState(false);
  const [positionFilter, setPositionFilter] = useState('');

  const loadApplications = async () => {
    setLoading(true);
    const { data, error } = await supabase.functions.invoke('admin-applications');
    setLoading(false);

    if (error) {
      toast({
        title: language === 'fr' ? 'Accès refusé' : 'Access denied',
          description: language === 'fr' ? 'Votre session a expiré.' : 'Your session has expired.',
        variant: 'destructive',
      });
      return false;
    }
    setApplications(data?.applications ?? []);
    setQuotes(data?.quotes ?? []);
    setMessages(data?.messages ?? []);
    return true;
  };

  useEffect(() => { if (admin.authenticated) loadApplications(); }, [admin.authenticated]);

  const refresh = () => loadApplications();

  const positions = [...new Set(applications.map((app) => app.position))].sort((a, b) => a.localeCompare(b));

  const openEdit = (app: Application) => {
    setEditing(app);
    setEditForm({
      position: app.position, full_name: app.full_name, phone: app.phone, email: app.email, city: app.city,
      experience: app.experience, message: app.message, age: app.age ?? null, height_cm: app.height_cm ?? null,
      full_availability: app.full_availability ?? false, score: app.score, ai_summary: app.ai_summary, ai_recommendation: app.ai_recommendation,
    });
  };

  const saveEdit = async () => {
    if (!editing || !editForm) return;
    setSaving(true);
    const { error } = await supabase.functions.invoke('admin-applications', { body: { action: 'update_application', id: editing.id, application: editForm } });
    setSaving(false);
    if (error) return toast({ title: fr ? 'Modification impossible' : 'Update failed', variant: 'destructive' });
    setEditing(null);
    setEditForm(null);
    toast({ title: fr ? 'Candidature modifiée' : 'Application updated' });
    refresh();
  };

  const exportPosition = () => {
    const rows = applications.filter((app) => !positionFilter || app.position === positionFilter).map((app) =>
      Object.fromEntries(Object.entries(exportHeaders).map(([key, label]) => [label, app[key as keyof Application] ?? ''])),
    );
    if (!rows.length) return toast({ title: fr ? 'Aucune candidature à exporter' : 'No applications to export' });
    const sheet = XLSX.utils.json_to_sheet(rows);
    sheet['!cols'] = Object.keys(exportHeaders).map((key) => ({ wch: ['experience', 'message', 'ai_summary', 'ai_recommendation'].includes(key) ? 40 : 22 }));
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, sheet, 'Candidatures');
    const slug = (positionFilter || 'tous-les-postes').normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]+/gi, '-').toLowerCase();
    XLSX.writeFile(workbook, `candidatures-${slug}.xlsx`);
  };

  const importFile = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    event.target.value = '';
    if (!file) return;
    try {
      const workbook = XLSX.read(await file.arrayBuffer(), { type: 'array' });
      const firstSheet = workbook.SheetNames[0];
      if (!firstSheet) throw new Error('empty');
      const raw = XLSX.utils.sheet_to_json<Record<string, unknown>>(workbook.Sheets[firstSheet], { defval: '' });
      const applicationsToImport = raw.map((row) => {
        const mapped: Record<string, unknown> = {};
        Object.entries(row).forEach(([header, value]) => {
          const key = importAliases[header.trim().toLowerCase()];
          if (key) mapped[key] = value;
        });
        if (mapped.full_availability !== undefined) mapped.full_availability = ['oui', 'yes', 'true', '1'].includes(String(mapped.full_availability).trim().toLowerCase());
        return mapped;
      });
      const { data, error } = await supabase.functions.invoke('admin-applications', { body: { action: 'import_applications', applications: applicationsToImport } });
      if (error) throw error;
      toast({ title: fr ? `${data?.imported ?? applicationsToImport.length} candidature(s) importée(s)` : `${data?.imported ?? applicationsToImport.length} application(s) imported` });
      refresh();
    } catch {
      toast({ title: fr ? 'Import impossible' : 'Import failed', description: fr ? 'Utilisez un fichier Excel ou CSV avec au minimum : Poste, Nom complet et Téléphone.' : 'Use an Excel or CSV file with at least: Position, Full name and Phone.', variant: 'destructive' });
    }
  };

  const act = async (table: string, id: string, action: 'update_status' | 'delete', status?: string) => {
    if (action === 'delete' && !window.confirm(language === 'fr' ? 'Supprimer définitivement ?' : 'Delete permanently?')) return;
    const { error } = await supabase.functions.invoke('admin-applications', { body: { action, table, id, status } });
    if (error) {
      toast({ title: language === 'fr' ? 'Action impossible' : 'Action failed', variant: 'destructive' });
      return;
    }
    refresh();
  };

  const fr = language === 'fr';
  const fmtDate = (d: string) =>
    new Date(d).toLocaleDateString(fr ? 'fr-FR' : 'en-GB', { day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' });
  const statusLabel: Record<string, string> = fr
    ? { new: 'Nouveau', in_progress: 'En cours', done: 'Traité' }
    : { new: 'New', in_progress: 'In progress', done: 'Done' };
  const statusClass: Record<string, string> = {
    new: 'bg-primary/15 text-primary', in_progress: 'bg-amber-400/15 text-amber-400', done: 'bg-green-400/15 text-green-400',
  };
  const newCount = (rows: { status: string }[]) => rows.filter((r) => r.status === 'new').length;

  const StatusControls = ({ table, row }: { table: string; row: { id: string; status: string } }) => (
    <div className="flex flex-wrap items-center gap-2 mt-4">
      {(['new', 'in_progress', 'done'] as const).map((st) => (
        <button
          key={st}
          onClick={() => act(table, row.id, 'update_status', st)}
          className={`px-3 py-1 text-xs rounded-sm border ${row.status === st ? statusClass[st] + ' border-transparent font-semibold' : 'border-border text-muted-foreground hover:bg-muted'}`}
        >
          {statusLabel[st]}
        </button>
      ))}
      <button onClick={() => act(table, row.id, 'delete')} className="ml-auto inline-flex items-center gap-1 px-3 py-1 text-xs text-destructive hover:bg-destructive/10 rounded-sm">
        <Trash2 className="w-3 h-3" /> {fr ? 'Supprimer' : 'Delete'}
      </button>
    </div>
  );

  const ContactActions = ({ email, phone }: { email: string; phone?: string | null }) => (
    <div className="shrink-0 flex lg:flex-col gap-3">
      {phone && (
        <a href={`https://wa.me/${phone.replace(/\D/g, '')}`} target="_blank" rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-4 py-2 border border-primary text-primary hover:bg-primary/10 rounded-sm text-sm">
          <MessageCircle className="w-4 h-4" /> WhatsApp
        </a>
      )}
      <a href={`mailto:${email}`} className="inline-flex items-center gap-2 px-4 py-2 border border-border text-foreground/80 hover:bg-muted rounded-sm text-sm">
        <Mail className="w-4 h-4" /> Email
      </a>
    </div>
  );

  if (!admin.authenticated) return <AdminLogin checking={admin.checking} hasAdmin={admin.hasAdmin} onSignIn={admin.signIn} onSetup={admin.createFirstAdmin} />;

  return (
    <Layout>
      <section className="pt-48 pb-24 bg-charcoal min-h-screen">
        <div className="container-luxury px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <span className="text-primary text-sm font-semibold tracking-[0.28em] uppercase">
                {language === 'fr' ? 'Espace privé' : 'Private area'}
              </span>
              <h1 className="text-section font-serif font-semibold text-foreground mt-4">
                {tab === 'applications' ? (fr ? 'Candidatures reçues' : 'Received applications') : tab === 'quotes' ? (fr ? 'Demandes de devis' : 'Quote requests') : (fr ? 'Messages reçus' : 'Received messages')}
              </h1>
              <p className="text-muted-foreground mt-3">
                {tab === 'applications'
                  ? `${applications.length} ${fr ? 'candidature(s) — évaluées automatiquement' : 'application(s) — automatically evaluated'}`
                  : tab === 'quotes'
                  ? `${quotes.length} ${fr ? 'demande(s)' : 'request(s)'} — ${newCount(quotes)} ${fr ? 'nouvelle(s)' : 'new'}`
                  : `${messages.length} message(s) — ${newCount(messages)} ${fr ? 'nouveau(x)' : 'new'}`}
              </p>
            </div>
            <div className="flex gap-3">
              <Button variant="outline" onClick={refresh} disabled={loading} className="border-primary text-primary hover:bg-primary/10">
                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <RefreshCw className="w-4 h-4 mr-2" />}
                {language === 'fr' ? 'Actualiser' : 'Refresh'}
              </Button>
              <Button variant="outline" onClick={admin.signOut} aria-label={language === 'fr' ? 'Se déconnecter' : 'Sign out'}>
                <LogOut className="w-4 h-4" />
              </Button>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 mb-10 border-b border-border">
            {([
              ['applications', fr ? 'Candidatures' : 'Applications', Users, applications.length],
              ['quotes', fr ? 'Demandes de devis' : 'Quote requests', FileText, newCount(quotes)],
              ['messages', 'Messages', Inbox, newCount(messages)],
            ] as const).map(([key, label, Icon, count]) => (
              <button key={key} onClick={() => setTab(key)}
                className={`inline-flex items-center gap-2 px-5 py-3 text-sm -mb-px border-b-2 ${tab === key ? 'border-primary text-primary font-semibold' : 'border-transparent text-muted-foreground hover:text-foreground'}`}>
                <Icon className="w-4 h-4" /> {label}
                {count > 0 && <span className="px-2 py-0.5 text-xs rounded-full bg-primary/15 text-primary">{count}</span>}
              </button>
            ))}
          </div>

          {tab === 'quotes' && (
            <div className="space-y-6">
              {quotes.length === 0 && <p className="text-muted-foreground text-center py-20">{fr ? 'Aucune demande de devis pour le moment.' : 'No quote requests yet.'}</p>}
              {quotes.map((q) => (
                <article key={q.id} className="p-6 md:p-8 bg-card border border-border rounded-sm">
                  <div className="flex flex-col lg:flex-row lg:items-start gap-6">
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-3 mb-1">
                        <h2 className="font-serif text-2xl font-semibold text-foreground">{q.name}</h2>
                        {q.company && <span className="text-foreground/70">— {q.company}</span>}
                        <span className={`px-3 py-1 text-xs font-semibold uppercase rounded-sm ${statusClass[q.status] ?? ''}`}>{statusLabel[q.status] ?? q.status}</span>
                      </div>
                      <p className="text-muted-foreground text-sm mb-4">{fmtDate(q.created_at)}</p>
                      <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-foreground/80 mb-4">
                        {q.phone && <span className="flex items-center gap-2"><Phone className="w-4 h-4 text-primary" /> {q.phone}</span>}
                        <span className="flex items-center gap-2"><Mail className="w-4 h-4 text-primary" /> {q.email}</span>
                      </div>
                      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 text-sm mb-4">
                        {([
                          [fr ? 'Type' : 'Type', q.event_type], [fr ? 'Date' : 'Date', q.event_date],
                          [fr ? 'Invités' : 'Guests', q.guests], ['Budget', q.budget], [fr ? 'Lieu' : 'Location', q.location],
                          [fr ? 'Organisation' : 'Organisation', q.organization ?? q.company], [fr ? 'Fonction' : 'Job title', q.job_title], [fr ? 'Besoins' : 'Needs', q.needs?.length ? q.needs.join(', ') : null],
                        ] as const).filter(([, v]) => v).map(([k, v]) => (
                          <div key={k} className="p-3 bg-background border border-border rounded-sm">
                            <p className="text-primary text-xs uppercase tracking-wider mb-1">{k}</p>
                            <p className="text-foreground">{v}</p>
                          </div>
                        ))}
                      </div>
                      {q.details && <p className="text-foreground/80 text-sm whitespace-pre-line">{q.details}</p>}
                      <StatusControls table="quote_requests" row={q} />
                    </div>
                    <ContactActions email={q.email} phone={q.phone} />
                  </div>
                </article>
              ))}
            </div>
          )}

          {tab === 'messages' && (
            <div className="space-y-6">
              {messages.length === 0 && <p className="text-muted-foreground text-center py-20">{fr ? 'Aucun message pour le moment.' : 'No messages yet.'}</p>}
              {messages.map((m) => (
                <article key={m.id} className="p-6 md:p-8 bg-card border border-border rounded-sm">
                  <div className="flex flex-col lg:flex-row lg:items-start gap-6">
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-3 mb-1">
                        <h2 className="font-serif text-2xl font-semibold text-foreground">{m.name}</h2>
                        <span className={`px-3 py-1 text-xs font-semibold uppercase rounded-sm ${statusClass[m.status] ?? ''}`}>{statusLabel[m.status] ?? m.status}</span>
                      </div>
                      <p className="text-muted-foreground text-sm mb-2">{fmtDate(m.created_at)} · {m.email}</p>
                      <p className="text-foreground/90 whitespace-pre-line">{m.message}</p>
                      <StatusControls table="contact_messages" row={m} />
                    </div>
                    <ContactActions email={m.email} />
                  </div>
                </article>
              ))}
            </div>
          )}

          {tab === 'applications' && applications.length === 0 && !loading && (
            <p className="text-muted-foreground text-center py-20">
              {language === 'fr' ? 'Aucune candidature pour le moment.' : 'No applications yet.'}
            </p>
          )}

          {tab === 'applications' && applications.length > 0 && (
            <div className="mb-8 flex flex-col lg:flex-row lg:items-center gap-3 p-4 bg-card border border-border rounded-sm">
              <div className="flex-1">
                <Label htmlFor="export-position">{fr ? 'Exporter les candidatures d’un poste' : 'Export applications for a position'}</Label>
                <select id="export-position" value={positionFilter} onChange={(event) => setPositionFilter(event.target.value)} className="mt-2 h-10 w-full rounded-sm border border-border bg-background px-3 text-sm text-foreground">
                  <option value="">{fr ? 'Tous les postes' : 'All positions'}</option>
                  {positions.map((position) => <option key={position} value={position}>{position}</option>)}
                </select>
              </div>
              <Button variant="outline" onClick={exportPosition} className="lg:mt-6"><Download className="w-4 h-4 mr-2" />{fr ? 'Exporter Excel' : 'Export Excel'}</Button>
              <Button variant="outline" asChild className="lg:mt-6">
                <label className="cursor-pointer"><Upload className="w-4 h-4 mr-2" />{fr ? 'Importer Excel / CSV' : 'Import Excel / CSV'}<input type="file" accept=".xlsx,.xls,.csv" onChange={importFile} className="sr-only" /></label>
              </Button>
            </div>
          )}

          {tab === 'applications' && <div className="space-y-6">
            {applications.map((app) => (
              <motion.article
                key={app.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-6 md:p-8 bg-card border border-border rounded-sm"
              >
                <div className="flex flex-col lg:flex-row lg:items-start gap-6">
                  {/* Score */}
                  <div
                    className={`shrink-0 w-24 h-24 rounded-full border-2 flex flex-col items-center justify-center ${scoreColor(app.score)}`}
                  >
                    {app.score !== null ? (
                      <>
                        <span className="text-3xl font-bold">{app.score}</span>
                        <span className="text-xs opacity-70">/ 100</span>
                      </>
                    ) : (
                      <Star className="w-6 h-6" />
                    )}
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-3 mb-2">
                      <h2 className="font-serif text-2xl font-semibold text-foreground">
                        {app.full_name}
                      </h2>
                      <span className="px-3 py-1 text-xs font-semibold tracking-wide uppercase bg-primary/10 text-primary rounded-sm">
                        {app.position}
                      </span>
                    </div>
                    <p className="text-muted-foreground text-sm mb-4">
                      {new Date(app.created_at).toLocaleDateString(language === 'fr' ? 'fr-FR' : 'en-GB', {
                        day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit',
                      })}
                    </p>

                    <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-foreground/80 mb-4">
                      <span className="flex items-center gap-2">
                        <Phone className="w-4 h-4 text-primary" /> {app.phone}
                      </span>
                      {app.email && (
                        <span className="flex items-center gap-2">
                          <Mail className="w-4 h-4 text-primary" /> {app.email}
                        </span>
                      )}
                      {app.city && (
                        <span className="flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-primary" /> {app.city}
                        </span>
                      )}
                    </div>

                    <div className="flex flex-wrap gap-2 text-xs mb-3">
                      {app.age != null && <span className="px-2 py-1 border border-border rounded-sm">{app.age} {language === 'fr' ? 'ans' : 'y/o'}</span>}
                      {app.height_cm != null && <span className="px-2 py-1 border border-border rounded-sm">{app.height_cm} cm</span>}
                      <span className="px-2 py-1 border border-border rounded-sm">{language === 'fr' ? 'Disponible 26–28 nov.' : 'Available 26–28 Nov.'} {app.full_availability ? '✓' : '✗'}</span>
                      {app.cv_url && <a href={app.cv_url} target="_blank" rel="noopener noreferrer" className="px-2 py-1 bg-primary text-primary-foreground rounded-sm">CV</a>}
                    </div>
                    {!!app.photo_urls?.length && (
                      <div className="flex gap-2 mb-3">
                        {app.photo_urls.map((u) => (
                          <a key={u} href={u} target="_blank" rel="noopener noreferrer"><img src={u} alt="" className="h-28 w-20 object-cover rounded-sm border border-border" /></a>
                        ))}
                      </div>
                    )}
                    {app.profile && (
                      <details className="mb-3 text-sm">
                        <summary className="cursor-pointer text-primary font-semibold">{language === 'fr' ? 'Fiche casting complète' : 'Full casting form'}</summary>
                        <dl className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-1 mt-3">
                          {Object.entries(app.profile).filter(([, v]) => v !== '' && v !== false && !(Array.isArray(v) && !v.length)).map(([k, v]) => (
                            <div key={k} className="flex gap-2 border-b border-border/60 py-1">
                              <dt className="text-muted-foreground shrink-0">{k.replace(/_/g, ' ')} :</dt>
                              <dd className="text-foreground break-words">{Array.isArray(v) ? v.join(', ') : v === true ? '✓' : String(v)}</dd>
                            </div>
                          ))}
                        </dl>
                      </details>
                    )}

                    {app.experience && (
                      <p className="text-foreground/80 text-sm mb-2">
                        <strong className="text-foreground">
                          {language === 'fr' ? 'Expérience : ' : 'Experience: '}
                        </strong>
                        {app.experience}
                      </p>
                    )}
                    {app.message && (
                      <p className="text-foreground/80 text-sm mb-4">
                        <strong className="text-foreground">Message : </strong>
                        {app.message}
                      </p>
                    )}

                    {/* AI evaluation */}
                    {app.evaluated_at ? (
                      <div className="mt-4 p-4 bg-background border border-border rounded-sm">
                        <p className="text-primary text-xs font-semibold tracking-[0.2em] uppercase mb-2">
                          {language === 'fr' ? 'Évaluation automatique' : 'Automatic evaluation'}
                        </p>
                        {app.ai_summary && (
                          <p className="text-foreground/90 text-sm mb-2">{app.ai_summary}</p>
                        )}
                        {app.ai_recommendation && (
                          <p className="text-sm font-medium text-foreground">{app.ai_recommendation}</p>
                        )}
                        {!app.ai_summary && !app.ai_recommendation && (
                          <p className="text-muted-foreground text-sm">
                            {language === 'fr'
                              ? 'Score calculé sur critères (expérience, ville, complétude).'
                              : 'Score based on criteria (experience, city, completeness).'}
                          </p>
                        )}
                      </div>
                    ) : (
                      <p className="text-muted-foreground text-sm italic mt-4">
                        {language === 'fr' ? 'Évaluation en cours…' : 'Evaluation in progress…'}
                      </p>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="shrink-0 flex lg:flex-col gap-3">
                    <Button variant="outline" onClick={() => openEdit(app)}><Pencil className="w-4 h-4 mr-2" />{fr ? 'Modifier' : 'Edit'}</Button>
                    <a
                      href={`https://wa.me/${app.phone.replace(/\D/g, '')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 border border-primary text-primary hover:bg-primary/10 rounded-sm text-sm"
                    >
                      <MessageCircle className="w-4 h-4" /> WhatsApp
                    </a>
                    {app.email && (
                      <a
                        href={`mailto:${app.email}`}
                        className="inline-flex items-center gap-2 px-4 py-2 border border-border text-foreground/80 hover:bg-muted rounded-sm text-sm"
                      >
                        <User className="w-4 h-4" /> Email
                      </a>
                    )}
                    <Button variant="outline" onClick={() => act('job_applications', app.id, 'delete')} className="text-destructive hover:bg-destructive/10"><Trash2 className="w-4 h-4 mr-2" />{fr ? 'Supprimer' : 'Delete'}</Button>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>}

          <Dialog open={!!editing} onOpenChange={(open) => { if (!open) { setEditing(null); setEditForm(null); } }}>
            <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
              <DialogHeader><DialogTitle>{fr ? 'Modifier la candidature' : 'Edit application'}</DialogTitle><DialogDescription>{fr ? 'Corrigez les informations puis enregistrez.' : 'Update the information, then save.'}</DialogDescription></DialogHeader>
              {editForm && <div className="grid sm:grid-cols-2 gap-4 py-2">
                {([
                  ['full_name', fr ? 'Nom complet' : 'Full name', 'text'], ['position', fr ? 'Poste' : 'Position', 'text'],
                  ['phone', fr ? 'Téléphone' : 'Phone', 'tel'], ['email', 'Email', 'email'], ['city', fr ? 'Ville' : 'City', 'text'],
                  ['age', fr ? 'Âge' : 'Age', 'number'], ['height_cm', fr ? 'Taille (cm)' : 'Height (cm)', 'number'], ['score', 'Score / 100', 'number'],
                ] as const).map(([key, label, type]) => <div key={key}><Label htmlFor={`edit-${key}`}>{label}</Label><Input id={`edit-${key}`} type={type} value={editForm[key] == null ? '' : String(editForm[key])} onChange={(event) => setEditForm({ ...editForm, [key]: type === 'number' ? (event.target.value === '' ? null : Number(event.target.value)) : event.target.value })} className="mt-2" /></div>)}
                {([
                  ['experience', fr ? 'Expérience' : 'Experience'], ['message', 'Message'], ['ai_summary', fr ? 'Résumé automatique' : 'Automatic summary'], ['ai_recommendation', fr ? 'Recommandation automatique' : 'Automatic recommendation'],
                ] as const).map(([key, label]) => <div key={key} className="sm:col-span-2"><Label htmlFor={`edit-${key}`}>{label}</Label><Textarea id={`edit-${key}`} value={editForm[key] ?? ''} onChange={(event) => setEditForm({ ...editForm, [key]: event.target.value })} className="mt-2" /></div>)}
                <label className="sm:col-span-2 flex items-center gap-3 text-sm text-foreground"><input type="checkbox" checked={editForm.full_availability ?? false} onChange={(event) => setEditForm({ ...editForm, full_availability: event.target.checked })} />{fr ? 'Disponibilité complète' : 'Full availability'}</label>
              </div>}
              <DialogFooter><Button variant="outline" onClick={() => { setEditing(null); setEditForm(null); }}>{fr ? 'Annuler' : 'Cancel'}</Button><Button onClick={saveEdit} disabled={saving}>{saving && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}{fr ? 'Enregistrer' : 'Save'}</Button></DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </section>
    </Layout>
  );
};

export default AdminApplications;
