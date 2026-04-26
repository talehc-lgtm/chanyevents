import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight, Crown, Users, Sparkles, Building2, Globe, Star, Megaphone } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import Layout from '@/components/layout/Layout';
import SectionHeading from '@/components/common/SectionHeading';
import { Button } from '@/components/ui/button';
import vipImage from '@/assets/vip-event.jpg';
import traditionalHostessesImage from '@/assets/chany-hostesses-traditional.jpg';
import promoteTeamImage from '@/assets/chany-promote-team.jpg';
import exnessHostessesImage from '@/assets/chany-exness-hostesses.jpg';
import maleHostsImage from '@/assets/chany-male-hosts.jpg';
import weddingHostessesImage from '@/assets/chany-wedding-hostesses.jpg';
import vipReceptionImage from '@/assets/chany-vip-reception.jpg';

const Index: React.FC = () => {
  const { t } = useLanguage();
  const [activeHeroSlide, setActiveHeroSlide] = useState(0);

  const services = [
    {
      icon: Building2,
      title: t('services.corporate.title'),
      description: t('services.corporate.desc'),
    },
    {
      icon: Crown,
      title: t('services.weddings.title'),
      description: t('services.weddings.desc'),
    },
    {
      icon: Sparkles,
      title: t('services.vip.title'),
      description: t('services.vip.desc'),
    },
    {
      icon: Globe,
      title: t('services.translation.title'),
      description: t('services.translation.desc'),
    },
  ];

  const stats = [
    { number: '500+', label: 'Événements réalisés' },
    { number: '15+', label: "Années d'expérience" },
    { number: '98%', label: 'Clients satisfaits' },
    { number: '3', label: 'Villes au Cameroun' },
  ];

  const portfolioItems = [
    { image: traditionalHostessesImage, title: 'Accueil protocolaire', category: 'VIP' },
    { image: promoteTeamImage, title: 'Activation de marque', category: 'Salon' },
    { image: weddingHostessesImage, title: 'Cérémonie privée', category: 'Mariage' },
  ];

  const heroSlides = [
    {
      image: promoteTeamImage,
      icon: Building2,
      label: t('services.corporate.title'),
      title: 'Événements Corporate',
      description: 'Conférences, séminaires et lancements de produits conçus pour renforcer votre image et marquer vos invités.',
    },
    {
      image: weddingHostessesImage,
      icon: Crown,
      label: t('services.weddings.title'),
      title: 'Mariages & Célébrations',
      description: 'Des célébrations raffinées, profondément humaines, orchestrées avec élégance et précision jusque dans le moindre détail.',
    },
    {
      image: traditionalHostessesImage,
      icon: Sparkles,
      label: t('services.vip.title'),
      title: 'Événements VIP',
      description: 'Réceptions privées, galas et soirées exclusives avec un service discret, fluide et irréprochable.',
    },
    {
      image: exnessHostessesImage,
      icon: Megaphone,
      label: t('services.fairs.title'),
      title: 'Salons & Foires',
      description: 'Des espaces événementiels premium pensés pour attirer, engager et convertir votre audience professionnelle.',
    },
    {
      image: maleHostsImage,
      icon: Users,
      label: t('services.staffing.title'),
      title: 'Personnel Événementiel',
      description: 'Hôtesses, stewards, mannequins et équipes qualifiées pour représenter votre marque avec distinction.',
    },
    {
      image: vipReceptionImage,
      icon: Globe,
      label: t('services.translation.title'),
      title: 'Traduction FR/EN',
      description: 'Une communication fluide pour vos symposiums, conférences et événements internationaux.',
    },
  ];

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveHeroSlide((current) => (current + 1) % heroSlides.length);
    }, 6500);

    return () => window.clearInterval(timer);
  }, [heroSlides.length]);

  const currentHeroSlide = heroSlides[activeHeroSlide];
  const HeroIcon = currentHeroSlide.icon;

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <AnimatePresence mode="wait">
            <motion.img
              key={currentHeroSlide.title}
              src={currentHeroSlide.image}
              alt={currentHeroSlide.title}
              className="absolute inset-0 w-full h-full object-cover"
              initial={{ opacity: 0, scale: 1.04 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.02 }}
              transition={{ duration: 1.1, ease: 'easeOut' }}
            />
          </AnimatePresence>
          <div className="absolute inset-0 bg-gradient-to-b from-background/35 via-background/68 to-background" />
          <div className="absolute inset-y-0 left-0 w-full bg-gradient-to-r from-background/80 via-background/35 to-transparent" />
        </div>

        {/* Content */}
        <div className="relative z-10 container-luxury w-full px-6 pt-32 pb-28">
          <div className="grid min-h-[68vh] items-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentHeroSlide.title}
                initial={{ opacity: 0, y: 28 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -18 }}
                transition={{ duration: 0.65, ease: 'easeOut' }}
                className="max-w-3xl"
              >
                <span className="mb-6 inline-flex items-center gap-3 text-primary text-sm font-semibold tracking-[0.28em] uppercase">
                  <HeroIcon className="h-5 w-5" />
                  {currentHeroSlide.label}
                </span>
                <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-semibold text-foreground mb-8 leading-tight">
                  {currentHeroSlide.title.split(' ').slice(0, 1).join(' ')}
                  <span className="block text-gradient-gold">
                    {currentHeroSlide.title.split(' ').slice(1).join(' ')}
                  </span>
                </h1>
                <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mb-12 leading-relaxed">
                  {currentHeroSlide.description}
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/quote">
                <Button
                  size="lg"
                  className="bg-gradient-gold text-primary-foreground hover-gold-glow text-lg px-8 py-6"
                >
                  {t('hero.cta.quote')}
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Link to="/services">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-primary text-primary hover:bg-primary/10 text-lg px-8 py-6"
                >
                  {t('hero.cta.discover')}
                </Button>
              </Link>
                </div>
              </motion.div>
            </AnimatePresence>

          </div>

          <div className="absolute bottom-10 left-6 right-6 z-20 lg:hidden">
            <div className="flex justify-center gap-2">
              {heroSlides.map((slide, index) => (
                <button
                  key={slide.title}
                  type="button"
                  onClick={() => setActiveHeroSlide(index)}
                  aria-label={`Slide ${index + 1}`}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    activeHeroSlide === index ? 'w-10 bg-primary' : 'w-2 bg-foreground/40'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <div className="w-6 h-10 border-2 border-primary/50 rounded-full flex justify-center">
            <div className="w-1.5 h-3 bg-primary rounded-full mt-2" />
          </div>
        </motion.div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-charcoal border-y border-border">
        <div className="container-luxury px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <span className="block font-serif text-4xl md:text-5xl font-semibold text-gradient-gold mb-2">
                  {stat.number}
                </span>
                <span className="text-muted-foreground text-sm md:text-base">{stat.label}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Preview */}
      <section className="section-padding">
        <div className="container-luxury">
          <SectionHeading
            subtitle={t('services.subtitle')}
            title={t('services.title')}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group p-8 bg-card border border-border rounded-sm hover:border-primary/50 transition-all duration-300"
              >
                <service.icon className="w-12 h-12 text-primary mb-6" />
                <h3 className="font-serif text-2xl font-semibold text-foreground mb-4">
                  {service.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {service.description}
                </p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <Link to="/services">
              <Button variant="outline" size="lg" className="border-primary text-primary hover:bg-primary/10">
                Voir tous nos services
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Portfolio Preview */}
      <section className="section-padding bg-charcoal">
        <div className="container-luxury">
          <SectionHeading
            subtitle={t('portfolio.subtitle')}
            title={t('portfolio.title')}
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {portfolioItems.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group relative aspect-[4/5] overflow-hidden rounded-sm"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <span className="text-primary text-sm font-medium tracking-wider uppercase">
                    {item.category}
                  </span>
                  <h3 className="font-serif text-xl text-foreground mt-2">{item.title}</h3>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <Link to="/portfolio">
              <Button variant="outline" size="lg" className="border-primary text-primary hover:bg-primary/10">
                Découvrir nos réalisations
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Values Section */}
      <section className="section-padding">
        <div className="container-luxury">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <span className="text-primary text-sm font-semibold tracking-[0.2em] uppercase mb-4 block">
                {t('about.values.title')}
              </span>
              <h2 className="font-serif text-4xl md:text-5xl font-semibold text-foreground mb-8">
                Ce qui nous distingue
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed mb-8">
                Chaque événement est une œuvre unique, façonnée par notre passion pour l'excellence et notre engagement envers votre satisfaction.
              </p>
              <div className="grid grid-cols-2 gap-6">
                {[
                  { icon: Star, label: t('about.values.elegance') },
                  { icon: Crown, label: t('about.values.excellence') },
                  { icon: Users, label: t('about.values.human') },
                  { icon: Sparkles, label: t('about.values.detail') },
                ].map((value, index) => (
                  <div key={value.label} className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <value.icon className="w-5 h-5 text-primary" />
                    </div>
                    <span className="text-foreground font-medium">{value.label}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="aspect-square rounded-sm overflow-hidden">
                <img
                  src={vipImage}
                  alt="Excellence événementielle"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-primary p-6 rounded-sm">
                <p className="font-serif text-2xl text-primary-foreground font-semibold">15+</p>
                <p className="text-primary-foreground/80 text-sm">Années d'excellence</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-charcoal relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-gradient-gold" />
        </div>
        <div className="container-luxury relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto"
          >
            <h2 className="font-serif text-4xl md:text-5xl font-semibold text-foreground mb-6">
              {t('cta.title')}
            </h2>
            <p className="text-xl text-muted-foreground mb-10">
              {t('cta.description')}
            </p>
            <Link to="/quote">
              <Button
                size="lg"
                className="bg-gradient-gold text-primary-foreground hover-gold-glow text-lg px-10 py-6"
              >
                {t('cta.button')}
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
