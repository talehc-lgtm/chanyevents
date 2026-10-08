import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, CalendarDays, MapPin } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import { useL, Seo, Reveal } from '@/components/common/Blocks';
import conference from '@/assets/biz-conference.jpg';
import tradeshow from '@/assets/biz-tradeshow.jpg';
import b2b from '@/assets/biz-b2b.jpg';
import delegation from '@/assets/biz-delegation.jpg';
import corporateSeminar from '@/assets/biz-corporate-seminar.jpg';
import workshop from '@/assets/biz-workshop.jpg';
import gala from '@/assets/biz-gala.jpg';
import vipReception from '@/assets/chany-vip-reception.jpg';
import networking from '@/assets/biz-networking.jpg';
import weddingArch from '@/assets/chany-wedding-arch-couple.png';
import invinoLogoAsset from '@/assets/invino-douala-logo.jpg.asset.json';

const Index: React.FC = () => {
  const L = useL();

  const expertises = [
    { t: L('Foires & Salons professionnels', 'Trade fairs & exhibitions'), i: L('Foires internationales · Salons sectoriels · Salons professionnels · Pavillons pays · Conférences-expositions', 'International fairs · Sector shows · Trade shows · Country pavilions · ConfEx'), to: '/business-events#salons', img: tradeshow },
    { t: L('Conférences & grands rendez-vous', 'Conferences & major gatherings'), i: L('Forums économiques · Sommets · Congrès · Symposiums · Assises', 'Economic forums · Summits · Congresses · Symposiums'), to: '/business-events#conferences', img: conference },
    { t: L('B2B & rencontres d’affaires', 'B2B & Business Matching'), i: L('Programmes acheteurs invités · Rencontres acheteurs-vendeurs · Journées fournisseurs · Rendez-vous express', 'Hosted Buyer Programmes · Buyer-seller meetings · Supplier Days · Speed meetings'), to: '/business-events#b2b', img: b2b },
    { t: L('Missions économiques', 'Trade missions'), i: L('Missions export & import · Délégations · Visites institutionnelles · Tournées de promotion', 'Export & import missions · Delegations · Institutional visits · Roadshows'), to: '/business-events#missions', img: delegation },
    { t: L('Événements d’entreprise', 'Corporate Events'), i: L('Conventions · Séminaires · Lancements d’année · AG · Voyages de motivation · Cohésion d’équipe', 'Conventions · Seminars · Kick-offs · AGMs · Incentives · Team building'), to: '/corporate-institutional#corporate', img: corporateSeminar },
    { t: L('Réseautage', 'Networking'), i: L('Petits-déjeuners d’affaires · Déjeuners · Dîners · Rencontres de dirigeants · Réseautage exécutif', 'Business Breakfasts · Lunches · Dinners · CEO Meetings · Executive Networking'), to: '/corporate-institutional#corporate', img: networking },
    { t: L('Innovation & formation', 'Innovation & training'), i: L('Ateliers · Classes de maître · Formations intensives · Sommets technologiques (IA, sécurité, productivité) · Événements de jeunes pousses', 'Workshops · Masterclasses · Bootcamps · Tech Summits (AI, security, productivity) · Startup events'), to: '/services', img: workshop },
    { t: L('Remises de prix & galas', 'Awards & Galas'), i: L('Remises de prix · Galas · Trophées · Dîners officiels · Réceptions VIP', 'Awards · Galas · Trophies · Official dinners · VIP receptions'), to: '/corporate-institutional#institutionnel', img: gala },
  ];

  const process = [
    [L('Comprendre', 'Understand'), L('Écoute, contexte, enjeux', 'Listening, context, stakes')],
    [L('Concevoir', 'Think'), L('Concept, objectifs, publics, format', 'Concept, goals, audiences, format')],
    [L('Planifier', 'Plan'), L('Budget, planning, prestataires, sponsors, exposants', 'Budget, schedule, suppliers, sponsors, exhibitors')],
    [L('Connecter', 'Connect'), L('Invitations, acheteurs, intervenants, investisseurs, délégations', 'Invitations, buyers, speakers, investors, delegations')],
    [L('Produire', 'Produce'), L('Scénographie, stands, technique, signalétique, accueil', 'Scenography, stands, tech, signage, welcome')],
    [L('Livrer', 'Deliver'), L('Coordination terrain, régie, VIP, exposants', 'On-site coordination, stage, VIPs, exhibitors')],
    [L('Mesurer', 'Measure'), L('Rapports, contacts qualifiés, rencontres, bilan post-événement', 'Reporting, leads, meetings, post-event review')],
  ];

  const zones = [
    { n: L('Afrique centrale', 'Central Africa'), c: L('Cameroun · Gabon · Congo · RDC · Centrafrique · Tchad · Guinée équatoriale · São Tomé-et-Príncipe', 'Cameroon · Gabon · Congo · DRC · CAR · Chad · Equatorial Guinea · São Tomé and Príncipe') },
    { n: L("Afrique de l'Ouest", 'West Africa'), c: L("Côte d'Ivoire · Sénégal · Nigeria · Ghana · Bénin · Togo · Guinée · Mali · Burkina Faso · Niger · Cap-Vert", "Côte d'Ivoire · Senegal · Nigeria · Ghana · Benin · Togo · Guinea · Mali · Burkina Faso · Niger · Cape Verde") },
    { n: L("Afrique de l'Est", 'East Africa'), c: L('Kenya · Rwanda · Ouganda · Tanzanie · Éthiopie · Djibouti · Burundi', 'Kenya · Rwanda · Uganda · Tanzania · Ethiopia · Djibouti · Burundi') },
  ];

  const clients = [L('Entreprises', 'Companies'), L('Multinationales', 'Multinationals'), L('Institutions publiques', 'Public institutions'), L('Ministères', 'Ministries'), L('Organisations internationales', 'International organisations'), L('Ambassades', 'Embassies'), L('Chambres de commerce', 'Chambers of commerce'), L('Fédérations professionnelles', 'Trade federations'), L('Organisateurs de salons', 'Trade show organisers'), L('Associations professionnelles', 'Professional associations'), L('Investisseurs', 'Investors'), L('Banques', 'Banks'), 'ONG', L('Jeunes pousses', 'Startups'), L('Marques', 'Brands'), L('Promoteurs immobiliers', 'Real estate developers'), L('Hôtels', 'Hotels'), L('Particuliers premium', 'Premium private clients')];
  const sectors = [L('Finance & Banque', 'Finance & Banking'), L('Assurance', 'Insurance'), L('Technologie', 'Technology'), L('Intelligence Artificielle', 'Artificial Intelligence'), L('Télécommunications', 'Telecoms'), L('Énergie', 'Energy'), L('Pétrole & gaz', 'Oil & Gas'), L('Mines', 'Mining'), L('Agriculture', 'Agriculture'), L('Agro-industrie', 'Agribusiness'), L('Industrie', 'Industry'), L('Construction', 'Construction'), L('Infrastructure', 'Infrastructure'), L('Immobilier', 'Real estate'), L('Transport', 'Transport'), L('Logistique', 'Logistics'), L('Tourisme', 'Tourism'), L('Hôtellerie', 'Hospitality'), L('Santé', 'Healthcare'), L('Commerce', 'Trade'), L('Distribution', 'Retail'), L('Chaîne d’approvisionnement', 'Supply Chain'), L('Éducation', 'Education'), L('Environnement', 'Environment'), L('Industries créatives', 'Creative industries')];

  const stats = [
    ['+50', L('Événements réalisés', 'Events delivered')],
    ['15+', L("Années d'expérience", 'Years of experience')],
    ['250+', L('Partenaires', 'Partners')],
    ['1,000+', L('Exposants', 'Exhibitors')],
  ];

  return (
    <Layout>
      <Seo title={L("CHANY EVENT'S | Agence d’événements d’affaires, d’entreprise et institutionnels en Afrique", "CHANY EVENT'S | Business, Corporate & Institutional Event Agency in Africa")}
        description={L("Agence événementielle au Cameroun : salons professionnels, conférences, B2B, missions économiques, événements d’entreprise et institutionnels en Afrique centrale, de l'Ouest et de l'Est.", 'Event agency in Cameroon: trade shows, conferences, B2B matching, trade missions, corporate and institutional events across Central, West and East Africa.')} />

      {/* Hero */}
      <section className="relative min-h-[92vh] flex items-end overflow-hidden">
        <img src={conference} alt={L('Conférence professionnelle', 'Business conference')} className="absolute inset-0 w-full h-full object-cover" width={1600} height={1008} />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/40 to-ink/10" />
        <div className="relative container-luxury px-6 md:px-12 pb-16 md:pb-24 pt-40 w-full">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9 }} className="max-w-4xl">
            <p className="text-xs md:text-sm font-semibold tracking-[0.25em] uppercase text-cream/80 mb-6">{L('Affaires • Entreprises • Institutions • Événements d’exception', 'Business • Corporate • Institutional • Signature Events')}</p>
            <h1 className="text-display font-serif text-cream mb-6">{L('Nous concevons des événements qui font ', 'We design events that move ')}<em>{L('avancer', 'business')}</em>{L(' les affaires.', ' forward.')}</h1>
            <p className="text-lead text-cream/85 max-w-2xl mb-4">
              {L('Foires, salons, conférences, missions économiques, rencontres B2B, événements d’entreprise, institutionnels et d’exception.', 'Trade fairs, exhibitions, conferences, trade missions, B2B meetings, corporate, institutional and signature events.')}
            </p>
            <p className="text-sm font-semibold tracking-[0.2em] uppercase text-cream mb-10">Central Africa • West Africa • East Africa</p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/contact#projet" className="inline-flex items-center justify-center px-8 py-4 bg-primary text-primary-foreground rounded-sm font-semibold hover-gold-glow">
                {L('Démarrer un projet', 'Start a project')} <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
              <a href="#expertises" className="inline-flex items-center justify-center px-8 py-4 border border-cream/60 text-cream rounded-sm font-semibold hover:bg-cream/10 transition-colors">
                {L('Découvrir nos expertises', 'Explore our expertise')}
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Promise */}
      <section className="section-padding">
        <div className="container-luxury grid lg:grid-cols-12 gap-10">
          <Reveal className="lg:col-span-7">
            <span className="eyebrow mb-6">From Strategy to Execution</span>
            <h2 className="text-display font-serif text-foreground mt-6">{L('De la réflexion à ', 'From strategy to ')}<em>{L("l'exécution.", 'execution.')}</em></h2>
          </Reveal>
          <Reveal delay={0.1} className="lg:col-span-5 self-end">
            <p className="text-lead text-muted-foreground mb-6">{L("CHANY EVENT'S peut prendre en charge l'intégralité de votre projet événementiel ou uniquement les étapes pour lesquelles vous avez besoin de nous.", "CHANY EVENT'S can manage your entire event project, or only the stages where you need us.")}</p>
            <p className="font-serif text-2xl text-primary">{L('Confiez-nous tout. Ou simplement la partie qui vous manque.', 'Trust us with everything. Or just the part you are missing.')}</p>
          </Reveal>
        </div>
      </section>

      {/* Process */}
      <section className="section-padding bg-charcoal overflow-hidden">
        <div className="container-luxury">
          <Reveal className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
            <h2 className="text-section font-serif text-foreground">{L('Notre méthode en 7 étapes', 'Our 7-step method')}</h2>
            <p className="text-muted-foreground max-w-sm">{L('Une seule équipe, un fil conducteur : de la première écoute jusqu’au bilan.', 'One team, one through-line: from the first briefing to the final report.')}</p>
          </Reveal>
          <div className="relative">
            {/* Animated connecting line */}
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
              className="hidden lg:block absolute top-[7px] left-0 right-0 h-px bg-primary/40 origin-left"
            />
            <div className="grid sm:grid-cols-2 lg:grid-cols-7 gap-y-12 gap-x-6">
              {process.map(([n, d], i) => (
                <motion.div
                  key={n}
                  initial={{ opacity: 0, y: 28 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.6, delay: 0.15 + i * 0.12, ease: [0.22, 1, 0.36, 1] }}
                  className={`group relative lg:pt-10 ${i % 2 === 1 ? 'lg:translate-y-6' : ''}`}
                >
                  {/* Node on the line */}
                  <span className="hidden lg:block absolute top-0 left-0 w-[15px] h-[15px] rounded-full border-2 border-primary bg-charcoal group-hover:bg-primary transition-colors duration-500" />
                  <span className="lg:hidden absolute -left-4 top-1 bottom-1 w-px bg-primary/30" />
                  <span className="block font-serif text-5xl text-primary/35 group-hover:text-primary transition-colors duration-500">{String(i + 1).padStart(2, '0')}</span>
                  <h3 className="font-serif text-2xl text-foreground mt-3 mb-2 group-hover:text-primary transition-colors duration-500">{n}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{d}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Expertises */}
      <section id="expertises" className="section-padding scroll-mt-24">
        <div className="container-luxury">
          <Reveal className="mb-12"><span className="eyebrow">{L('Nos expertises', 'Our expertise')}</span>
            <h2 className="text-section font-serif text-foreground mt-6 max-w-3xl">{L('Huit familles d’événements, une même exigence', 'Eight event families, one standard')}</h2></Reveal>
          <div className="grid md:grid-cols-2 gap-x-12">
            {expertises.map((e, i) => (
              <Reveal key={e.t} delay={(i % 2) * 0.08}>
                <Link to={e.to} className="group flex items-center gap-5 md:gap-6 py-6 border-t border-border">
                  <div className="shrink-0 w-24 h-24 md:w-28 md:h-28 overflow-hidden rounded-sm">
                    <img src={e.img} alt={e.t} loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="text-xs font-semibold text-primary tracking-widest">{String(i + 1).padStart(2, '0')}</span>
                    <h3 className="font-serif text-2xl md:text-3xl text-foreground group-hover:text-primary transition-colors mt-1">{e.t}</h3>
                    <p className="text-muted-foreground text-sm mt-2">{e.i}</p>
                  </div>
                  <ArrowRight className="w-5 h-5 shrink-0 text-primary opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Business events value */}
      <section className="section-padding bg-charcoal">
        <div className="container-luxury grid lg:grid-cols-12 gap-12 items-center">
          <Reveal className="lg:col-span-5"><img src={b2b} alt={L('Rencontres d’affaires', 'Business matching')} loading="lazy" className="w-full aspect-[4/5] object-cover rounded-sm" /></Reveal>
          <Reveal delay={0.1} className="lg:col-span-7">
            <span className="eyebrow mb-6">{L('Événements d’affaires', 'Business Events')}</span>
            <h2 className="text-section font-serif text-foreground my-6">{L('Un événement doit produire des résultats', 'An event must produce results')}</h2>
            <div className="flex flex-wrap gap-x-6 gap-y-2 font-serif text-2xl text-foreground/80 mb-8">
              {[L('connexions', 'connections'), L('opportunités', 'opportunities'), L('prospects', 'leads'), L('contrats', 'contracts'), L('visibilité', 'visibility'), L('investissements', 'investments'), L('partenariats', 'partnerships'), L('influence', 'influence')].map((w) => <span key={w}><em>{w}</em></span>)}
            </div>
            <p className="text-lg text-muted-foreground border-l-2 border-primary pl-6">{L("Nous ne mesurons pas seulement le succès d'un événement au nombre de participants, mais aux rencontres, aux opportunités et aux résultats qu'il génère.", "We don't measure an event's success by attendance alone, but by the meetings, opportunities and results it generates.")}</p>
            <Link to="/business-events" className="inline-flex items-center mt-8 text-primary font-semibold">{L('Découvrir les événements d’affaires', 'Explore Business Events')} <ArrowRight className="ml-2 w-4 h-4" /></Link>
          </Reveal>
        </div>
      </section>

      {/* Africa */}
      <section className="section-padding">
        <div className="container-luxury">
          <Reveal className="text-center max-w-3xl mx-auto mb-14">
            <span className="eyebrow">{L('Partenaire événementiel en Afrique', 'Africa Event Partner')}</span>
            <h2 className="text-section font-serif text-foreground mt-6 mb-5">Central Africa • West Africa • East Africa</h2>
            <p className="text-muted-foreground text-lg">{L("Basée au Cameroun, CHANY EVENT'S accompagne ses clients sur plusieurs marchés africains grâce à sa capacité d'intervention, son réseau de partenaires locaux et une coordination régionale multi-pays.", "Based in Cameroon, CHANY EVENT'S supports clients across several African markets through its delivery capacity, network of local partners and multi-country regional coordination.")}</p>
          </Reveal>
          <div className="grid md:grid-cols-3 gap-6">
            {zones.map((z, i) => (
              <Reveal key={z.n} delay={i * 0.1} className="p-8 border border-border rounded-sm bg-card h-full">
                <span className="block w-10 h-10 rounded-full bg-primary/10 border border-primary/30 mb-6" style={{ opacity: 1 - i * 0.2 }} />
                <h3 className="font-serif text-3xl text-foreground mb-4">{z.n}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{z.c}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Who we work with */}
      <section className="section-padding bg-charcoal">
        <div className="container-luxury grid lg:grid-cols-2 gap-14">
          <Reveal>
            <span className="eyebrow">Who we work with</span>
            <h2 className="text-section font-serif text-foreground mt-6 mb-8">{L('Nos clients', 'Our clients')}</h2>
            <div className="flex flex-wrap gap-2">{clients.map((c) => <span key={c} className="px-3 py-1.5 text-sm border border-border rounded-full bg-background">{c}</span>)}</div>
          </Reveal>
          <Reveal delay={0.1} className="bg-background p-8 md:p-10 rounded-sm border border-border">
            <h3 className="font-serif text-3xl text-foreground mb-4">International companies entering Africa</h3>
            <p className="text-muted-foreground mb-6">{L("Nous sommes le partenaire local des entreprises étrangères qui souhaitent :", 'We are the local partner for foreign companies looking to:')}</p>
            <ul className="space-y-3 text-foreground">
              {[L('organiser une conférence', 'host a conference'), L('lancer un produit', 'launch a product'), L('faire une mission commerciale', 'run a trade mission'), L('rencontrer des distributeurs', 'meet distributors'), L('organiser une tournée de promotion', 'run a roadshow'), L('participer à un salon', 'exhibit at a trade show')].map((x) => (
                <li key={x} className="flex items-center gap-3"><span className="h-px w-6 bg-primary" />{x}</li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* Sectors */}
      <section className="section-padding">
        <div className="container-luxury">
          <Reveal><h2 className="text-section font-serif text-foreground mb-10">{L('Secteurs', 'Sectors')}</h2></Reveal>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 border-t border-l border-border">
            {sectors.map((s) => <div key={s} className="border-r border-b border-border px-4 py-5 text-sm font-medium text-foreground/80 hover:bg-charcoal hover:text-primary transition-colors">{s}</div>)}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20 bg-charcoal border-y border-border">
        <div className="container-luxury px-6 grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map(([n, l], i) => (
            <Reveal key={l} delay={i * 0.1} className="text-center">
              <span className="block font-serif text-5xl md:text-6xl font-semibold text-primary mb-2">{n.split('+').flatMap((p, j) => (j === 0 ? [p] : ['+', p])).map((p, j) => p === '+' ? <span key={j} className="font-sans font-light">+</span> : <span key={j}>{p}</span>)}</span>
              <span className="text-muted-foreground text-sm uppercase tracking-widest">{l}</span>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Featured: In Vino */}
      <section className="section-padding">
        <div className="container-luxury grid lg:grid-cols-2 gap-12 items-center">
          <Reveal className="relative mx-auto w-full max-w-md lg:max-w-lg">
            <div aria-hidden="true" className="absolute inset-0 translate-x-4 translate-y-4 border border-champagne rounded-sm" />
            <img src={invinoLogoAsset.url} alt="In Vino Italia Douala — Salon des vins italiens en Afrique Centrale" loading="lazy" className="relative w-full h-auto rounded-sm border border-champagne/40 shadow-[var(--shadow-elegant)]" />
            <span className="absolute -top-4 -right-4 bg-primary text-primary-foreground px-5 py-3 rounded-sm text-sm font-semibold uppercase tracking-wider">{L('Événement à la une', 'Featured event')}</span>
          </Reveal>
          <Reveal delay={0.1}>
            <span className="eyebrow mb-4">{L('Nous organisons', 'We are organizing')}</span>
            <h2 className="text-section font-serif text-foreground my-5">In Vino Italia Douala<span className="block text-2xl md:text-3xl mt-3 text-primary"><em>{L('1er salon du vin italien au Cameroun', 'The first Italian wine fair in Cameroon')}</em></span></h2>
            <p className="text-muted-foreground text-lg mb-6">{L("CHANY EVENT'S accompagne l'organisation du tout premier salon des vins italiens en Afrique Centrale. Trois journées d'exception pour vivre l'Italie à Douala : vins d'exception, gastronomie, ateliers de dégustation, démonstrations culinaires, rencontres privilégiées et club d'affaires B2B, dans le cadre prestigieux du Best Western Plus Soaho Hotel.", "CHANY EVENT'S is supporting the organization of the very first Italian wine fair in Central Africa. Three exceptional days to experience Italy in Douala: exceptional wines, gastronomy, masterclasses, show-cooking, exclusive encounters and a B2B business club, in the prestigious setting of the Best Western Plus Soaho Hotel.")}</p>
            <div className="flex flex-col sm:flex-row gap-4 mb-8 text-foreground">
              <span className="flex items-center gap-2"><CalendarDays className="w-5 h-5 text-primary" />26 – 28 {L('novembre', 'November')} 2026</span>
              <span className="flex items-center gap-2"><MapPin className="w-5 h-5 text-primary" />Best Western Plus Soaho Hotel, Douala</span>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/in-vino-italia-douala-2026" className="inline-flex items-center justify-center px-7 py-3.5 bg-primary text-primary-foreground rounded-sm font-semibold hover-gold-glow">{L('Découvrir le salon', 'Discover the fair')} <ArrowRight className="ml-2 w-4 h-4" /></Link>
              <Link to="/careers" className="inline-flex items-center justify-center px-7 py-3.5 border border-primary text-primary rounded-sm font-semibold hover:bg-primary/10">{L("Rejoindre l'équipe du salon", 'Join the event team')}</Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Weddings band */}
      <section className="relative py-28 md:py-36 overflow-hidden">
        <img src={weddingArch} alt="" loading="lazy" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-ink/55" />
        <Reveal className="relative container-luxury px-6 text-center max-w-3xl">
          <span className="text-xs font-semibold tracking-[0.25em] uppercase text-cream/80">{L('Mariages & événements d’exception', 'Weddings & Signature Events')}</span>
          <h2 className="text-section font-serif text-cream mt-6 mb-8">{L('Vos moments personnels méritent la ', 'Your personal moments deserve the ')}<em>{L('même exigence.', 'same standard.')}</em></h2>
          <Link to="/weddings" className="inline-flex items-center px-8 py-4 border border-cream/70 text-cream rounded-sm font-semibold hover:bg-cream/10">{L('Découvrir les mariages & événements privés', 'Explore Weddings & Private Events')} <ArrowRight className="ml-2 w-4 h-4" /></Link>
        </Reveal>
      </section>

      {/* Final CTA */}
      <section className="section-padding">
        <div className="container-luxury grid md:grid-cols-3 gap-4 mb-14">
          {[tradeshow, delegation, conference].map((img, i) => <img key={i} src={img} alt="" loading="lazy" className={`w-full object-cover rounded-sm ${i === 1 ? 'aspect-[3/4] md:-mt-8' : 'aspect-[4/5]'}`} />)}
        </div>
        <Reveal className="container-luxury text-center max-w-3xl">
          <h2 className="text-section font-serif text-foreground mb-5">Tell us about your project</h2>
          <p className="text-lead text-muted-foreground mb-8">{L('Salon, conférence, mission, délégation ou célébration : parlons-en.', 'Trade show, conference, mission, delegation or celebration: let’s talk.')}</p>
          <Link to="/contact#projet" className="inline-flex items-center px-8 py-4 bg-primary text-primary-foreground rounded-sm font-semibold hover-gold-glow">{L('Démarrer un projet', 'Start a project')} <ArrowRight className="ml-2 w-5 h-5" /></Link>
        </Reveal>
      </section>
    </Layout>
  );
};
export default Index;
