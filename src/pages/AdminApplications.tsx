import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Lock, Loader2, Trash2, FileText, Inbox, Users, Star, Phone, Mail, MapPin, MessageCircle, RefreshCw, User,
} from 'lucide-react';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { useLanguage } from '@/contexts/LanguageContext';
import { supabase } from '@/integrations/supabase/client';

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
}

interface QuoteRequest {
  id: string; created_at: string; name: string; email: string; phone: string | null; company: string | null;
  event_type: string | null; event_date: string | null; guests: string | null; budget: string | null;
  location: string | null; details: string | null; status: string;
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
  const [code, setCode] = useState('');
  const [authenticated, setAuthenticated] = useState(false);
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(false);
  const [quotes, setQuotes] = useState<QuoteRequest[]>([]);
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [tab, setTab] = useState<'applications' | 'quotes' | 'messages'>('applications');

  const loadApplications = async (accessCode: string) => {
    setLoading(true);
    const { data, error } = await supabase.functions.invoke('admin-applications', {
      headers: { 'x-admin-code': accessCode },
    });
    setLoading(false);

    if (error) {
      toast({
        title: language === 'fr' ? 'Accès refusé' : 'Access denied',
        description:
          language === 'fr' ? 'Code incorrect. Veuillez réessayer.' : 'Incorrect code. Please try again.',
        variant: 'destructive',
      });
      return false;
    }
    setApplications(data?.applications ?? []);
    setQuotes(data?.quotes ?? []);
    setMessages(data?.messages ?? []);
    return true;
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const ok = await loadApplications(code);
    if (ok) setAuthenticated(true);
  };

  const refresh = () => loadApplications(code);

  const act = async (table: string, id: string, action: 'update_status' | 'delete', status?: string) => {
    if (action === 'delete' && !window.confirm(language === 'fr' ? 'Supprimer définitivement ?' : 'Delete permanently?')) return;
    const { error } = await supabase.functions.invoke('admin-applications', {
      headers: { 'x-admin-code': code },
      body: { action, table, id, status },
    });
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

  if (!authenticated) {
    return (
      <Layout>
        <section className="min-h-screen flex items-center justify-center bg-charcoal pt-32 pb-24">
          <motion.form
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            onSubmit={handleLogin}
            className="w-full max-w-md mx-6 p-10 bg-card border border-border rounded-sm text-center"
          >
            <Lock className="w-10 h-10 text-primary mx-auto mb-6" />
            <h1 className="text-display font-serif font-semibold text-foreground mb-3">
              {language === 'fr' ? 'Espace Administration' : 'Admin Area'}
            </h1>
            <p className="text-muted-foreground mb-8">
              {language === 'fr'
                ? 'Entrez le code d’accès pour consulter candidatures, devis et messages.'
                : 'Enter the access code to view applications.'}
            </p>
            <Input
              type="password"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder={language === 'fr' ? 'Code d’accès' : 'Access code'}
              className="mb-6 text-center"
              required
            />
            <Button
              type="submit"
              size="lg"
              disabled={loading}
              className="w-full bg-gradient-gold text-primary-foreground hover-gold-glow"
            >
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : language === 'fr' ? 'Accéder' : 'Access'}
            </Button>
          </motion.form>
        </section>
      </Layout>
    );
  }

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
            <Button
              variant="outline"
              onClick={refresh}
              disabled={loading}
              className="border-primary text-primary hover:bg-primary/10"
            >
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <RefreshCw className="w-4 h-4 mr-2" />}
              {language === 'fr' ? 'Actualiser' : 'Refresh'}
            </Button>
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
                  </div>
                </div>
              </motion.article>
            ))}
          </div>}
        </div>
      </section>
    </Layout>
  );
};

export default AdminApplications;
