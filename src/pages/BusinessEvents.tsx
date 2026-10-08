import React from 'react';
import Layout from '@/components/layout/Layout';
import { useL, Seo, PageHero, Feature, CtaBand, Reveal } from '@/components/common/Blocks';
import conference from '@/assets/biz-conference.jpg';
import tradeshow from '@/assets/biz-tradeshow.jpg';
import b2b from '@/assets/biz-b2b.jpg';
import delegation from '@/assets/biz-delegation.jpg';
import exness from '@/assets/chany-exness-consultation.jpg';

const BusinessEvents: React.FC = () => {
  const L = useL();
  const matchingSteps = [
    L('Identification des profils', 'Profile identification'), L('Qualification', 'Qualification'), L('Analyse des besoins', 'Needs analysis'),
    L('Matching', 'Matching'), L('Agenda personnalisé', 'Personalised agenda'), L('Accueil', 'Welcome'),
    L('Gestion des rendez-vous', 'Meeting management'), L('Suivi', 'Follow-up'), L('Rapports', 'Reporting'),
  ];
  return (
    <Layout>
      <Seo
        title={L("Événements d’affaires en Afrique — Salons, conférences, B2B | CHANY EVENT'S", "Business Events in Africa — Trade shows, conferences, B2B | CHANY EVENT'S")}
        description={L("Organisation de foires, salons professionnels, conférences, business matching, missions économiques et roadshows au Cameroun et en Afrique.", "Trade show, conference, B2B business matching, trade mission and roadshow organizer in Cameroon and across Africa.")}
      />
      <PageHero
        eyebrow={L('Événements d’affaires', 'Business Events')}
        title={<>{L('Des événements qui créent des ', 'Events that create ')}<em>{L('opportunités', 'opportunities')}</em></>}
        lead={L("Un événement professionnel ne doit pas seulement réunir du monde. Il doit produire des connexions, des leads, des contrats, des partenariats et de l'influence.", "A business event should not just gather people. It must generate connections, leads, contracts, partnerships and influence.")}
        image={tradeshow}
        alt={L('Salon professionnel', 'Trade show')}
      />

      <section className="py-16 border-y border-border bg-charcoal">
        <Reveal className="container-luxury px-6 text-center max-w-4xl">
          <p className="font-serif text-2xl md:text-3xl text-foreground leading-snug">
            {L("« Nous ne mesurons pas seulement le succès d'un événement au nombre de participants, mais aux rencontres, aux opportunités et aux résultats qu'il génère. »", "“We don't measure an event's success by attendance alone, but by the meetings, opportunities and results it generates.”")}
          </p>
        </Reveal>
      </section>

      <Feature id="salons" index="01" title={L('Foires & Salons professionnels', 'Trade fairs & exhibitions')}
        text={L("Conception, commercialisation et production de salons sectoriels et de foires internationales, de l'appel aux exposants jusqu'au bilan.", 'Design, sales and production of sector trade shows and international fairs, from exhibitor recruitment to post-show report.')}
        items={[L('Foires internationales', 'International fairs'), L('Salons sectoriels', 'Sector shows'), L('Salons commerciaux', 'Trade shows'), L('Expositions professionnelles', 'Professional exhibitions'), L('Salons B2B', 'B2B shows'), L('Marketplaces professionnelles', 'Professional marketplaces'), 'ConfEx', L('Pavillons pays', 'Country pavilions')]}
        image={tradeshow} />
      <Feature id="conferences" index="02" tone reverse title={L('Conférences & Sommets', 'Conferences & Summits')}
        text={L('Forums économiques, congrès et grands rendez-vous : programme, speakers, scène, accréditations et expérience participants.', 'Economic forums, congresses and major gatherings: agenda, speakers, stage, accreditation and attendee experience.')}
        items={[L('Forums économiques', 'Economic forums'), L('Sommets', 'Summits'), L('Congrès', 'Congresses'), 'Symposiums', L('Colloques', 'Colloquia'), 'Panels', 'Conventions', L('Assises', 'Assemblies')]}
        image={conference} />

      <section id="b2b" className="section-padding scroll-mt-24">
        <div className="container-luxury">
          <Reveal className="grid lg:grid-cols-12 gap-10 mb-14">
            <div className="lg:col-span-5">
              <span className="font-serif text-5xl text-primary/30 block mb-2">03</span>
              <h2 className="text-section font-serif text-foreground">B2B & <em>Business Matching</em></h2>
            </div>
            <p className="lg:col-span-7 text-lg text-muted-foreground self-end">
              {L("Notre expertise différenciante : identifier, qualifier et connecter les bons interlocuteurs pour que chaque rendez-vous compte. Hosted Buyer Programmes, rencontres acheteurs-fournisseurs, investisseurs et distributeurs.", 'Our signature expertise: identifying, qualifying and connecting the right people so every meeting counts. Hosted Buyer Programmes, buyer-supplier, investor and dealer meetings.')}
            </p>
          </Reveal>
          <div className="grid sm:grid-cols-3 lg:grid-cols-9 gap-px bg-border border border-border rounded-sm overflow-hidden mb-14">
            {matchingSteps.map((s, i) => (
              <Reveal key={s} delay={i * 0.05} className="bg-card p-5 h-full">
                <span className="text-xs font-semibold text-primary tracking-widest">{String(i + 1).padStart(2, '0')}</span>
                <p className="mt-3 text-sm font-semibold text-foreground">{s}</p>
              </Reveal>
            ))}
          </div>
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <img src={b2b} alt={L('Rencontres d’affaires', 'Business matching')} loading="lazy" className="w-full aspect-[5/4] object-cover rounded-sm" />
            <ul className="space-y-4">
              {['Hosted Buyer Programmes', 'Buyer Meetings', 'Supplier Meetings', 'Investor Meetings', 'Dealer Meetings', 'Speed meetings', 'Supplier Days'].map((x) => (
                <li key={x} className="flex items-center gap-4 border-b border-border pb-4 font-serif text-2xl text-foreground">
                  <span className="h-px w-8 bg-primary" />{x}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <Feature id="missions" index="04" tone title={L('Missions économiques', 'Economic & Trade Missions')}
        text={L("Partenaire local d'entreprises européennes, asiatiques, américaines ou africaines souhaitant prospecter un marché : nous préparons, accompagnons et suivons chaque mission.", 'Local partner for European, Asian, American or African companies exploring a market: we prepare, accompany and follow up every mission.')}
        items={[L('Identification des entreprises cibles', 'Target company identification'), L('Prise de rendez-vous', 'Appointment setting'), L('Rendez-vous B2B', 'B2B meetings'), L('Organisation des délégations', 'Delegation organisation'), 'Transport', L('Hébergement', 'Accommodation'), 'Visa', L('Interprétation', 'Interpretation'), L("Visites d'entreprises", 'Company visits'), L('Rencontres institutionnelles', 'Institutional meetings'), 'Networking', L('Suivi post-mission', 'Post-mission follow-up')]}
        image={delegation} />
      <Feature id="roadshows" index="05" reverse title="Roadshows"
        text={L('Déployer un même événement dans plusieurs villes ou pays, avec la même exigence et une coordination unique.', 'Rolling out the same event across several cities or countries, with one standard and one coordination team.')}
        items={[L('Promotion de marque', 'Brand promotion'), 'Investment Roadshow', 'Commercial Roadshow', 'Market Entry Roadshow', L('Promotion pays', 'Country promotion'), L('Lancement produit', 'Product launch'), L('Rencontres distributeurs', 'Distributor meetings')]}
        image={exness} />
      <Feature id="pavillons" index="06" tone title={L('Pavillons nationaux & participation aux salons', 'National pavilions & trade show participation')}
        text={L("Une participation à un salon est une opération commerciale complète : nous la pilotons de la conception du stand jusqu'aux rendez-vous B2B.", 'Exhibiting is a full commercial operation: we run it from stand design to B2B meetings.')}
        items={[L('Conception', 'Design'), 'Construction', 'Stands', L('Habillage de marque', 'Branding'), L('Mobilier', 'Furniture'), L('Audiovisuel', 'Audiovisual'), L('Coordination des exposants', 'Exhibitor coordination'), 'Transport', L('Douanes', 'Customs'), L('Personnel', 'Staff')', 'Hospitality', 'Communication', 'B2B', 'Side events']} />
      <Feature id="investment" index="07" title="Investment Events"
        text={L("Rencontres investisseurs, forums d'investissement et présentations de projets, dans un cadre confidentiel et maîtrisé.", 'Investor meetings, investment forums and project pitches, in a confidential and controlled setting.')}
        items={[L('Rencontres investisseurs', 'Investor meetings'), L("Forums d'investissement", 'Investment forums'), 'Deal rooms', L('Présentations de projets', 'Project pitches'), 'Executive networking']} />

      <CtaBand title={L('Confiez-nous tout. Ou simplement la partie qui vous manque.', 'Trust us with everything. Or just the part you are missing.')}
        text={L('Parlez-nous de votre salon, de votre conférence ou de votre mission.', 'Tell us about your trade show, conference or mission.')}
        button={L('Démarrer un projet', 'Start a project')} to="/contact#projet" />
    </Layout>
  );
};
export default BusinessEvents;
