import React from 'react';
import Layout from '@/components/layout/Layout';
import { useLanguage } from '@/contexts/LanguageContext';
import { useL, Seo, PageHero, Reveal, CtaBand } from '@/components/common/Blocks';
import team from '@/assets/chany-promote-2017-team.jpg';
import conference from '@/assets/biz-conference.jpg';

const About: React.FC = () => {
  const { t } = useLanguage();
  const L = useL();
  const values = [
    ['Excellence', L('Le standard le plus élevé, à chaque étape.', 'The highest standard, at every step.')],
    [L('Rigueur', 'Rigour'), L('Méthode, planning et contrôle.', 'Method, planning and control.')],
    [L('Créativité', 'Creativity'), L('Des concepts qui marquent.', 'Concepts that stand out.')],
    [L('Élégance', 'Elegance'), L('Le premium par la justesse.', 'Premium through precision.')],
    [L('Engagement', 'Commitment'), L('Votre réussite est la nôtre.', 'Your success is ours.')],
    [L('Humain', 'Human'), L('Des relations de confiance.', 'Relationships built on trust.')],
    [L('Sens du détail', 'Attention to detail'), L('Rien n’est laissé au hasard.', 'Nothing is left to chance.')],
    [L('Fiabilité', 'Reliability'), L('Ce qui est promis est livré.', 'What is promised is delivered.')],
  ];
  return (
    <Layout>
      <Seo title={L("L'Agence — CHANY EVENT'S, partenaire événementiel en Afrique", "The Agency — CHANY EVENT'S, event partner in Africa")}
        description={L("Née d'Ebene Chany Agency et fondée par Mario Chany Nguetmi, CHANY EVENT'S devient une agence panafricaine de Business, Corporate et Institutional Events.", "Born from Ebene Chany Agency and founded by Mario Chany Nguetmi, CHANY EVENT'S is becoming a pan-African Business, Corporate and Institutional events agency.")} />
      <PageHero eyebrow={t('about.subtitle')} title={t('about.title')} lead={t('about.description')} image={team} alt="CHANY EVENT'S team" />
      <section className="section-padding bg-charcoal">
        <div className="container-luxury grid lg:grid-cols-12 gap-12 items-center">
          <Reveal className="lg:col-span-6">
            <span className="eyebrow mb-6">{L('Une nouvelle phase', 'A new chapter')}</span>
            <h2 className="text-section font-serif text-foreground my-6">{L("De l'agence premium vers une agence ", 'From premium agency to a ')}<em>{L('panafricaine', 'pan-African')}</em>{L(' des événements d’affaires', ' Business Events agency')}</h2>
            <p className="text-muted-foreground text-lg mb-4">{L("Après plus de 15 ans d'expérience dans l'organisation de mariages, de réceptions VIP et d'événements corporate, CHANY EVENT'S étend naturellement son expertise aux événements économiques, institutionnels et B2B.", "After 15+ years organising weddings, VIP receptions and corporate events, CHANY EVENT'S is naturally extending its expertise to economic, institutional and B2B events.")}</p>
            <p className="text-muted-foreground text-lg">{L("Notre héritage — l'exigence du détail, l'élégance et le sens de l'accueil — est aujourd'hui au service des salons, conférences, missions économiques et délégations, en Afrique centrale, de l'Ouest et de l'Est.", 'Our heritage — attention to detail, elegance and hospitality — now serves trade shows, conferences, trade missions and delegations across Central, West and East Africa.')}</p>
            <p className="text-foreground mt-6 font-semibold">{t('about.vision.title')}</p>
            <p className="text-muted-foreground">{t('about.vision.text')}</p>
          </Reveal>
          <Reveal delay={0.1} className="lg:col-span-6"><img src={conference} alt="" loading="lazy" className="w-full aspect-[4/3] object-cover rounded-sm" /></Reveal>
        </div>
      </section>
      <section className="section-padding">
        <div className="container-luxury">
          <Reveal><h2 className="text-section font-serif text-foreground mb-12">{L('Nos valeurs', 'Our values')}</h2></Reveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 border-t border-border">
            {values.map(([v, d], i) => (
              <Reveal key={v} delay={(i % 4) * 0.06} className="border-b border-border sm:border-r p-6 lg:p-8 group">
                <span className="text-xs text-primary font-semibold tracking-widest">{String(i + 1).padStart(2, '0')}</span>
                <h3 className="font-serif text-3xl text-foreground mt-4 mb-2 group-hover:text-primary transition-colors">{v}</h3>
                <p className="text-muted-foreground text-sm">{d}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      <CtaBand title={L('Travaillons ensemble', "Let's work together")} text={L('De la réflexion à l’exécution.', 'From strategy to execution.')} button={L('Démarrer un projet', 'Start a project')} to="/contact#projet" />
    </Layout>
  );
};
export default About;
