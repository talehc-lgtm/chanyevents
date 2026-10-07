import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Lock, Loader2, Star, Phone, Mail, MapPin, MessageCircle, RefreshCw, User,
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
    return true;
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const ok = await loadApplications(code);
    if (ok) setAuthenticated(true);
  };

  const refresh = () => loadApplications(code);

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
            <h1 className="font-serif text-3xl font-semibold text-foreground mb-3">
              {language === 'fr' ? 'Espace Recrutement' : 'Recruitment Area'}
            </h1>
            <p className="text-muted-foreground mb-8">
              {language === 'fr'
                ? 'Entrez le code d’accès pour consulter les candidatures.'
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
              <h1 className="font-serif text-4xl md:text-5xl font-semibold text-foreground mt-4">
                {language === 'fr' ? 'Candidatures reçues' : 'Received applications'}
              </h1>
              <p className="text-muted-foreground mt-3">
                {applications.length}{' '}
                {language === 'fr' ? 'candidature(s) — évaluées automatiquement' : 'application(s) — automatically evaluated'}
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

          {applications.length === 0 && !loading && (
            <p className="text-muted-foreground text-center py-20">
              {language === 'fr' ? 'Aucune candidature pour le moment.' : 'No applications yet.'}
            </p>
          )}

          <div className="space-y-6">
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
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default AdminApplications;
