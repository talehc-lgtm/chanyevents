import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CalendarDays, MapPin, ArrowRight } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import Layout from '@/components/layout/Layout';
import { Seo } from '@/components/common/Blocks';
import SectionHeading from '@/components/common/SectionHeading';
import { Button } from '@/components/ui/button';
import tableDecorImage from '@/assets/chany-table-decor.jpg';
import promote2017TeamImage from '@/assets/chany-promote-2017-team.jpg';
import informationDeskImage from '@/assets/chany-information-desk.jpg';
import registrationTeamImage from '@/assets/chany-registration-team.jpg';
import centralInfoTeamImage from '@/assets/chany-central-info-team.jpg';
import brandTeamImage from '@/assets/chany-brand-team.jpg';
import weddingAisleImage from '@/assets/chany-wedding-aisle.jpg';
import exnessConsultationImage from '@/assets/chany-exness-consultation.jpg';
import luxuryWeddingCoupleImage from '@/assets/chany-luxury-wedding-couple.png';
import weddingFireworksImage from '@/assets/chany-wedding-fireworks.png';
import weddingArchCoupleImage from '@/assets/chany-wedding-arch-couple.png';
import promoteInformationTeamImage from '@/assets/chany-promote-information-team.png';
import invinoPosterAsset from '@/assets/invino-douala-affiche.jpg.asset.json';

interface PortfolioItem {
  id: number;
  title: string;
  category: string;
  image: string;
  description: string;
  location: string;
  guests: string;
}

