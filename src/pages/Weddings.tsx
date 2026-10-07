import React from 'react';
import Layout from '@/components/layout/Layout';
import { useL, Seo, PageHero, Reveal, Chips, CtaBand } from '@/components/common/Blocks';
import arch from '@/assets/chany-wedding-arch-couple.png';
import aisle from '@/assets/chany-wedding-aisle.jpg';
import couple from '@/assets/chany-luxury-wedding-couple.png';
import fireworks from '@/assets/chany-wedding-fireworks.png';
import table from '@/assets/chany-table-decor.jpg';
import w1 from '@/assets/wedding-1.jpg.asset.json';
import w2 from '@/assets/wedding-2.jpg.asset.json';
import w3 from '@/assets/wedding-3.jpg.asset.json';
import w4 from '@/assets/wedding-4.jpg.asset.json';
import w5 from '@/assets/wedding-5.jpg.asset.json';
import w6 from '@/assets/wedding-6.jpg.asset.json';
import w7 from '@/assets/wedding-7.jpg.asset.json';
import w8 from '@/assets/wedding-8.jpg.asset.json';
import w9 from '@/assets/wedding-9.jpg.asset.json';
import w10 from '@/assets/wedding-10.jpg.asset.json';
const gallery = [w8, w2, w4, w6, w10, w7, w9, w1, w5];

const Weddings: React.FC = () => {
  const L = useL();
  return (
    <Layout>
      <Seo title={L("Mariages & Signature Events au Cameroun | CHANY EVENT'S", "Weddings & Signature Events in Cameroon | CHANY EVENT'S")}
        description={L('Mariages, fiançailles, réceptions privées et destination weddings, organisés avec élégance par CHANY EVENT’S.', 'Weddings, engagements, private receptions and destination weddings, elegantly organised by CHANY EVENT’S.')} />
      <PageHero eyebrow="Weddings & Signature Events"
        title={<>{L('Vos moments personnels méritent la ', 'Your personal moments deserve the ')}<em>{L('même exigence', 'same standard')}</em></>}
        lead={L("Notre héritage : des célébrations raffinées, profondément humaines, orchestrées avec élégance et précision jusque dans le moindre détail.", 'Our heritage: refined, deeply human celebrations, orchestrated with elegance and precision down to the smallest detail.')}
        image={w3.url} alt={L('Mariage de prestige', 'Prestige wedding')} />
      <section className="section-padding">
        <div className="container-luxury grid md:grid-cols-12 gap-6">
          <Reveal className="md:col-span-7"><img src={aisle} alt="" loading="lazy" className="w-full aspect-[4/3] object-cover rounded-sm" /></Reveal>
          <Reveal delay={0.1} className="md:col-span-5 flex flex-col justify-center">
            <h2 className="text-section font-serif text-foreground mb-6">{L('Nos célébrations', 'Our celebrations')}</h2>
            <Chips items={[L('Mariages', 'Weddings'), L('Fiançailles', 'Engagements'), L('Anniversaires', 'Birthdays'), L('Réceptions privées', 'Private receptions'), L('Dîners', 'Dinners'), 'Destination Weddings', L('Cérémonies premium', 'Premium ceremonies')]} />
          </Reveal>
          <Reveal className="md:col-span-4"><img src={couple} alt="" loading="lazy" className="w-full aspect-[3/4] object-cover rounded-sm" /></Reveal>
          <Reveal delay={0.1} className="md:col-span-4"><img src={table} alt="" loading="lazy" className="w-full aspect-[3/4] object-cover rounded-sm" /></Reveal>
          <Reveal delay={0.2} className="md:col-span-4"><img src={fireworks} alt="" loading="lazy" className="w-full aspect-[3/4] object-cover rounded-sm" /></Reveal>
        </div>
      </section>
      <section className="section-padding bg-secondary/40">
        <div className="container-luxury">
          <Reveal><h2 className="text-section font-serif text-foreground mb-10">{L('Galerie', 'Gallery')}</h2></Reveal>
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-5 [&>*]:mb-5">
            {gallery.map((g, i) => (
              <Reveal key={i} delay={(i % 3) * 0.08} className="break-inside-avoid overflow-hidden rounded-sm group">
                <img src={g.url} alt={L('Mariage et réception CHANY EVENT\'S', 'CHANY EVENT\'S wedding and reception')} loading="lazy" className="w-full h-auto transition-transform duration-700 group-hover:scale-105" />
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      <CtaBand title={L('Racontez-nous votre histoire', 'Tell us your story')} text={L('Nous imaginerons ensemble une célébration à votre image.', 'Together we will design a celebration that reflects you.')}
        button={L('Démarrer un projet', 'Start a project')} to="/contact#projet" />
    </Layout>
  );
};
export default Weddings;
