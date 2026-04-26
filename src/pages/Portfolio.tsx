import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import Layout from '@/components/layout/Layout';
import SectionHeading from '@/components/common/SectionHeading';
import traditionalHostessesImage from '@/assets/chany-hostesses-traditional.jpg';
import promoteTeamImage from '@/assets/chany-promote-team.jpg';
import exnessHostessesImage from '@/assets/chany-exness-hostesses.jpg';
import maleHostsImage from '@/assets/chany-male-hosts.jpg';
import weddingHostessesImage from '@/assets/chany-wedding-hostesses.jpg';
import vipReceptionImage from '@/assets/chany-vip-reception.jpg';

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
      title: 'Accueil protocolaire premium',
      category: 'corporate',
      image: traditionalHostessesImage,
      description: "Équipe d'hôtesses formées pour un accueil élégant, coordonné et parfaitement aligné avec l'image de marque de l'événement.",
      location: 'Douala, Cameroun',
      guests: '500+',
    },
    {
      id: 2,
      title: 'Cérémonie privée élégante',
      category: 'wedding',
      image: weddingHostessesImage,
      description: "Présence raffinée et service d'accueil discret pour une réception privée organisée avec soin et sens du protocole.",
      location: 'Bafoussam, Cameroun',
      guests: '350',
    },
    {
      id: 3,
      title: 'Activation PROMOTE',
      category: 'corporate',
      image: promoteTeamImage,
      description: "Déploiement d'une équipe terrain dynamique pour accompagner l'animation de stand et l'expérience visiteur.",
      location: 'Yaoundé, Cameroun',
      guests: '200',
    },
    {
      id: 4,
      title: 'Réception VIP',
      category: 'vip',
      image: vipReceptionImage,
      description: "Gestion d'accueil et d'orientation pour une cérémonie officielle avec exigence de ponctualité, tenue et discrétion.",
      location: 'Yaoundé, Cameroun',
      guests: '150',
    },
    {
      id: 5,
      title: 'Stand Exness',
      category: 'fair',
      image: exnessHostessesImage,
      description: "Hôtesses de marque mobilisées pour renforcer la visibilité du stand et fluidifier les interactions avec les visiteurs.",
      location: 'Yaoundé, Cameroun',
      guests: '10,000+',
    },
    {
      id: 6,
      title: 'Équipe de stewards',
      category: 'corporate',
      image: maleHostsImage,
      description: "Stewards professionnels en tenue coordonnée pour soutenir l'accueil, l'orientation et le protocole événementiel.",
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
