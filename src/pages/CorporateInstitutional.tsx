import React from 'react';
import Layout from '@/components/layout/Layout';
import { useL, Seo, PageHero, Feature, CtaBand } from '@/components/common/Blocks';
import delegation from '@/assets/biz-delegation.jpg';
import conference from '@/assets/biz-conference.jpg';
import vip from '@/assets/vip-event.jpg';
import corporate from '@/assets/corporate-event.jpg';

const CorporateInstitutional: React.FC = () => {
  const L = useL();
  return (
    <Layout>
      <Seo
        title={L("Événements corporate & institutionnels au Cameroun et en Afrique | CHANY EVENT'S", "Corporate & institutional events in Cameroon and Africa | CHANY EVENT'S")}
        description={L('Conventions, séminaires, événements institutionnels et diplomatiques, gestion de délégations, lancements et inaugurations.', 'Conventions, seminars, institutional and diplomatic events, delegation management, launches and inaugurations.')}
      />
      <PageHero
        eyebrow="Corporate & Institutional"
        title={<>{L('Rigueur, protocole et ', 'Rigour, protocol and ')}<em>{L('excellence', 'excellence')}</em></>}
        lead={L("Pour les entreprises, ministères, ambassades, chambres de commerce et organisations internationales : des événements à la hauteur de vos enjeux.", 'For companies, ministries, embassies, chambers of commerce and international organisations: events that match your stakes.')}
        image={delegation} alt={L('Délégation officielle', 'Official delegation')}
      />
      <Feature id="corporate" index="01" title="Corporate Events"
        text={L('Fédérer vos équipes, engager vos partenaires et valoriser votre marque.', 'Unite your teams, engage your partners and showcase your brand.')}
        items={['Conventions', L('Séminaires', 'Seminars'), 'Kick-off meetings', L('Assemblées générales', 'General assemblies'), 'Executive meetings', 'Incentives', 'Team building', 'Leadership events', 'Business breakfasts', 'Business dinners', 'Awards & Galas']}
        image={corporate} />
      <Feature id="institutionnel" index="02" tone reverse title={L('Événements institutionnels', 'Institutional events')}
        text={L('Cérémonies officielles, forums publics et assises nationales, organisés dans le respect des codes et du protocole.', 'Official ceremonies, public forums and national assemblies, run with full respect for codes and protocol.')}
        items={[L('Cérémonies officielles', 'Official ceremonies'), L('Forums publics', 'Public forums'), L('Assises', 'Assemblies'), L('Remises de prix', 'Award ceremonies'), L('Dîners officiels', 'Official dinners')]}
        image={conference} />
      <Feature id="diplomatique" index="03" title={L('Événements diplomatiques', 'Diplomatic events')}
        text={L('Réceptions d’ambassades, fêtes nationales, visites officielles : discrétion, protocole et sens du détail.', 'Embassy receptions, national days, official visits: discretion, protocol and attention to detail.')}
        items={[L("Réceptions d'ambassade", 'Embassy receptions'), L('Fêtes nationales', 'National days'), L('Visites officielles', 'Official visits'), L('Réceptions VIP', 'VIP receptions')]}
        image={vip} />
      <Feature id="delegations" index="04" tone title="Delegation Management"
        text={L("Pour gouvernements, entreprises, associations professionnelles, chambres de commerce, ambassades et organisations internationales.", 'For governments, companies, professional associations, chambers of commerce, embassies and international organisations.')}
        items={[L('Accueil aéroport', 'Airport welcome'), 'Transport', L('Hébergement', 'Accommodation'), L('Programme', 'Programme'), L('Protocole', 'Protocol'), 'Business meetings', L('Interprétation', 'Interpretation'), L('Visites', 'Visits'), 'VIP management', L('Conciergerie business', 'Business concierge')]} />
      <Feature id="lancements" index="05" title={L('Lancements & inaugurations', 'Launches & inaugurations')}
        text={L('Révéler un produit, une marque ou un site avec impact, auprès des bons publics et des médias.', 'Unveil a product, brand or site with impact, before the right audiences and media.')}
        items={[L('Lancements produit', 'Product launches'), L('Inaugurations', 'Inaugurations'), L('Relations médias', 'Media relations'), L('Conférences de presse', 'Press conferences'), 'Streaming']} />
      <CtaBand title={L('De la réflexion à l’exécution.', 'From strategy to execution.')}
        text={L('Présentez-nous votre projet corporate ou institutionnel.', 'Tell us about your corporate or institutional project.')}
        button={L('Démarrer un projet', 'Start a project')} to="/contact#projet" />
    </Layout>
  );
};
export default CorporateInstitutional;
