import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Building2, Crown, Sparkles, Users, Megaphone, CheckCircle2 } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import Layout from '@/components/layout/Layout';
import SectionHeading from '@/components/common/SectionHeading';
import { Button } from '@/components/ui/button';
import tableDecorImage from '@/assets/chany-table-decor.jpg';
import promote2017TeamImage from '@/assets/chany-promote-2017-team.jpg';
import registrationTeamImage from '@/assets/chany-registration-team.jpg';
import brandTeamImage from '@/assets/chany-brand-team.jpg';
import weddingAisleImage from '@/assets/chany-wedding-aisle.jpg';
import exnessConsultationImage from '@/assets/chany-exness-consultation.jpg';
import luxuryWeddingCoupleImage from '@/assets/chany-luxury-wedding-couple.png';
import weddingFireworksImage from '@/assets/chany-wedding-fireworks.png';
import weddingArchCoupleImage from '@/assets/chany-wedding-arch-couple.png';
import promoteInformationTeamImage from '@/assets/chany-promote-information-team.png';

const Services: React.FC = () => {
  const { t } = useLanguage();

  const services = [
    {
      icon: Building2,
      title: t('services.corporate.title'),
      description: t('services.corporate.desc'),
      image: exnessConsultationImage,
      features: [
        'Conférences & séminaires',
        'Team building',
        'Lancements de produits',
        'Réunions stratégiques',
        'Conventions d\'entreprise',
      ],
    },
    {
      icon: Crown,
      title: t('services.weddings.title'),
      description: t('services.weddings.desc'),
      image: weddingArchCoupleImage,
      features: [
        'Cérémonies traditionnelles',
        'Réceptions sur mesure',
        'Décoration florale',
        'Coordination jour J',
        'Lune de miel organisée',
      ],
    },
    {
      icon: Sparkles,
      title: t('services.vip.title'),
      description: t('services.vip.desc'),
      image: weddingFireworksImage,
      features: [
        'Galas & soirées de prestige',
        'Événements privés',
        'Anniversaires exclusifs',
        'Réceptions diplomatiques',
        'Service de conciergerie',
      ],
    },
    {
      icon: Megaphone,
      title: t('services.fairs.title'),
      description: t('services.fairs.desc'),
      image: brandTeamImage,
      features: [
        'Conception de stands',
        'Logistique complète',
        'Animation sur site',
        'Signalétique personnalisée',
        'Gestion des exposants',
      ],
    },
    {
      icon: Users,
      title: t('services.staffing.title'),
      description: t('services.staffing.desc'),
      image: promoteInformationTeamImage,
      features: [
        'Hôtesses & stewards',
        'Mannequins professionnels',
        'Figurants qualifiés',
        'Personnel d\'accueil',
        'Formation sur mesure',
      ],
    },
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="pt-40 md:pt-44 pb-20 bg-gradient-to-b from-charcoal to-background">
        <div className="container-luxury px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <span className="text-primary text-sm font-semibold tracking-[0.3em] uppercase mb-6 block">
              {t('services.subtitle')}
            </span>
            <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl font-semibold text-foreground mb-8">
              {t('services.title')}
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              De la conception à la réalisation, nous offrons une gamme complète de services 
              événementiels pour répondre à toutes vos exigences avec excellence.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services List */}
      <section className="section-padding">
        <div className="container-luxury">
          <div className="space-y-24">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${
                  index % 2 === 1 ? 'lg:flex-row-reverse' : ''
                }`}
              >
                <div className={index % 2 === 1 ? 'lg:order-2' : ''}>
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center">
                      <service.icon className="w-7 h-7 text-primary" />
                    </div>
                    <h2 className="font-serif text-3xl md:text-4xl font-semibold text-foreground">
                      {service.title}
                    </h2>
                  </div>
                  <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                    {service.description}
                  </p>
                  <ul className="space-y-3 mb-8">
                    {service.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-3 text-foreground">
                        <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>

                </div>

                <div className={index % 2 === 1 ? 'lg:order-1' : ''}>
                  <div className="aspect-[4/3] rounded-sm overflow-hidden">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="section-padding bg-charcoal">
        <div className="container-luxury">
          <SectionHeading
            subtitle="Notre Approche"
            title="Un Processus Éprouvé"
            description="De la première rencontre à la réalisation finale, nous vous accompagnons à chaque étape."
          />

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { step: '01', title: 'Consultation', desc: 'Nous écoutons vos besoins et vos rêves.' },
              { step: '02', title: 'Conception', desc: 'Nous créons un concept sur mesure.' },
              { step: '03', title: 'Planification', desc: 'Nous organisons chaque détail.' },
              { step: '04', title: 'Réalisation', desc: 'Nous donnons vie à votre événement.' },
            ].map((item, index) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <span className="font-serif text-5xl text-gradient-gold font-semibold block mb-4">
                  {item.step}
                </span>
                <h3 className="font-serif text-xl text-foreground font-semibold mb-2">
                  {item.title}
                </h3>
                <p className="text-muted-foreground text-sm">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding">
        <div className="container-luxury">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-card border border-border p-12 md:p-16 rounded-sm text-center"
          >
            <h2 className="font-serif text-3xl md:text-4xl font-semibold text-foreground mb-6">
              Vous avez un projet ?
            </h2>
            <p className="text-muted-foreground text-lg mb-8 max-w-2xl mx-auto">
              Discutons ensemble de votre vision. Notre équipe est prête à transformer 
              vos idées en une expérience exceptionnelle.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact">
                <Button size="lg" variant="outline" className="border-primary text-primary hover:bg-primary/10">
                  Nous contacter
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default Services;
