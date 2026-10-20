import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CalendarDays, MapPin, MessageCircle } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import { useL, Seo, Reveal } from '@/components/common/Blocks';
import invinoLogoAsset from '@/assets/invino-douala-logo.jpg.asset.json';
import invinoPosterAsset from '@/assets/invino-douala-affiche-2026.jpg.asset.json';

const PAGE_URL = 'https://chanyevents.com/in-vino-italia-douala-2026';

const eventLd = {
  '@context': 'https://schema.org',
  '@type': 'Event',
  name: 'In Vino Italia Douala 2026',
  description: "1er Salon des Vins Italiens en Afrique Centrale : vins d'exception, gastronomie italienne, masterclasses, show-cooking et business club B2B.",
  startDate: '2026-11-26',
  endDate: '2026-11-28',
  eventStatus: 'https://schema.org/EventScheduled',
  eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
  inLanguage: ['fr', 'en'],
  url: PAGE_URL,
  image: [`https://chanyevents.com${invinoPosterAsset.url}`, `https://chanyevents.com${invinoLogoAsset.url}`],
  location: {
    '@type': 'Place',
    name: 'SOAHO Douala Airport Hôtel',
    address: { '@type': 'PostalAddress', addressLocality: 'Douala', addressCountry: 'CM' },
  },
  organizer: [
    { '@type': 'Organization', name: 'DAS Sarl', url: 'https://www.invinodouala.com' },
    { '@type': 'Organization', name: "CHANY EVENT'S", url: 'https://chanyevents.com' },
  ],
};

const breadcrumbLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Accueil', item: 'https://chanyevents.com/' },
    { '@type': 'ListItem', position: 2, name: 'Réalisations', item: 'https://chanyevents.com/portfolio' },
    { '@type': 'ListItem', position: 3, name: 'In Vino Italia Douala 2026', item: PAGE_URL },
  ],
};

