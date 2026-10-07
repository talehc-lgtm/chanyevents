import React from 'react';
import Layout from '@/components/layout/Layout';
import { useL, Seo, PageHero, Reveal, Chips, CtaBand } from '@/components/common/Blocks';
import tradeshow from '@/assets/biz-tradeshow.jpg';

const Services: React.FC = () => {
  const L = useL();
  const poles = [
    { t: 'Strategy & Planning', d: L('Conseil, concept et pilotage', 'Advice, concept and steering'), i: [L('Conseil événementiel', 'Event consulting'), L('Direction de projet', 'Project management'), 'Budget', 'Planning', L('Programme', 'Programme')] },
    { t: 'Event Production', d: L('Scène, décor et technique', 'Stage, decor and technology'), i: [L('Scénographie', 'Scenography'), L('Décoration', 'Decoration'), L('Production technique', 'Technical production'), L('Son', 'Sound'), L('Lumière', 'Lighting'), 'LED', 'Stands', L('Signalétique', 'Signage')] },
    { t: 'Event Logistics', d: L('Tout ce qui fait tourner l’événement', 'Everything that keeps it running'), i: ['Catering', 'Transport', L('Hébergement', 'Accommodation'), L('Sécurité', 'Security'), L('Coordination terrain', 'On-site coordination'), L('Régie', 'Stage management')] },
    { t: 'Event Technology', d: L('Inscriptions et outils digitaux', 'Registration and digital tools'), i: [L('Accréditation', 'Accreditation'), L('Billetterie', 'Ticketing'), L('Invitations', 'Invitations'), 'Streaming', 'Business matching'] },
    { t: 'Guest & VIP Management', d: L('Accueil et protocole', 'Hospitality and protocol'), i: [L('Hôtesses', 'Hostesses'), 'Staff', L('Gestion VIP', 'VIP management'), L('Accueil aéroport', 'Airport welcome'), L('Protocole', 'Protocol')] },
    { t: 'Exhibitor Management', d: L('Exposants et stands', 'Exhibitors and stands'), i: [L('Recrutement exposants', 'Exhibitor recruitment'), L('Coordination exposants', 'Exhibitor coordination'), 'Stands', L('Douanes', 'Customs')] },
    { t: 'Sponsorship', d: L('Partenaires et financement', 'Partners and funding'), i: ['Sponsors', L('Partenaires', 'Partners'), L('Offres de visibilité', 'Visibility packages'), L('Bilan partenaires', 'Partner reporting')] },
    { t: 'Communication', d: L('Faire rayonner l’événement', 'Amplifying the event'), i: [L('Relations médias', 'Media relations'), L('Communication digitale', 'Digital communication'), 'Photo', L('Vidéo', 'Video'), 'Speakers', 'Reporting'] },
    { t: 'Translation & Interpretation', d: L('Faire dialoguer les publics', 'Bridging audiences'), i: [L('Interprétation simultanée', 'Simultaneous interpretation'), L('Interprétation de liaison', 'Liaison interpretation'), L('Traduction de documents', 'Document translation'), L('Équipements de cabine', 'Booth equipment')] },
  ];
  return (
    <Layout>
      <Seo title={L("Services événementiels — de la stratégie à l'exécution | CHANY EVENT'S", "Event services — from strategy to execution | CHANY EVENT'S")}
        description={L('Conseil, production, logistique, technologie, accueil VIP, exposants, sponsoring, communication, traduction et interprétation.', 'Consulting, production, logistics, technology, VIP management, exhibitors, sponsorship, communication, translation and interpretation.')} />
      <PageHero eyebrow={L('Nos services', 'Our services')}
        title={<>{L('Confiez-nous tout. Ou ', 'Trust us with everything. Or ')}<em>{L('la partie qui vous manque', 'the part you are missing')}</em></>}
        lead={L('Neuf pôles de compétences mobilisables ensemble ou séparément, selon votre besoin.', 'Nine areas of expertise you can engage together or separately, as you need.')}
        image={tradeshow} alt="Event production" />
      <section className="section-padding">
        <div className="container-luxury grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-border border border-border rounded-sm overflow-hidden">
          {poles.map((p, n) => (
            <Reveal key={p.t} delay={(n % 3) * 0.08} className="bg-card p-8 h-full">
              <span className="text-xs font-semibold tracking-widest text-primary">{String(n + 1).padStart(2, '0')}</span>
              <h2 className="font-serif text-2xl text-foreground mt-3 mb-1">{p.t}</h2>
              <p className="text-muted-foreground mb-6">{p.d}</p>
              <Chips items={p.i} />
            </Reveal>
          ))}
        </div>
      </section>
      <CtaBand title={L('Vous avez un projet ?', 'Have a project?')} text={L('Dites-nous de quoi vous avez besoin.', 'Tell us what you need.')}
        button={L('Démarrer un projet', 'Start a project')} to="/contact#projet" />
    </Layout>
  );
};
export default Services;
