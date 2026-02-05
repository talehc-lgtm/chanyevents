import React from 'react';
import { motion } from 'framer-motion';
import { Star, Crown, Users, Sparkles, Award, Target, Heart } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import Layout from '@/components/layout/Layout';
import SectionHeading from '@/components/common/SectionHeading';
import heroImage from '@/assets/hero-event.jpg';
import staffImage from '@/assets/staff-event.jpg';

const About: React.FC = () => {
  const { t } = useLanguage();

  const values = [
    {
      icon: Star,
      title: t('about.values.elegance'),
      description: "L'élégance guide chacune de nos créations, du concept au moindre détail.",
    },
    {
      icon: Crown,
      title: t('about.values.excellence'),
      description: "Nous visons l'excellence dans chaque aspect de nos prestations.",
    },
    {
      icon: Heart,
      title: t('about.values.human'),
      description: "L'humain est au cœur de notre approche, avec écoute et bienveillance.",
    },
    {
      icon: Sparkles,
      title: t('about.values.detail'),
      description: 'Chaque détail compte pour créer des expériences parfaites.',
    },
  ];

  const milestones = [
    { year: '2009', event: 'Création d\'Ebene Chany Agency' },
    { year: '2015', event: 'Expansion vers Yaoundé' },
    { year: '2018', event: 'Ouverture à Bafoussam' },
    { year: '2023', event: 'Rebranding CHANY EVENT\'S' },
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={heroImage}
            alt="About us"
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/80 to-background" />
        </div>

        <div className="container-luxury relative z-10 px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl"
          >
            <span className="text-primary text-sm font-semibold tracking-[0.3em] uppercase mb-6 block">
              {t('about.subtitle')}
            </span>
            <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl font-semibold text-foreground mb-8">
              {t('about.title')}
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed">
              {t('about.description')}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Story Section */}
      <section className="section-padding">
        <div className="container-luxury">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="font-serif text-4xl font-semibold text-foreground mb-6">
                Notre Histoire
              </h2>
              <div className="space-y-6 text-muted-foreground leading-relaxed">
                <p>
                  CHANY EVENT'S est née de la vision audacieuse de Mario Chany Nguetmi, un passionné de l'événementiel 
                  déterminé à élever les standards du secteur au Cameroun et en Afrique Centrale.
                </p>
                <p>
                  Initialement connue sous le nom d'Ebene Chany Agency, notre entreprise a accompagné des centaines 
                  de clients dans la réalisation de leurs événements les plus précieux. Ce parcours riche d'expériences 
                  nous a permis de perfectionner notre art et d'affiner notre compréhension des attentes d'une clientèle exigeante.
                </p>
                <p>
                  Aujourd'hui, sous la bannière CHANY EVENT'S, nous incarnons une nouvelle ère : celle d'une agence 
                  événementielle premium, résolument tournée vers l'excellence et l'innovation, tout en préservant 
                  les valeurs humaines qui font notre force.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="aspect-[4/5] rounded-sm overflow-hidden">
                <img
                  src={staffImage}
                  alt="Notre équipe"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 bg-primary p-8 rounded-sm">
                <Award className="w-10 h-10 text-primary-foreground mb-2" />
                <p className="text-primary-foreground text-sm">Excellence Camerounaise</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="section-padding bg-charcoal">
        <div className="container-luxury">
          <SectionHeading
            subtitle="Notre Parcours"
            title="Les Moments Clés"
          />

          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-px bg-border" />
            <div className="space-y-12">
              {milestones.map((milestone, index) => (
                <motion.div
                  key={milestone.year}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className={`flex items-center gap-8 ${
                    index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'
                  }`}
                >
                  <div className={`flex-1 ${index % 2 === 0 ? 'text-right' : 'text-left'}`}>
                    <span className="font-serif text-3xl text-gradient-gold font-semibold">
                      {milestone.year}
                    </span>
                    <p className="text-foreground mt-2">{milestone.event}</p>
                  </div>
                  <div className="w-4 h-4 rounded-full bg-primary border-4 border-background relative z-10" />
                  <div className="flex-1" />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Vision */}
      <section className="section-padding">
        <div className="container-luxury">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-card border border-border p-10 rounded-sm"
            >
              <Target className="w-12 h-12 text-primary mb-6" />
              <h3 className="font-serif text-2xl font-semibold text-foreground mb-4">
                {t('about.vision.title')}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {t('about.vision.text')}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-card border border-border p-10 rounded-sm"
            >
              <Heart className="w-12 h-12 text-primary mb-6" />
              <h3 className="font-serif text-2xl font-semibold text-foreground mb-4">
                Notre Mission
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                Accompagner nos clients dans la création d'événements exceptionnels, 
                en offrant un service personnalisé qui dépasse leurs attentes et crée des souvenirs impérissables.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section-padding bg-charcoal">
        <div className="container-luxury">
          <SectionHeading
            subtitle={t('about.values.title')}
            title="Les Piliers de Notre Excellence"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center p-8"
              >
                <div className="w-16 h-16 mx-auto rounded-full bg-primary/10 flex items-center justify-center mb-6">
                  <value.icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="font-serif text-xl font-semibold text-foreground mb-3">
                  {value.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Founder */}
      <section className="section-padding">
        <div className="container-luxury">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <span className="text-primary text-sm font-semibold tracking-[0.2em] uppercase mb-4 block">
                Le Fondateur
              </span>
              <h2 className="font-serif text-4xl md:text-5xl font-semibold text-foreground mb-8">
                Mario Chany Nguetmi
              </h2>
              <blockquote className="text-xl md:text-2xl text-muted-foreground italic leading-relaxed mb-8">
                "Chaque événement est une opportunité de créer de la magie. Notre rôle est de transformer 
                vos rêves en réalité, avec passion et professionnalisme."
              </blockquote>
              <p className="text-muted-foreground">
                Fondateur & Directeur Général
              </p>
            </motion.div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default About;
