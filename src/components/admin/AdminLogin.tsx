import React, { useState } from 'react';
import { Loader2, Lock } from 'lucide-react';
import { motion } from 'framer-motion';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useLanguage } from '@/contexts/LanguageContext';

interface Props {
  checking: boolean;
  hasAdmin: boolean;
  onSignIn: (email: string, password: string) => Promise<{ ok: boolean; message: string }>;
  onSetup: (email: string, password: string, setupCode: string) => Promise<{ ok: boolean; message: string }>;
}

const AdminLogin: React.FC<Props> = ({ checking, hasAdmin, onSignIn, onSetup }) => {
  const { language } = useLanguage();
  const fr = language === 'fr';
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [setupCode, setSetupCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setError('');
    const result = hasAdmin
      ? await onSignIn(email, password)
      : await onSetup(email, password, setupCode);
    setLoading(false);
    if (!result.ok) setError(result.message);
  };

  return (
    <Layout>
      <section className="min-h-screen flex items-center justify-center bg-charcoal pt-32 pb-24">
        <motion.form initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} onSubmit={submit}
          className="w-full max-w-md mx-6 p-8 md:p-10 bg-card border border-border rounded-sm">
          <Lock className="w-10 h-10 text-primary mx-auto mb-6" />
          <h1 className="text-display font-serif font-semibold text-foreground text-center mb-3">
            {fr ? 'Espace Administration' : 'Admin Area'}
          </h1>
          <p className="text-muted-foreground text-center mb-8">
            {hasAdmin
              ? (fr ? 'Connectez-vous pour accéder aux candidatures, devis et messages.' : 'Sign in to access applications, quotes and messages.')
              : (fr ? 'Créez le premier compte administrateur sécurisé.' : 'Create the first secure administrator account.')}
          </p>
          <div className="space-y-5">
            <div>
              <Label htmlFor="admin-email">Email</Label>
              <Input id="admin-email" type="email" autoComplete="email" value={email} onChange={(event) => setEmail(event.target.value)} required className="mt-2" />
            </div>
            <div>
              <Label htmlFor="admin-password">{fr ? 'Mot de passe' : 'Password'}</Label>
              <Input id="admin-password" type="password" autoComplete={hasAdmin ? 'current-password' : 'new-password'} minLength={8}
                value={password} onChange={(event) => setPassword(event.target.value)} required className="mt-2" />
            </div>
            {!hasAdmin && (
              <div>
                <Label htmlFor="admin-setup-code">{fr ? 'Code de configuration actuel' : 'Current setup code'}</Label>
                <Input id="admin-setup-code" type="password" autoComplete="off" value={setupCode} onChange={(event) => setSetupCode(event.target.value)} required className="mt-2" />
              </div>
            )}
            {error && <p role="alert" className="text-sm text-destructive">{error}</p>}
            <Button type="submit" size="lg" disabled={loading || checking} className="w-full bg-gradient-gold text-primary-foreground hover-gold-glow">
              {loading || checking ? <Loader2 className="w-4 h-4 animate-spin" /> : hasAdmin ? (fr ? 'Se connecter' : 'Sign in') : (fr ? 'Créer mon accès' : 'Create my access')}
            </Button>
          </div>
        </motion.form>
      </section>
    </Layout>
  );
};

export default AdminLogin;