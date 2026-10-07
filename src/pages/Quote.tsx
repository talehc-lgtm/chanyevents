import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, CheckCircle2 } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const Quote: React.FC = () => {
  const { t } = useLanguage();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    eventType: '',
    eventDate: '',
    guests: '',
    budget: '',
    location: '',
    details: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData({ ...formData, [name]: value });
  };

  const [sending, setSending] = useState(false);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const f = formData;
    const clip = (v: string, n = 200) => v.trim().slice(0, n) || null;
    if (!f.name.trim() || !/^\S+@\S+\.\S+$/.test(f.email.trim())) {
      toast({ title: 'Veuillez indiquer un nom et un email valides.', variant: 'destructive' });
      return;
    }
    setSending(true);
    const { error } = await supabase.from('quote_requests').insert({
      name: f.name.trim().slice(0, 150), email: f.email.trim().slice(0, 255),
      phone: clip(f.phone, 40), company: clip(f.company), event_type: clip(f.eventType),
      event_date: clip(f.eventDate, 40), guests: clip(f.guests, 40), budget: clip(f.budget),
      location: clip(f.location), details: clip(f.details, 4000),
    });
    setSending(false);
    if (error) {
      toast({ title: "L'envoi a échoué, veuillez réessayer.", variant: 'destructive' });
      return;
    }
    setIsSubmitted(true);
  };

  const eventTypes = [
    'Événement Corporate',
    'Mariage',
    'Événement VIP',
    'Salon / Foire',
    'Lancement de Produit',
    'Séminaire / Conférence',
    'Autre',
  ];

  const budgetRanges = [
    'Moins de 1 000 000 FCFA',
    '1 000 000 - 5 000 000 FCFA',
    '5 000 000 - 15 000 000 FCFA',
    '15 000 000 - 50 000 000 FCFA',
    'Plus de 50 000 000 FCFA',
  ];

  const guestRanges = [
    'Moins de 50',
    '50 - 100',
    '100 - 250',
    '250 - 500',
    'Plus de 500',
  ];

  if (isSubmitted) {
    return (
      <Layout>
        <section className="min-h-screen flex items-center justify-center px-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center max-w-lg"
          >
            <div className="w-20 h-20 mx-auto mb-8 rounded-full bg-primary/10 flex items-center justify-center">
              <CheckCircle2 className="w-10 h-10 text-primary" />
            </div>
            <h2 className="font-serif text-3xl font-semibold text-foreground mb-4">
              Demande Envoyée !
            </h2>
            <p className="text-muted-foreground text-lg">
              {t('quote.success')}
            </p>
          </motion.div>
        </section>
      </Layout>
    );
  }

  return (
    <Layout>
      {/* Hero Section */}
      <section className="pt-32 pb-12 bg-gradient-to-b from-charcoal to-background">
        <div className="container-luxury px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-3xl mx-auto"
          >
            <span className="text-primary text-sm font-semibold tracking-[0.3em] uppercase mb-6 block">
              {t('quote.subtitle')}
            </span>
            <h1 className="font-serif text-5xl md:text-6xl font-semibold text-foreground mb-6">
              {t('quote.title')}
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              {t('quote.description')}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Form Section */}
      <section className="section-padding">
        <div className="container-luxury max-w-4xl">
          <motion.form
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            onSubmit={handleSubmit}
            className="bg-card border border-border rounded-sm p-8 md:p-12"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {/* Name */}
              <div className="space-y-2">
                <Label htmlFor="name" className="text-foreground">
                  {t('quote.name')} *
                </Label>
                <Input
                  id="name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="bg-muted border-border focus:border-primary"
                  placeholder="Jean Dupont"
                />
              </div>

              {/* Email */}
              <div className="space-y-2">
                <Label htmlFor="email" className="text-foreground">
                  {t('quote.email')} *
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="bg-muted border-border focus:border-primary"
                  placeholder="jean@exemple.com"
                />
              </div>

              {/* Phone */}
              <div className="space-y-2">
                <Label htmlFor="phone" className="text-foreground">
                  {t('quote.phone')} *
                </Label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={handleChange}
                  className="bg-muted border-border focus:border-primary"
                  placeholder="+237 6XX XXX XXX"
                />
              </div>

              {/* Company */}
              <div className="space-y-2">
                <Label htmlFor="company" className="text-foreground">
                  {t('quote.company')}
                </Label>
                <Input
                  id="company"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  className="bg-muted border-border focus:border-primary"
                  placeholder="Nom de votre entreprise"
                />
              </div>

              {/* Event Type */}
              <div className="space-y-2">
                <Label className="text-foreground">{t('quote.eventType')} *</Label>
                <Select
                  value={formData.eventType}
                  onValueChange={(value) => handleSelectChange('eventType', value)}
                  required
                >
                  <SelectTrigger className="bg-muted border-border">
                    <SelectValue placeholder="Sélectionnez un type" />
                  </SelectTrigger>
                  <SelectContent className="bg-card border-border">
                    {eventTypes.map((type) => (
                      <SelectItem key={type} value={type}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Event Date */}
              <div className="space-y-2">
                <Label htmlFor="eventDate" className="text-foreground">
                  {t('quote.eventDate')} *
                </Label>
                <Input
                  id="eventDate"
                  name="eventDate"
                  type="date"
                  required
                  value={formData.eventDate}
                  onChange={handleChange}
                  className="bg-muted border-border focus:border-primary"
                />
              </div>

              {/* Guests */}
              <div className="space-y-2">
                <Label className="text-foreground">{t('quote.guests')} *</Label>
                <Select
                  value={formData.guests}
                  onValueChange={(value) => handleSelectChange('guests', value)}
                  required
                >
                  <SelectTrigger className="bg-muted border-border">
                    <SelectValue placeholder="Nombre d'invités" />
                  </SelectTrigger>
                  <SelectContent className="bg-card border-border">
                    {guestRanges.map((range) => (
                      <SelectItem key={range} value={range}>
                        {range}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Budget */}
              <div className="space-y-2">
                <Label className="text-foreground">{t('quote.budget')}</Label>
                <Select
                  value={formData.budget}
                  onValueChange={(value) => handleSelectChange('budget', value)}
                >
                  <SelectTrigger className="bg-muted border-border">
                    <SelectValue placeholder="Sélectionnez une fourchette" />
                  </SelectTrigger>
                  <SelectContent className="bg-card border-border">
                    {budgetRanges.map((range) => (
                      <SelectItem key={range} value={range}>
                        {range}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Location */}
            <div className="space-y-2 mb-6">
              <Label htmlFor="location" className="text-foreground">
                {t('quote.location')}
              </Label>
              <Input
                id="location"
                name="location"
                value={formData.location}
                onChange={handleChange}
                className="bg-muted border-border focus:border-primary"
                placeholder="Douala, Hôtel Sawa, etc."
              />
            </div>

            {/* Details */}
            <div className="space-y-2 mb-8">
              <Label htmlFor="details" className="text-foreground">
                {t('quote.details')} *
              </Label>
              <Textarea
                id="details"
                name="details"
                required
                rows={6}
                value={formData.details}
                onChange={handleChange}
                className="bg-muted border-border focus:border-primary resize-none"
                placeholder="Décrivez votre projet, vos attentes, vos inspirations..."
              />
            </div>

            <Button
              type="submit"
              size="lg"
              className="w-full bg-gradient-gold text-primary-foreground hover-gold-glow text-lg py-6"
            >
              {t('quote.submit')}
              <Send className="ml-2 w-5 h-5" />
            </Button>
          </motion.form>
        </div>
      </section>
    </Layout>
  );
};

export default Quote;
