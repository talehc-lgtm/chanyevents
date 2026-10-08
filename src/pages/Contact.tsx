import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { MapPin, Phone, Mail, MessageCircle, CheckCircle2 } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import { useL, Seo, Reveal } from '@/components/common/Blocks';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';

const NEEDS_FR: Record<string,string> = { 'Full Event Management': 'Gestion complète', Strategy: 'Stratégie', Planning: 'Planification', Production: 'Production', Logistics: 'Logistique', B2B: 'B2B', Exhibition: 'Exposition', Delegation: 'Délégation', Communication: 'Communication', Other: 'Autre' };
const NEEDS = ['Full Event Management', 'Strategy', 'Planning', 'Production', 'Logistics', 'B2B', 'Exhibition', 'Delegation', 'Communication', 'Other'];

const Contact: React.FC = () => {
  const L = useL();
  const location = useLocation();
  const [sent, setSent] = useState(false);
  const [busy, setBusy] = useState(false);
  const [needs, setNeeds] = useState<string[]>([]);
  const [f, setF] = useState({ name: '', organization: '', job_title: '', email: '', phone: '', country: '', city: '', event_type: '', event_date: '', guests: '', budget: '', services: '', details: '' });

  useEffect(() => {
    if (location.hash === '#projet') setTimeout(() => document.getElementById('projet')?.scrollIntoView({ behavior: 'smooth' }), 100);
  }, [location.hash]);

  const set = (k: keyof typeof f) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => setF({ ...f, [k]: e.target.value });
  const cut = (s: string, n = 200) => s.trim().slice(0, n) || null;

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!f.name.trim() || !/^\S+@\S+\.\S+$/.test(f.email.trim())) {
      toast({ title: L('Veuillez indiquer votre nom et un email valide.', 'Please enter your name and a valid email.'), variant: 'destructive' });
      return;
    }
    setBusy(true);
    const details = [f.services.trim() && `${L('Services recherchés', 'Services sought')}: ${f.services.trim()}`, f.details.trim()].filter(Boolean).join('\n\n');
    const { error } = await supabase.from('quote_requests').insert({
      name: f.name.trim().slice(0, 150), email: f.email.trim().slice(0, 255), phone: cut(f.phone, 40),
      organization: cut(f.organization), company: cut(f.organization), job_title: cut(f.job_title), country: cut(f.country, 100), city: cut(f.city, 100),
      location: [f.city.trim(), f.country.trim()].filter(Boolean).join(', ') || null,
      event_type: cut(f.event_type), event_date: cut(f.event_date, 60), guests: cut(f.guests, 60), budget: cut(f.budget, 100),
      needs, details: details.slice(0, 5000) || null,
    });
    setBusy(false);
    if (error) { toast({ title: L("L'envoi a échoué, veuillez réessayer.", 'Sending failed, please try again.'), variant: 'destructive' }); return; }
    setSent(true);
  };

  const field = (k: keyof typeof f, label: string, type = 'text', req = false) => (
    <div className="space-y-2">
      <Label htmlFor={k}>{label}{req && ' *'}</Label>
      <Input id={k} type={type} required={req} value={f[k]} onChange={set(k)} className="bg-background" />
    </div>
  );

  return (
    <Layout>
      <Seo title={L("Contact — Démarrer un projet événementiel | CHANY EVENT'S", "Contact — Start an event project | CHANY EVENT'S")}
        description={L("Parlez-nous de votre salon, conférence, mission économique, événement corporate ou mariage. CHANY EVENT'S, Yaoundé, Cameroun.", "Tell us about your trade show, conference, trade mission, corporate event or wedding. CHANY EVENT'S, Yaoundé, Cameroon.")} />
      <section className="pt-36 md:pt-44 pb-12 bg-gradient-to-b from-charcoal to-background">
        <Reveal className="container-luxury px-6 max-w-4xl">
          <span className="eyebrow mb-6">{L('Contacts', 'Contact')}</span>
          <h1 className="text-display font-serif text-foreground mt-6 mb-6">Tell us about your <em>project</em></h1>
          <p className="text-lead text-muted-foreground max-w-2xl">{L('Confiez-nous tout, ou simplement la partie qui vous manque. Nous revenons vers vous rapidement.', 'Trust us with everything, or just the part you are missing. We will get back to you quickly.')}</p>
        </Reveal>
      </section>

      <section className="section-padding pt-8">
        <div className="container-luxury grid lg:grid-cols-12 gap-12">
          <aside className="lg:col-span-4 space-y-8">
            <div className="space-y-4">
              <p className="flex gap-3 text-foreground"><MapPin className="w-5 h-5 text-primary shrink-0" />Yaoundé, {L('Centre-ville, Rue Joseph Mballa Eloumden', 'City centre, Rue Joseph Mballa Eloumden')}, Cameroun</p>
              <a href="tel:+237675788550" className="flex gap-3 text-foreground hover:text-primary"><Phone className="w-5 h-5 text-primary" />+237 675 788 550</a>
              <a href="mailto:contacts@chanyevents.com" className="flex gap-3 text-foreground hover:text-primary"><Mail className="w-5 h-5 text-primary" />contacts@chanyevents.com</a>
            </div>
            <a href={`https://wa.me/237675788550?text=${encodeURIComponent(L('Bonjour, je souhaite discuter de mon projet événementiel.', 'Hello, I would like to discuss my event project.'))}`} target="_blank" rel="noopener noreferrer"
              className="flex items-center justify-center gap-3 p-5 border border-primary text-primary rounded-sm font-semibold hover:bg-primary/10">
              <MessageCircle className="w-5 h-5" />{L('Écrire sur WhatsApp', 'Message us on WhatsApp')}
            </a>
            <p className="text-sm text-muted-foreground">Central Africa • West Africa • East Africa</p>
          </aside>

          <div id="projet" className="lg:col-span-8 scroll-mt-28 bg-card border border-border rounded-sm p-6 md:p-10">
            {sent ? (
              <div className="text-center py-16">
                <CheckCircle2 className="w-12 h-12 text-primary mx-auto mb-6" />
                <h2 className="font-serif text-3xl text-foreground mb-3">{L('Merci, votre projet nous est parvenu', 'Thank you, we received your project')}</h2>
                <p className="text-muted-foreground">{L('Nous vous répondrons dans les plus brefs délais.', 'We will reply as soon as possible.')}</p>
              </div>
            ) : (
              <form onSubmit={submit} className="space-y-8">
                <div className="grid md:grid-cols-2 gap-5">
                  {field('name', L('Nom', 'Name'), 'text', true)}
                  {field('organization', L('Organisation', 'Organisation'))}
                  {field('job_title', L('Fonction', 'Job title'))}
                  {field('email', 'Email', 'email', true)}
                  {field('phone', L('Téléphone', 'Phone'), 'tel')}
                  {field('country', L('Pays', 'Country'))}
                  {field('city', L('Ville', 'City'))}
                  <div className="space-y-2">
                    <Label htmlFor="event_type">{L("Type d'événement", 'Event type')}</Label>
                    <select id="event_type" value={f.event_type} onChange={set('event_type')} className="flex h-10 w-full rounded-md border border-input bg-background px-3 text-sm">
                      <option value="">—</option>
                      {[L('Foire / Salon', 'Trade fair / Show'), L('Conférence / Sommet', 'Conference / Summit'), L('B2B / Rencontres d’affaires', 'B2B / Business Matching'), L('Mission économique', 'Trade mission'), 'Roadshow', L('Pavillon / Exposition', 'Pavilion / Exhibition'), L('Entreprise', 'Corporate'), L('Institutionnel / Diplomatique', 'Institutional / Diplomatic'), L('Délégation', 'Delegation'), L('Mariage / Événement d’exception', 'Wedding / Signature event'), L('Autre', 'Other')].map((o) => <option key={o}>{o}</option>)}
                    </select>
                  </div>
                  {field('event_date', 'Date', 'date')}
                  {field('guests', L('Nombre de participants', 'Number of attendees'))}
                  {field('budget', L('Budget indicatif', 'Indicative budget'))}
                  {field('services', L('Services recherchés', 'Services sought'))}
                </div>
                <fieldset>
                  <legend className="font-serif text-2xl text-foreground mb-4">{L('De quoi avez-vous besoin ?', 'What do you need?')}</legend>
                  <div className="flex flex-wrap gap-2">
                    {NEEDS.map((n) => {
                      const on = needs.includes(n);
                      return (
                        <button type="button" key={n} onClick={() => setNeeds(on ? needs.filter((x) => x !== n) : [...needs, n])}
                          className={`px-4 py-2 rounded-full border text-sm transition-colors ${on ? 'bg-primary text-primary-foreground border-primary' : 'border-border text-foreground/80 hover:border-primary'}`}>
                          {L(NEEDS_FR[n] ?? n, n)}
                        </button>
                      );
                    })}
                  </div>
                </fieldset>
                <div className="space-y-2">
                  <Label htmlFor="details">Message</Label>
                  <Textarea id="details" rows={5} value={f.details} onChange={set('details')} className="bg-background" />
                </div>
                <button type="submit" disabled={busy} className="w-full md:w-auto px-10 py-4 bg-primary text-primary-foreground rounded-sm font-semibold hover-gold-glow disabled:opacity-60">
                  {busy ? L('Envoi…', 'Sending…') : 'Tell us about your project'}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Contact;