const InVinoItalia: React.FC = () => {
  const L = useL();
  useEffect(() => {
    const s = document.createElement('script');
    s.type = 'application/ld+json';
    s.id = 'ld-invino';
    s.text = JSON.stringify([eventLd, breadcrumbLd]);
    document.head.appendChild(s);
    return () => s.remove();
  }, []);

  return (
    <Layout>
      <Seo
        title={L("In Vino Italia Douala 2026 — Salon des vins italiens | CHANY EVENT'S", "In Vino Italia Douala 2026 — Italian wine fair | CHANY EVENT'S")}
        description={L("1er Salon des Vins Italiens en Afrique Centrale, du 26 au 28 novembre 2026 au SOAHO Douala Airport Hôtel de Douala. Dégustations, masterclasses, business club B2B.", 'First Italian Wine Fair in Central Africa, 26–28 November 2026 at the SOAHO Douala Airport Hôtel, Douala. Tastings, masterclasses, B2B business club.')}
      />
      <section className="pt-36 md:pt-44 pb-20 section-padding">
        <div className="container-luxury grid lg:grid-cols-2 gap-12 items-center">
          <Reveal>
            <nav aria-label={L("Fil d'Ariane", 'Breadcrumb')} className="text-sm text-muted-foreground mb-6">
              <Link to="/" className="hover:text-primary">{L('Accueil', 'Home')}</Link> / <Link to="/portfolio" className="hover:text-primary">{L('Réalisations', 'Work')}</Link> / <span className="text-foreground">In Vino Italia 2026</span>
            </nav>
            <span className="eyebrow">{L('Événement à la une', 'Featured event')}</span>
            <h1 className="text-display font-serif text-foreground my-5">In Vino Italia Douala <em>2026</em></h1>
            <p className="text-lead text-primary font-serif mb-6"><em>{L('1er Salon des Vins Italiens en Afrique Centrale', 'The first Italian Wine Fair in Central Africa')}</em></p>
            <p className="text-muted-foreground text-lg mb-8">{L("Mandatée par DAS CAMEROUN, CHANY EVENT'S assure la conception, la production et la coordination d'In Vino Italia Douala 2026. Trois journées d'exception pour vivre l'Italie à Douala : vins d'exception, gastronomie, ateliers de dégustation, démonstrations culinaires, rencontres privilégiées et club d'affaires B2B, dans le cadre prestigieux du SOAHO Douala Airport Hôtel.", "Appointed by DAS CAMEROUN, CHANY EVENT'S is responsible for the design, production and coordination of In Vino Italia Douala 2026. Three exceptional days to experience Italy in Douala: exceptional wines, gastronomy, masterclasses, show-cooking, exclusive encounters and a B2B business club, in the prestigious setting of the SOAHO Douala Airport Hôtel.")}</p>
            <dl className="grid sm:grid-cols-2 gap-4 mb-8 text-foreground">
              <div className="flex items-center gap-3"><CalendarDays className="w-5 h-5 text-primary" /><div><dt className="sr-only">Dates</dt><dd>26 – 28 {L('novembre', 'November')} 2026</dd></div></div>
              <div className="flex items-center gap-3"><MapPin className="w-5 h-5 text-primary" /><div><dt className="sr-only">{L('Lieu', 'Venue')}</dt><dd>SOAHO Douala Airport Hôtel, Douala</dd></div></div>
            </dl>
            <div className="flex flex-col sm:flex-row gap-4">
              <a href="https://www.invinodouala.com" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center px-7 py-3.5 bg-primary text-primary-foreground rounded-sm font-semibold">{L('Site officiel du salon', 'Official fair website')} <ArrowRight className="ml-2 w-4 h-4" /></a>
              <Link to="/careers" className="inline-flex items-center justify-center px-7 py-3.5 border border-primary text-primary rounded-sm font-semibold hover:bg-primary/10">{L("Rejoindre l'équipe du salon", 'Join the event team')}</Link>
              <a href="https://wa.me/237675788550" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center px-7 py-3.5 border border-border text-foreground rounded-sm font-semibold"><MessageCircle className="mr-2 w-4 h-4" />WhatsApp</a>
            </div>
          </Reveal>
          <Reveal delay={0.1} className="relative mx-auto w-full max-w-md">
            <div aria-hidden="true" className="absolute inset-0 translate-x-4 translate-y-4 border border-champagne rounded-sm" />
            <img src={invinoPosterAsset.url} alt={L("Affiche In Vino Italia Douala 2026, 26–28 novembre, SOAHO Douala Airport Hôtel", 'In Vino Italia Douala 2026 poster, 26–28 November, SOAHO Douala Airport Hôtel')} width={1120} height={948} className="relative w-full h-auto rounded-sm border border-champagne/40" />
          </Reveal>
        </div>
      </section>
      <section className="section-padding bg-secondary/40">
        <div className="container-luxury">
          <h2 className="text-section font-serif text-foreground mb-6">{L("Le rôle de CHANY EVENT'S", "CHANY EVENT'S role")}</h2>
          <p className="text-lg text-muted-foreground max-w-3xl mb-10">{L("De la préparation au bilan final, notre mandat couvre l'organisation du salon pour le compte de DAS CAMEROUN, avec un pilotage global et une coordination opérationnelle sur site.", 'From preparation to the final report, our mandate covers the organization of the fair on behalf of DAS CAMEROUN, with overall project management and on-site operational coordination.')}</p>
          <ul className="grid md:grid-cols-2 gap-x-12 gap-y-8">
            {[
              { title: L('Conception générale & scénographie', 'Event design & scenography'), description: L('Conception du salon, parcours visiteur, plan de salle et identité visuelle opérationnelle.', 'Fair concept, visitor journey, floor plan and operational visual identity.') },
              { title: L('Supports de prospection', 'Outreach materials'), description: L('Conception des supports de prospection du salon.', 'Design of outreach materials for the fair.') },
              { title: L('Coordination des exposants', 'Exhibitor coordination'), description: L('Suivi des dossiers, coordination logistique et accueil des exposants sur site.', 'Application follow-up, logistics coordination and on-site exhibitor reception.') },
              { title: L('Aménagement & habillage du site', 'Venue layout & branding'), description: L("Supervision des stands, de l'électricité, du podium, du secrétariat, des espaces B2B, du club d'acheteurs et des ateliers de dégustation ; signalétique, fléchage, habillage et décoration.", 'Supervision of stands, electricity, stage, secretariat, B2B spaces, buyer club and masterclass area; signage, wayfinding, venue branding and decoration.') },
              { title: L('Direction des équipes', 'Team management'), description: L('Recrutement et supervision des hôtesses et auxiliaires ; coordination de la sécurité, des techniciens, du secrétariat, des journalistes, du maître de cérémonie et du sommelier.', 'Recruitment and supervision of hostesses and support staff; coordination of security, technicians, secretariat, journalists, master of ceremonies and sommelier.') },
              { title: L('Coordination du programme', 'Programme coordination'), description: L('Pilotage des trois jours : animations, podium, démonstrations culinaires, défilé, tombola et soirée NOTTE ITALIA.', 'Coordination of the three-day programme: entertainment, stage activities, show-cooking, fashion show, raffle and NOTTE ITALIA evening.') },
              { title: L('Site internet trilingue', 'Trilingual website'), description: L('Conception du site internet trilingue dédié au salon.', 'Design of the trilingual website dedicated to the fair.') },
              { title: L('Presse, protocole & accréditations', 'Press, protocol & accreditation'), description: L('Gestion des relations presse, du protocole et des accréditations.', 'Management of press relations, protocol and accreditation.') },
              { title: L('Coordination générale & suivi', 'Overall coordination & monitoring'), description: L("Pilotage des préparatifs, réunions de suivi et coordination avec l'établissement hôtelier sous l'autorité de DAS CAMEROUN.", 'Preparation management, progress meetings and coordination with the hotel under the authority of DAS CAMEROUN.') },
              { title: L('Bilan après le salon', 'Post-event reporting'), description: L('Rapport de clôture et bilan après le salon, remis au plus tard quinze jours après sa fin.', 'Closing report and post-event review, delivered no later than fifteen days after the fair ends.') },
            ].map((service) => (
              <li key={service.title} className="border-t border-border pt-5">
                <h3 className="font-serif text-2xl text-foreground mb-3">{service.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{service.description}</p>
              </li>
            ))}
          </ul>
          <p className="text-sm text-muted-foreground mt-10">{L("Un événement de DAS CAMEROUN · Organisation et coordination : CHANY EVENT'S", "An event by DAS CAMEROUN · Organization and coordination: CHANY EVENT'S")} · <a href="https://www.invinodouala.com" target="_blank" rel="noopener noreferrer" className="underline">www.invinodouala.com</a></p>
        </div>
      </section>
    </Layout>
  );
};

export default InVinoItalia;
