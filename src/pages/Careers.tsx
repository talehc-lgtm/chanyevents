import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Briefcase, CalendarDays, MapPin, MessageCircle, CheckCircle2, Users, ClipboardList, Send } from 'lucide-react';
import { z } from 'zod';
import Layout from '@/components/layout/Layout';
import SectionHeading from '@/components/common/SectionHeading';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { useLanguage } from '@/contexts/LanguageContext';
import { supabase } from '@/integrations/supabase/client';

const WHATSAPP_NUMBER = '237675788550';

interface JobOffer {
  id: string;
  title: string;
  intro: string;
  missions: string[];
  profile: string[];
}

const applicationSchema = z.object({
  full_name: z.string().trim().min(2, 'Nom requis').max(100),
  phone: z.string().trim().min(8, 'Téléphone requis').max(20),
  email: z.string().trim().email('Email invalide').max(255).or(z.literal('')),
  city: z.string().trim().max(100).optional(),
  experience: z.string().trim().max(500).optional(),
  message: z.string().trim().max(1000).optional(),
});

const Careers: React.FC = () => {
  const { language } = useLanguage();
  const { toast } = useToast();
  const [selectedPosition, setSelectedPosition] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState({
    full_name: '',
    phone: '',
    email: '',
    city: '',
    experience: '',
    message: '',
  });

  const offers: JobOffer[] = [
    {
      id: 'hotesses',
      title: "Hôtesses d'accueil",
      intro:
        "Chany's Évents organise le casting et le recrutement d'hôtesses expérimentées, basées à Douala, pour le salon In Vino Italia Douala.",
      missions: [
        'Accueil des visiteurs',
        'Renseignements et orientation',
        'Gestion des entrées',
        'Tenue du stand des verres',
      ],
      profile: [
        'Expérience en accueil événementiel',
        'Bonne présentation',
        'Sens du contact et du service',
        'Résidant à Douala',
        'Disponibilité sur toute la durée du salon',
      ],
    },
    {
      id: 'personnel-appui',
      title: "Personnel d'appui",
      intro:
        "Chany's Évents organise le casting et le recrutement du personnel d'appui expérimenté, basé à Douala, pour le salon In Vino Italia Douala.",
      missions: [
        'Suivi de la dernière phase de préparation',
        'Tenue du secrétariat du salon',
        'Appui logistique et coordination',
        'Interface avec les exposants et partenaires',
      ],
      profile: [
        "Expérience en organisation d'événements",
        'Bon niveau de rédaction et de communication',
        'Maîtrise des outils bureautiques',
        "Sens de l'organisation et de la confidentialité",
        'Résidant à Douala',
        'Disponibilité sur toute la durée du salon',
      ],
    },
  ];

  const whatsappApply = (positionTitle: string) => {
    const text = encodeURIComponent(
      `Bonjour, je souhaite postuler au poste « ${positionTitle} » pour le salon In Vino Italia Douala (26–28 novembre 2026).`
    );
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${text}`, '_blank', 'noopener,noreferrer');
  };

  const applyFor = (offer: JobOffer) => {
    setSelectedPosition(offer.title);
    document.getElementById('candidature')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedPosition) {
      toast({
        title: language === 'fr' ? 'Choisissez un poste' : 'Choose a position',
        description:
          language === 'fr'
            ? 'Veuillez sélectionner le poste auquel vous postulez.'
            : 'Please select the position you are applying for.',
        variant: 'destructive',
      });
      return;
    }

    const parsed = applicationSchema.safeParse(form);
    if (!parsed.success) {
      toast({
        title: language === 'fr' ? 'Formulaire incomplet' : 'Incomplete form',
        description: parsed.error.errors[0]?.message,
        variant: 'destructive',
      });
      return;
    }

    setIsSubmitting(true);
    const { error } = await supabase.from('job_applications').insert({
      position: selectedPosition,
      full_name: parsed.data.full_name,
      phone: parsed.data.phone,
      email: parsed.data.email || null,
      city: parsed.data.city || null,
      experience: parsed.data.experience || null,
      message: parsed.data.message || null,
    });
    setIsSubmitting(false);

    if (error) {
      toast({
        title: language === 'fr' ? 'Erreur' : 'Error',
        description:
          language === 'fr'
            ? "Votre candidature n'a pas pu être envoyée. Réessayez ou postulez via WhatsApp."
            : 'Your application could not be sent. Try again or apply via WhatsApp.',
        variant: 'destructive',
      });
      return;
    }

    // Trigger automatic evaluation (fire-and-forget)
    supabase.functions
      .invoke('evaluate-application', {
        body: {
          position: selectedPosition,
          full_name: parsed.data.full_name,
          phone: parsed.data.phone,
          email: parsed.data.email || null,
          city: parsed.data.city || null,
          experience: parsed.data.experience || null,
          message: parsed.data.message || null,
        },
      })
      .catch(() => {});

    toast({
      title: language === 'fr' ? 'Candidature envoyée !' : 'Application sent!',
      description:
        language === 'fr'
          ? 'Merci ! Notre équipe vous recontactera très vite.'
          : 'Thank you! Our team will get back to you very soon.',
    });
    setForm({ full_name: '', phone: '', email: '', city: '', experience: '', message: '' });
    setSelectedPosition('');
  };

  return (
    <Layout>
      {/* Hero */}
      <section className="relative pt-48 pb-24 bg-charcoal overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-gradient-gold" />
        </div>
        <div className="container-luxury px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            <span className="inline-flex items-center gap-3 text-primary text-sm font-semibold tracking-[0.28em] uppercase mb-6">
              <Briefcase className="h-5 w-5" />
              {language === 'fr' ? 'Nous Recrutons' : 'We Are Hiring'}
            </span>
            <h1 className="text-display font-serif font-semibold text-foreground mb-8">
              {language === 'fr' ? 'Rejoignez' : 'Join'}{' '}
              <span className="text-gradient-gold">
                {language === 'fr' ? "l'équipe Chany's Évents" : "the Chany's Évents team"}
              </span>
            </h1>
            <p className="text-lead text-muted-foreground leading-relaxed">
              {language === 'fr'
                ? "Casting et recrutement pour le salon In Vino Italia Douala — Salon des vins italiens en Afrique Centrale."
                : 'Casting and recruitment for the In Vino Italia Douala fair — Italian wine fair in Central Africa.'}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Event info banner */}
      <section className="py-10 border-y border-border bg-background">
        <div className="container-luxury px-6">
          <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16 text-center">
            <div className="flex items-center gap-3">
              <CalendarDays className="w-6 h-6 text-primary" />
              <span className="text-foreground font-medium text-lg">
                26 – 28 {language === 'fr' ? 'novembre' : 'November'} 2026
              </span>
            </div>
            <div className="flex items-center gap-3">
              <MapPin className="w-6 h-6 text-primary" />
              <span className="text-foreground font-medium text-lg">
                Best Western Plus Soaha Hotel — Douala, {language === 'fr' ? 'Cameroun' : 'Cameroon'}
              </span>
            </div>
            <div className="flex items-center gap-3">
              <Users className="w-6 h-6 text-primary" />
              <span className="text-foreground font-medium text-lg">In Vino Italia Douala</span>
            </div>
          </div>
        </div>
      </section>

      {/* Job offers */}
      <section className="section-padding">
        <div className="container-luxury">
          <SectionHeading
            subtitle={language === 'fr' ? 'Offres ouvertes' : 'Open positions'}
            title={language === 'fr' ? 'Nos Offres d’Emploi' : 'Our Job Offers'}
          />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {offers.map((offer, index) => (
              <motion.article
                key={offer.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="p-8 md:p-10 bg-card border border-border rounded-sm hover:border-primary/50 transition-all duration-300 flex flex-col"
              >
                <h3 className="font-serif text-3xl font-semibold text-foreground mb-4">
                  {offer.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed mb-8">{offer.intro}</p>

                <div className="mb-8">
                  <h4 className="flex items-center gap-2 text-primary text-sm font-semibold tracking-[0.2em] uppercase mb-4">
                    <ClipboardList className="w-4 h-4" />
                    {language === 'fr' ? 'Vos missions' : 'Your missions'}
                  </h4>
                  <ul className="space-y-2">
                    {offer.missions.map((mission) => (
                      <li key={mission} className="flex items-start gap-3 text-foreground/90">
                        <CheckCircle2 className="w-4 h-4 text-primary mt-1 shrink-0" />
                        <span>{mission}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mb-10">
                  <h4 className="flex items-center gap-2 text-primary text-sm font-semibold tracking-[0.2em] uppercase mb-4">
                    <Users className="w-4 h-4" />
                    {language === 'fr' ? 'Profil recherché' : 'Required profile'}
                  </h4>
                  <ul className="space-y-2">
                    {offer.profile.map((item) => (
                      <li key={item} className="flex items-start gap-3 text-foreground/90">
                        <CheckCircle2 className="w-4 h-4 text-primary mt-1 shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-auto flex flex-col sm:flex-row gap-4">
                  <Button
                    size="lg"
                    className="bg-gradient-gold text-primary-foreground hover-gold-glow flex-1"
                    onClick={() => applyFor(offer)}
                  >
                    <Send className="mr-2 w-4 h-4" />
                    {language === 'fr' ? 'Postuler en ligne' : 'Apply online'}
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-primary text-primary hover:bg-primary/10 flex-1"
                    onClick={() => whatsappApply(offer.title)}
                  >
                    <MessageCircle className="mr-2 w-4 h-4" />
                    WhatsApp
                  </Button>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* Application form */}
      <section id="candidature" className="section-padding bg-charcoal scroll-mt-32">
        <div className="container-luxury">
          <SectionHeading
            subtitle={language === 'fr' ? 'Candidature en ligne' : 'Online application'}
            title={language === 'fr' ? 'Postulez Maintenant' : 'Apply Now'}
            description={
              language === 'fr'
                ? 'Remplissez ce formulaire ou envoyez vos photos et CV par WhatsApp au +237 675 788 550.'
                : 'Fill out this form or send your photos and CV via WhatsApp to +237 675 788 550.'
            }
          />

          <motion.form
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            onSubmit={handleSubmit}
            className="max-w-3xl mx-auto p-8 md:p-10 bg-card border border-border rounded-sm space-y-6"
          >
            <div>
              <Label htmlFor="position" className="text-foreground">
                {language === 'fr' ? 'Poste souhaité *' : 'Desired position *'}
              </Label>
              <select
                id="position"
                value={selectedPosition}
                onChange={(e) => setSelectedPosition(e.target.value)}
                className="mt-2 w-full h-10 rounded-sm border border-border bg-background px-3 text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                required
              >
                <option value="">
                  {language === 'fr' ? '— Sélectionnez un poste —' : '— Select a position —'}
                </option>
                {offers.map((offer) => (
                  <option key={offer.id} value={offer.title}>
                    {offer.title}
                  </option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="full_name" className="text-foreground">
                  {language === 'fr' ? 'Nom complet *' : 'Full name *'}
                </Label>
                <Input
                  id="full_name"
                  value={form.full_name}
                  onChange={(e) => setForm({ ...form, full_name: e.target.value })}
                  maxLength={100}
                  required
                  className="mt-2"
                />
              </div>
              <div>
                <Label htmlFor="phone" className="text-foreground">
                  {language === 'fr' ? 'Téléphone / WhatsApp *' : 'Phone / WhatsApp *'}
                </Label>
                <Input
                  id="phone"
                  type="tel"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  maxLength={20}
                  required
                  className="mt-2"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="email" className="text-foreground">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  maxLength={255}
                  className="mt-2"
                />
              </div>
              <div>
                <Label htmlFor="city" className="text-foreground">
                  {language === 'fr' ? 'Ville de résidence' : 'City of residence'}
                </Label>
                <Input
                  id="city"
                  value={form.city}
                  onChange={(e) => setForm({ ...form, city: e.target.value })}
                  maxLength={100}
                  className="mt-2"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="experience" className="text-foreground">
                {language === 'fr' ? 'Expérience événementielle' : 'Event experience'}
              </Label>
              <Textarea
                id="experience"
                value={form.experience}
                onChange={(e) => setForm({ ...form, experience: e.target.value })}
                maxLength={500}
                rows={3}
                className="mt-2"
                placeholder={
                  language === 'fr'
                    ? 'Décrivez brièvement vos expériences en événementiel…'
                    : 'Briefly describe your event experience…'
                }
              />
            </div>

            <div>
              <Label htmlFor="message" className="text-foreground">
                Message
              </Label>
              <Textarea
                id="message"
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                maxLength={1000}
                rows={4}
                className="mt-2"
              />
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <Button
                type="submit"
                size="lg"
                disabled={isSubmitting}
                className="bg-gradient-gold text-primary-foreground hover-gold-glow flex-1"
              >
                <Send className="mr-2 w-4 h-4" />
                {isSubmitting
                  ? language === 'fr'
                    ? 'Envoi en cours…'
                    : 'Sending…'
                  : language === 'fr'
                    ? 'Envoyer ma candidature'
                    : 'Send my application'}
              </Button>
              <Button
                type="button"
                size="lg"
                variant="outline"
                className="border-primary text-primary hover:bg-primary/10 flex-1"
                onClick={() =>
                  whatsappApply(selectedPosition || (language === 'fr' ? 'un poste' : 'a position'))
                }
              >
                <MessageCircle className="mr-2 w-4 h-4" />
                {language === 'fr' ? 'Postuler via WhatsApp' : 'Apply via WhatsApp'}
              </Button>
            </div>
          </motion.form>
        </div>
      </section>
    </Layout>
  );
};

export default Careers;
