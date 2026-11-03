import React from 'react';
import Layout from '@/components/layout/Layout';
import { Seo } from '@/components/common/Blocks';
import { useLanguage } from '@/contexts/LanguageContext';
import { hostesses } from '@/data/hostesses';

const Hostesses: React.FC = () => {
  const { language } = useLanguage();
  const fr = language === 'fr';
  return (
    <Layout>
      <Seo
        title={fr ? "Nos hôtesses | CHANY EVENT'S" : "Our hostesses | CHANY EVENT'S"}
        description={fr ? "Le répertoire des hôtesses et stewards retenus par CHANY EVENT'S pour In Vino Italia Douala 2026." : "The hostesses and stewards selected by CHANY EVENT'S for In Vino Italia Douala 2026."}
      />
      <section className="pt-36 pb-24 container-luxury px-6">
        <span className="eyebrow">In Vino Italia Douala 2026</span>
        <h1 className="text-section font-serif text-foreground mt-3">{fr ? 'Nos hôtesses' : 'Our hostesses'}</h1>
        <p className="text-muted-foreground mt-3 max-w-2xl">
          {fr ? `${hostesses.length} hôtesses et stewards retenus à l'issue du casting.` : `${hostesses.length} hostesses and stewards selected after the casting.`}
        </p>
        <div className="mt-12 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
          {hostesses.map((h) => (
            <figure key={h.name} className="group">
              <div className="aspect-[3/4] overflow-hidden rounded-sm bg-muted">
                {h.photo ? (
                  <img src={h.photo} alt={h.name} loading="lazy" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                ) : (
                  <div className="h-full w-full flex items-center justify-center font-serif text-4xl text-muted-foreground">
                    {h.name.split(' ').map((w) => w[0]).slice(0, 2).join('')}
                  </div>
                )}
              </div>
              <figcaption className="mt-3">
                <p className="font-serif text-lg text-foreground leading-tight">{h.name}</p>
                <p className="text-sm text-muted-foreground">{fr ? h.position : h.position.startsWith('Hôtesse /') ? 'Hostess / Steward' : 'Event hostess'}</p>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>
    </Layout>
  );
};

export default Hostesses;
