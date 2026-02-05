import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import Layout from '@/components/layout/Layout';
import SectionHeading from '@/components/common/SectionHeading';
import heroImage from '@/assets/hero-event.jpg';
import weddingImage from '@/assets/wedding-event.jpg';
import corporateImage from '@/assets/corporate-event.jpg';
import vipImage from '@/assets/vip-event.jpg';
import fairImage from '@/assets/fair-event.jpg';
import staffImage from '@/assets/staff-event.jpg';

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
  const { t } = useLanguage();
  const [selectedItem, setSelectedItem] = useState<PortfolioItem | null>(null);
  const [activeFilter, setActiveFilter] = useState('all');

  const portfolioItems: PortfolioItem[] = [
    {
      id: 1,
      title: 'Gala Annuel MTN',
      category: 'corporate',
      image: heroImage,
      description: "Soirée de gala prestigieuse pour 500 invités avec décoration noir et or, animation live et restauration haut de gamme.",
      location: 'Douala, Cameroun',
      guests: '500+',
    },
    {
      id: 2,
      title: 'Mariage Traditionnel Bamiléké',
      category: 'wedding',
      image: weddingImage,
      description: "Célébration traditionnelle sublimée par une décoration moderne et élégante, alliant traditions et raffinement.",
      location: 'Bafoussam, Cameroun',
      guests: '350',
    },
    {
      id: 3,
      title: 'Conférence Internationale',
      category: 'corporate',
      image: corporateImage,
      description: "Organisation complète d'une conférence avec traduction simultanée, logistique et accueil VIP.",
      location: 'Yaoundé, Cameroun',
      guests: '200',
    },
    {
      id: 4,
      title: 'Soirée Privée Ambassade',
      category: 'vip',
      image: vipImage,
      description: "Réception diplomatique exclusive avec protocole strict, service discret et excellence culinaire.",
      location: 'Yaoundé, Cameroun',
      guests: '150',
    },
    {
      id: 5,
      title: 'PROMOTE 2023',
      category: 'fair',
      image: fairImage,
      description: "Conception et animation de stands pour le plus grand salon économique d'Afrique Centrale.",
      location: 'Yaoundé, Cameroun',
      guests: '10,000+',
    },
    {
      id: 6,
      title: 'Lancement Orange Money',
      category: 'corporate',
      image: staffImage,
      description: "Événement de lancement produit avec activation de marque, hôtesses et couverture médiatique.",
      location: 'Douala, Cameroun',
      guests: '300',
    },
  ];

  const filters = [
    { key: 'all', label: 'Tous' },
    { key: 'corporate', label: 'Corporate' },
    { key: 'wedding', label: 'Mariages' },
    { key: 'vip', label: 'VIP' },
    { key: 'fair', label: 'Salons' },
  ];

  const filteredItems = activeFilter === 'all'
    ? portfolioItems
    : portfolioItems.filter((item) => item.category === activeFilter);

  return (
    <Layout>
      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-gradient-to-b from-charcoal to-background">
        <div className="container-luxury px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <span className="text-primary text-sm font-semibold tracking-[0.3em] uppercase mb-6 block">
              {t('portfolio.subtitle')}
            </span>
            <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl font-semibold text-foreground mb-8">
              {t('portfolio.title')}
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Découvrez une sélection de nos réalisations les plus marquantes. 
              Chaque projet témoigne de notre engagement envers l'excellence.
            </p>
          </motion.div>
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
              {filteredItems.map((item) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  onClick={() => setSelectedItem(item)}
                  className="group relative aspect-[4/5] overflow-hidden rounded-sm cursor-pointer"
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent opacity-60 group-hover:opacity-90 transition-opacity duration-300" />
                  <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    <span className="text-primary text-xs font-semibold tracking-wider uppercase block mb-2">
                      {filters.find((f) => f.key === item.category)?.label}
                    </span>
                    <h3 className="font-serif text-xl text-foreground font-semibold">{item.title}</h3>
                    <p className="text-muted-foreground text-sm mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
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
                onClick={() => setSelectedItem(null)}
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
                  <h2 className="font-serif text-3xl font-semibold text-foreground mb-4">
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