const Portfolio: React.FC = () => {
  const { t, language } = useLanguage();
  const [selectedItem, setSelectedItem] = useState<PortfolioItem | null>(null);
  const [activeFilter, setActiveFilter] = useState('all');

  const portfolioItems: PortfolioItem[] = [
    {
      id: 1,
      title: 'Stand Exness',
      category: 'corporate',
      image: exnessConsultationImage,
      description: "Accompagnement professionnel sur stand avec accueil, information client et représentation de marque dans un cadre corporate.",
      location: 'Douala, Cameroun',
      guests: '500+',
    },
    {
      id: 2,
      title: 'Mariage de prestige',
      category: 'wedding',
      image: weddingArchCoupleImage,
      description: "Mise en scène romantique et coordination élégante pour une célébration de mariage mémorable et raffinée.",
      location: 'Bafoussam, Cameroun',
      guests: '350',
    },
    {
      id: 3,
      title: 'Équipe PROMOTE 2017',
      category: 'corporate',
      image: promote2017TeamImage,
      description: "Déploiement d'une large équipe terrain pour encadrer l'accueil, l'orientation et l'accompagnement des visiteurs.",
      location: 'Yaoundé, Cameroun',
      guests: '200',
    },
    {
      id: 4,
      title: 'Final spectaculaire',
      category: 'vip',
      image: weddingFireworksImage,
      description: "Effet de scène, entrée remarquable et atmosphère premium pour sublimer les moments forts d'une soirée privée.",
      location: 'Yaoundé, Cameroun',
      guests: '150',
    },
    {
      id: 5,
      title: 'Point central d’information',
      category: 'fair',
      image: promoteInformationTeamImage,
      description: "Mobilisation d'une équipe complète pour informer, accueillir et accompagner les visiteurs sur un grand salon.",
      location: 'Yaoundé, Cameroun',
      guests: '10,000+',
    },
    {
      id: 6,
      title: 'Activation de marque terrain',
      category: 'corporate',
      image: brandTeamImage,
      description: "Équipe mixte coordonnée pour représenter la marque, soutenir l'accueil et créer une présence professionnelle forte.",
      location: 'Douala, Cameroun',
      guests: '300',
    },
  ];

  const filters = [
    { key: 'all', label: language === 'fr' ? 'Tous' : 'All' },
    { key: 'corporate', label: 'Corporate' },
    { key: 'wedding', label: 'Weddings' },
    { key: 'vip', label: 'Signature & VIP' },
    { key: 'fair', label: 'Trade Shows' },
  ];

  const filteredItems = activeFilter === 'all'
    ? portfolioItems
    : portfolioItems.filter((item) => item.category === activeFilter);

  return (
    <Layout>
      <Seo title={language === 'fr' ? "Réalisations — Selected Work | CHANY EVENT'S" : "Selected Work | CHANY EVENT'S"} description={language === 'fr' ? 'Salons, événements corporate, institutionnels et mariages réalisés par CHANY EVENT\'S, dont In Vino Italia Douala.' : 'Trade shows, corporate, institutional events and weddings delivered by CHANY EVENT\'S, including In Vino Italia Douala.'} />
      {/* Hero Section */}
      <section className="pt-40 md:pt-44 pb-20 bg-gradient-to-b from-charcoal to-background">
        <div className="container-luxury px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <span className="text-primary text-sm font-semibold tracking-[0.2em] uppercase mb-6 block">
              {t('portfolio.subtitle')}
            </span>
            <h1 className="text-display font-serif font-semibold text-foreground mb-8">
              {t('portfolio.title')}
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              {language === 'fr'
                ? "Découvrez une sélection de nos réalisations les plus marquantes. Chaque projet témoigne de notre engagement envers l'excellence."
                : 'Discover a selection of our most notable projects. Each one reflects our commitment to excellence.'}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Featured Event — In Vino Italia Douala */}
      <section className="section-padding bg-charcoal border-b border-border relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0 bg-gradient-gold" />
        </div>
        <div className="container-luxury relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative mx-auto w-full max-w-md"
            >
              <div className="rounded-sm overflow-hidden border border-primary/30 shadow-2xl">
                <img
                  src={invinoPosterAsset.url}
                  alt="In Vino Italia Douala — 1er salon du vin italien au Cameroun"
                  className="w-full h-auto object-cover"
                />
              </div>
              <div className="absolute -top-4 -right-4 bg-primary px-5 py-3 rounded-sm shadow-lg">
                <p className="text-primary-foreground text-sm font-semibold tracking-wider uppercase">
                  {language === 'fr' ? 'Événement à la une' : 'Featured event'}
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="text-primary text-sm font-semibold tracking-[0.2em] uppercase mb-4 block">
                {language === 'fr' ? 'Notre prochaine grande production' : 'Our next major production'}
              </span>
              <h2 className="text-section font-serif font-semibold text-foreground mb-6">
                In Vino Italia Douala
                <span className="block text-gradient-gold text-2xl md:text-3xl mt-3">
                  {language === 'fr'
                    ? '1er salon du vin italien au Cameroun'
                    : 'The first Italian wine fair in Cameroon'}
                </span>
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                {language === 'fr'
                  ? "In Vino Italia Douala est le tout premier salon des vins italiens en Afrique Centrale : trois journées d'exception pour vivre l'Italie à Douala, entre dégustations de vins d'exception, gastronomie italienne, masterclasses, show-cooking, rencontres privilégiées et business club B2B, dans le cadre prestigieux du Best Western Plus Soaho Hotel."
                  : "In Vino Italia Douala is the very first Italian wine fair in Central Africa: three exceptional days to experience Italy in Douala, with tastings of outstanding wines, Italian gastronomy, masterclasses, show-cooking, exclusive encounters and a B2B business club, in the prestigious setting of the Best Western Plus Soaho Hotel."}
              </p>

              <div className="mb-6">
                <h3 className="text-foreground font-serif text-xl font-semibold mb-4">
                  {language === 'fr' ? "Le rôle de CHANY EVENT'S" : "CHANY EVENT'S' role"}
                </h3>
                <ul className="space-y-2 text-muted-foreground">
                  {(language === 'fr'
                    ? [
                        "Coordination générale et organisation complète du salon",
                        "Recrutement et encadrement des hôtesses et stewards d'accueil",
                        "Accueil, orientation et gestion des flux de visiteurs",
                        "Logistique, tenue des stands et accompagnement des exposants",
                      ]
                    : [
                        "General coordination and complete organization of the fair",
                        "Recruitment and management of welcome hostesses and stewards",
                        "Guest welcome, guidance and visitor flow management",
                        "Logistics, stand management and exhibitor support",
                      ]
                  ).map((role) => (
                    <li key={role} className="flex items-start gap-3">
                      <span className="mt-2 h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
                      <span>{role}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <div className="flex items-center gap-3 text-foreground">
                  <CalendarDays className="w-5 h-5 text-primary" />
                  <span className="font-medium">
                    26 – 28 {language === 'fr' ? 'novembre' : 'November'} 2026
                  </span>
                </div>
                <div className="flex items-center gap-3 text-foreground">
                  <MapPin className="w-5 h-5 text-primary" />
                  <span className="font-medium">Best Western Plus Soaho Hotel, Douala</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/in-vino-italia-douala-2026">
                  <Button
                    size="lg"
                    className="bg-gradient-gold text-primary-foreground hover-gold-glow"
                  >
                    {language === 'fr' ? 'Découvrir le salon' : 'Discover the fair'}
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </Link>
                <Link to="/careers">
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-primary text-primary hover:bg-primary/10"
                  >
                    {language === 'fr' ? 'Rejoindre l’équipe du salon' : 'Join the event team'}
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Filter */}
      <section className="py-8 border-b border-border">
        <div className="container-luxury px-6">
          <div className="flex flex-wrap justify-center gap-4">
            {filters.map((filter) => (
              <button
                key={filter.key}
                onClick={() => setActiveFilter(filter.key)}
                className={`px-6 py-2 text-sm font-medium tracking-wide uppercase transition-all duration-300 ${
                  activeFilter === filter.key
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:text-primary'
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="section-padding">
        <div className="container-luxury">
          <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence mode="popLayout">
              {filteredItems.map((item, index) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  onClick={() => setSelectedItem(item)}
                  className={`group relative ${index % 4 === 0 ? "aspect-[4/5] md:aspect-[4/6]" : index % 4 === 3 ? "aspect-[4/3]" : "aspect-[4/5]"} overflow-hidden rounded-md cursor-pointer`}
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/20 to-transparent opacity-90 transition-opacity duration-300" />
                  <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    <span className="text-champagne text-xs font-semibold tracking-[0.2em] uppercase block mb-2">
                      {filters.find((f) => f.key === item.category)?.label}
                    </span>
                    <h3 className="font-serif text-2xl text-cream font-medium">{item.title}</h3>
                    <p className="text-cream/85 text-sm mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      {item.location}
                    </p>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* Modal */}
      <AnimatePresence>
        {selectedItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-background/95"
            onClick={() => setSelectedItem(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative max-w-4xl w-full bg-card border border-border rounded-sm overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedItem(null)} aria-label="Fermer"
                className="absolute top-4 right-4 z-10 w-10 h-10 bg-background/80 rounded-full flex items-center justify-center text-foreground hover:text-primary transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="grid grid-cols-1 md:grid-cols-2">
                <div className="aspect-square">
                  <img
                    src={selectedItem.image}
                    alt={selectedItem.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-8 md:p-12 flex flex-col justify-center">
                  <span className="text-primary text-xs font-semibold tracking-wider uppercase mb-4">
                    {filters.find((f) => f.key === selectedItem.category)?.label}
                  </span>
                  <h2 className="text-section font-serif font-semibold text-foreground mb-4">
                    {selectedItem.title}
                  </h2>
                  <p className="text-muted-foreground leading-relaxed mb-6">
                    {selectedItem.description}
                  </p>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <span className="text-xs text-muted-foreground uppercase tracking-wider">Lieu</span>
                      <p className="text-foreground font-medium">{selectedItem.location}</p>
                    </div>
                    <div>
                      <span className="text-xs text-muted-foreground uppercase tracking-wider">Invités</span>
                      <p className="text-foreground font-medium">{selectedItem.guests}</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </Layout>
  );
};

export default Portfolio;
