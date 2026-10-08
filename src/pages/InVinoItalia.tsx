import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CalendarDays, MapPin, MessageCircle } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import { useL, Seo, Reveal } from '@/components/common/Blocks';
import invinoLogoAsset from '@/assets/invino-douala-logo.jpg.asset.json';
import invinoPosterAsset from '@/assets/invino-douala-affiche.jpg.asset.json';

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
    name: 'Best Western Plus Soaho Hotel',
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
        description={L("1er Salon des Vins Italiens en Afrique Centrale, du 26 au 28 novembre 2026 au Best Western Plus Soaho Hotel de Douala. Dégustations, masterclasses, business club B2B.", 'First Italian Wine Fair in Central Africa, 26–28 November 2026 at the Best Western Plus Soaho Hotel, Douala. Tastings, masterclasses, B2B business club.')}
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
            <p className="text-muted-foreground text-lg mb-8">{L("CHANY EVENT'S accompagne l'organisation du tout premier salon des vins italiens en Afrique Centrale. Trois journées d'exception pour vivre l'Italie à Douala : vins d'exception, gastronomie, ateliers de dégustation, démonstrations culinaires, rencontres privilégiées et club d'affaires B2B, dans le cadre prestigieux du Best Western Plus Soaho Hotel.", "CHANY EVENT'S is supporting the organization of the very first Italian wine fair in Central Africa. Three exceptional days to experience Italy in Douala: exceptional wines, gastronomy, masterclasses, show-cooking, exclusive encounters and a B2B business club, in the prestigious setting of the Best Western Plus Soaho Hotel.")}</p>
            <dl className="grid sm:grid-cols-2 gap-4 mb-8 text-foreground">
              <div className="flex items-center gap-3"><CalendarDays className="w-5 h-5 text-primary" /><div><dt className="sr-only">Dates</dt><dd>26 – 28 {L('novembre', 'November')} 2026</dd></div></div>
              <div className="flex items-center gap-3"><MapPin className="w-5 h-5 text-primary" /><div><dt className="sr-only">{L('Lieu', 'Venue')}</dt><dd>Best Western Plus Soaho Hotel, Douala</dd></div></div>
            </dl>
            <div className="flex flex-col sm:flex-row gap-4">
              <a href="https://www.invinodouala.com" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center px-7 py-3.5 bg-primary text-primary-foreground rounded-sm font-semibold">{L('Site officiel du salon', 'Official fair website')} <ArrowRight className="ml-2 w-4 h-4" /></a>
              <Link to="/careers" className="inline-flex items-center justify-center px-7 py-3.5 border border-primary text-primary rounded-sm font-semibold hover:bg-primary/10">{L("Rejoindre l'équipe du salon", 'Join the event team')}</Link>
              <a href="https://wa.me/237675788550" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center px-7 py-3.5 border border-border text-foreground rounded-sm font-semibold"><MessageCircle className="mr-2 w-4 h-4" />WhatsApp</a>
            </div>
          </Reveal>
          <Reveal delay={0.1} className="relative mx-auto w-full max-w-md">
            <div aria-hidden="true" className="absolute inset-0 translate-x-4 translate-y-4 border border-champagne rounded-sm" />
            <img src={invinoPosterAsset.url} alt={L("Affiche In Vino Italia Douala 2026, 26–28 novembre, Best Western Plus Soaho Hotel", 'In Vino Italia Douala 2026 poster, 26–28 November, Best Western Plus Soaho Hotel')} width={900} height={1125} className="relative w-full h-auto rounded-sm border border-champagne/40" />
          </Reveal>
        </div>
      </section>
      <section className="section-padding bg-secondary/40">
        <div className="container-luxury max-w-3xl">
          <h2 className="text-section font-serif text-foreground mb-6">{L("Le rôle de CHANY EVENT'S", "CHANY EVENT'S role")}</h2>
          <ul className="space-y-3 text-foreground/85">
            {[L('Coordination générale', 'General coordination'), L('Recrutement et encadrement des hôtesses et stewards', 'Recruitment and supervision of hostesses and stewards'), L('Accueil et gestion des flux', 'Welcome and visitor flow management'), L('Logistique', 'Logistics'), L('Tenue des stands', 'Stand management')].map((t) => (
              <li key={t} className="flex gap-3"><span className="text-primary">—</span>{t}</li>
            ))}
          </ul>
          <p className="text-sm text-muted-foreground mt-8">{L('Organisé par DAS Sarl', 'Organised by DAS Sarl')} · <a href="https://www.invinodouala.com" target="_blank" rel="noopener noreferrer" className="underline">www.invinodouala.com</a></p>
        </div>
      </section>
    </Layout>
  );
};

export default InVinoItalia;
