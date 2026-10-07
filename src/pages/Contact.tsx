import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, MessageCircle, Calendar, Send, CheckCircle2 } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import Layout from '@/components/layout/Layout';
import SectionHeading from '@/components/common/SectionHeading';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

const Contact: React.FC = () => {
  const { t } = useLanguage();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Contact form submitted:', formData);
    setIsSubmitted(true);
  };

  const locations = [
    {
      city: 'Douala',
      address: 'Akwa, Boulevard de la Liberté',
      phone: '+237 675 788 550',
    },
    {
      city: 'Yaoundé',
      address: 'Centre-ville, Rue Joseph Mballa Eloumden',
      phone: '+237 675 788 550',
    },
    {
      city: 'Bafoussam',
      address: 'Quartier Administratif',
      phone: '+237 675 788 550',
    },
  ];

  const whatsappNumber = '237675788550';
  const whatsappMessage = encodeURIComponent('Bonjour, je souhaite prendre rendez-vous pour discuter de mon projet événementiel.');

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
              {t('contact.subtitle')}
            </span>
            <h1 className="font-serif text-5xl md:text-6xl font-semibold text-foreground mb-6">
              {t('contact.title')}
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              {t('contact.description')}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Quick Actions */}
      <section className="py-12 border-b border-border">
        <div className="container-luxury px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
            <motion.a
              href={`https://wa.me/${whatsappNumber}?text=${whatsappMessage}`}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="flex items-center justify-center gap-3 p-6 bg-[#25D366] rounded-sm text-white font-medium hover:opacity-90 transition-opacity"
            >
              <MessageCircle className="w-6 h-6" />
              {t('contact.whatsapp')}
            </motion.a>

            <motion.a
              href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent('Bonjour, je souhaite prendre rendez-vous.')}`}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="flex items-center justify-center gap-3 p-6 bg-gradient-gold rounded-sm text-primary-foreground font-medium hover-gold-glow"
            >
              <Calendar className="w-6 h-6" />
              {t('contact.appointment')}
            </motion.a>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="section-padding">
        <div className="container-luxury">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="font-serif text-3xl font-semibold text-foreground mb-8">
                Envoyez-nous un message
              </h2>

              {isSubmitted ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-primary/10 flex items-center justify-center">
                    <CheckCircle2 className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="font-serif text-2xl text-foreground mb-2">Message Envoyé !</h3>
                  <p className="text-muted-foreground">
                    Nous vous répondrons dans les plus brefs délais.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-foreground">
                      {t('contact.name')} *
                    </Label>
                    <Input
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="bg-muted border-border focus:border-primary"
                      placeholder="Votre nom complet"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-foreground">
                      {t('contact.email')} *
                    </Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="bg-muted border-border focus:border-primary"
                      placeholder="votre@email.com"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message" className="text-foreground">
                      {t('contact.message')} *
                    </Label>
                    <Textarea
                      id="message"
                      name="message"
                      required
                      rows={6}
                      value={formData.message}
                      onChange={handleChange}
                      className="bg-muted border-border focus:border-primary resize-none"
                      placeholder="Comment pouvons-nous vous aider ?"
                    />
                  </div>

                  <Button
                    type="submit"
                    size="lg"
                    className="w-full bg-gradient-gold text-primary-foreground hover-gold-glow"
                  >
                    {t('contact.send')}
                    <Send className="ml-2 w-5 h-5" />
                  </Button>
                </form>
              )}
            </motion.div>

            {/* Locations & Info */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="font-serif text-3xl font-semibold text-foreground mb-8">
                {t('contact.locations')}
              </h2>

              <div className="space-y-8">
                {locations.map((location) => (
                  <div
                    key={location.city}
                    className="p-6 bg-card border border-border rounded-sm"
                  >
                    <h3 className="font-serif text-xl font-semibold text-foreground mb-4">
                      {location.city}
                    </h3>
                    <div className="space-y-3">
                      <div className="flex items-start gap-3 text-muted-foreground">
                        <MapPin className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                        <span>{location.address}</span>
                      </div>
                      <div className="flex items-center gap-3 text-muted-foreground">
                        <Phone className="w-5 h-5 text-primary flex-shrink-0" />
                        <span>{location.phone}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Additional Info */}
              <div className="mt-8 p-6 bg-card border border-border rounded-sm">
                <div className="flex items-center gap-3 mb-4">
                  <Clock className="w-5 h-5 text-primary" />
                  <span className="text-foreground font-medium">Horaires d'ouverture</span>
                </div>
                <p className="text-muted-foreground">
                  Lundi - Vendredi : 8h00 - 18h00<br />
                  Samedi : 9h00 - 14h00<br />
                  Dimanche : Sur rendez-vous
                </p>
              </div>

              <div className="mt-6 p-6 bg-card border border-border rounded-sm">
                <div className="flex items-center gap-3 mb-4">
                  <Mail className="w-5 h-5 text-primary" />
                  <span className="text-foreground font-medium">Email</span>
                </div>
                <a
                  href="mailto:contacts@chanyevents.com"
                  className="text-primary hover:underline"
                >
                  contacts@chanyevents.com
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Contact;
