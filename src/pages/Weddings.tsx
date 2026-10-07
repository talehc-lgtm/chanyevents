import React from 'react';
import Layout from '@/components/layout/Layout';
import { useL, Seo, PageHero, Reveal, Chips, CtaBand } from '@/components/common/Blocks';
import arch from '@/assets/chany-wedding-arch-couple.png';
import aisle from '@/assets/chany-wedding-aisle.jpg';
import couple from '@/assets/chany-luxury-wedding-couple.png';
import fireworks from '@/assets/chany-wedding-fireworks.png';
import table from '@/assets/chany-table-decor.jpg';

const Weddings: React.FC = () => {
  const L = useL();
  return (
    <Layout>
      <Seo title={L("Mariages & Signature Events au Cameroun | CHANY EVENT'S", "Weddings & Signature Events in Cameroon | CHANY EVENT'S")}
        description={L('Mariages, fiançailles, réceptions privées et destination weddings, organisés avec élégance par CHANY EVENT’S.', 'Weddings, engagements, private receptions and destination weddings, elegantly organised by CHANY EVENT’S.')} />
      <PageHero eyebrow="Weddings & Signature Events"
        title={<>{L('Vos moments personnels méritent la ', 'Your personal moments deserve the ')}<em>{L('même exigence', 'same standard')}</em></>}
        lead={L("Notre héritage : des célébrations raffinées, profondément humaines, orchestrées avec élégance et précision jusque dans le moindre détail.", 'Our heritage: refined, deeply human celebrations, orchestrated with elegance and precision down to the smallest detail.')}
        image={arch} alt={L('Mariage de prestige', 'Prestige wedding')} />
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
      <CtaBand title={L('Racontez-nous votre histoire', 'Tell us your story')} text={L('Nous imaginerons ensemble une célébration à votre image.', 'Together we will design a celebration that reflects you.')}
        button={L('Démarrer un projet', 'Start a project')} to="/contact#projet" />
    </Layout>
  );
};
export default Weddings;
