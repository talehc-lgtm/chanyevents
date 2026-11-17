import { Link } from 'react-router-dom';
import { ArrowRight, Building2, Landmark, Users } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import { useL, Seo } from '@/components/common/Blocks';
import { Button } from '@/components/ui/button';
import workshop from '@/assets/biz-workshop.jpg';

const TrainingEvents = () => {
  const L = useL();
  const audiences = [
    { Icon: Building2, title: L('Entreprises', 'Companies'), text: L('Des sessions internes et des ateliers pour réunir vos équipes autour de leurs objectifs professionnels.', 'Internal sessions and workshops that bring your teams together around their professional objectives.') },
    { Icon: Landmark, title: L('Administrations & institutions', 'Public administrations & institutions'), text: L('Des formations et des rencontres de travail adaptées aux services publics, aux collectivités et aux institutions.', 'Training sessions and working meetings tailored to public services, local authorities and institutions.') },
    { Icon: Users, title: L('Équipes & partenaires', 'Teams & partners'), text: L('Des ateliers participatifs et des séminaires pour partager les pratiques et faciliter les échanges.', 'Participatory workshops and seminars to share practices and encourage discussion.') },
  ];
  const services = [
    [L('Cadrage de votre événement', 'Defining your event'), L('Objectifs, public, format, calendrier et budget : nous préparons avec vous le cadre de la formation.', 'Objectives, audience, format, schedule and budget: we work with you to establish the framework for your training event.')],
    [L('Lieu & équipements', 'Venue & equipment'), L('Recherche de salle, aménagement des espaces, sonorisation, projection et supports nécessaires aux sessions.', 'Venue sourcing, room layout, sound, projection and materials needed for the sessions.')],
    [L('Coordination des intervenants', 'Speaker coordination'), L('Organisation du programme, coordination avec vos formateurs et préparation des conditions de leur intervention.', 'Programme organisation, coordination with your trainers and preparation for their sessions.')],
    [L('Accueil & logistique', 'Reception & logistics'), L('Inscriptions, accueil des participants, pauses, restauration et coordination des déplacements selon vos besoins.', 'Registration, participant reception, breaks, catering and travel coordination according to your needs.')],
    [L('Pilotage le jour de la formation', 'On-site coordination'), L('Suivi du déroulé, gestion des horaires et coordination des équipes pour faciliter le travail des formateurs et des participants.', 'Schedule monitoring, time management and team coordination to support trainers and participants.')],
    [L('Bilan & suivi', 'Review & follow-up'), L('Recueil des retours des participants et bilan organisationnel pour préparer vos prochaines sessions.', 'Collection of participant feedback and an organisational review to prepare your next sessions.')],
  ];

  return (
    <Layout>
      <Seo title={L("Organisation des formations en entreprises et administrations | CHANY EVENT'S", "Organising training for companies and public administrations | CHANY EVENT'S")}
        description={L("CHANY EVENT'S assure l’organisation des formations en entreprises et administrations au Cameroun : ateliers, séminaires, lieu, équipements, accueil et coordination.", "CHANY EVENT'S organises training for companies and public administrations in Cameroon: workshops, seminars, venues, equipment, reception and coordination.")} />
      <section className="pt-28 md:pt-32 pb-10">
        <div className="container-luxury px-6 md:px-12 pb-8">
          <span className="eyebrow mb-4">{L('Entreprises & institutions', 'Corporate & Institutional')}</span>
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl max-w-5xl mb-5">{L('Organisation des formations ', 'Organising training ')}<em>{L('en entreprises et administrations', 'for companies and public administrations')}</em></h1>
          <p className="text-muted-foreground text-lg max-w-3xl">{L('CHANY EVENT’S accompagne les entreprises et les administrations dans l’organisation de leurs formations, ateliers et séminaires. De la préparation à la coordination sur place, nous créons un cadre professionnel pour apprendre, échanger et faire progresser vos équipes.', 'CHANY EVENT’S supports companies and public administrations in organising their training sessions, workshops and seminars. From preparation to on-site coordination, we create a professional setting to learn, share and develop your teams.')}</p>
        </div>
        <img src={workshop} alt={L('Atelier de formation avec une intervenante et des participants', 'Training workshop with a facilitator and participants')} className="w-full h-64 md:h-80 lg:h-96 object-cover object-top" fetchPriority="high" />
      </section>

      <section className="section-padding pt-10 md:pt-12">
        <div className="container-luxury">
          <h2 className="text-section font-serif mb-10">{L('Des formats adaptés à vos publics', 'Formats tailored to your audience')}</h2>
          <div className="grid md:grid-cols-3 gap-8 md:gap-10">
            {audiences.map(({ Icon, title, text }) => <div key={title} className="border-t border-border pt-6">
              <Icon className="h-7 w-7 text-primary mb-5" aria-hidden="true" />
              <h3 className="font-serif text-2xl mb-3">{title}</h3>
              <p className="text-muted-foreground">{text}</p>
            </div>)}
          </div>
        </div>
      </section>

      <section className="section-padding bg-charcoal">
        <div className="container-luxury">
          <span className="eyebrow mb-4">{L('Notre accompagnement', 'Our support')}</span>
          <h2 className="text-section font-serif max-w-3xl mb-5">{L('Vous vous concentrez sur le contenu. ', 'You focus on the content. ')}<em>{L('Nous organisons le cadre.', 'We organise the setting.')}</em></h2>
          <p className="text-muted-foreground max-w-3xl mb-12">{L('Le programme pédagogique et les contenus sont définis avec votre organisation et vos formateurs. CHANY EVENT’S prend en charge l’organisation événementielle selon le périmètre convenu.', 'The learning programme and content are defined with your organisation and trainers. CHANY EVENT’S handles event organisation within the agreed scope.')}</p>
          <div className="grid md:grid-cols-2 gap-x-16 gap-y-8">
            {services.map(([title, text], index) => <div key={title} className="border-t border-border pt-5 flex gap-5">
              <span className="text-primary font-serif text-3xl shrink-0">{String(index + 1).padStart(2, '0')}</span>
              <div><h3 className="font-serif text-2xl mb-3">{title}</h3><p className="text-muted-foreground">{text}</p></div>
            </div>)}
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-luxury max-w-3xl text-center">
          <h2 className="text-section font-serif mb-5">{L('Préparons votre prochaine formation', 'Let’s prepare your next training event')}</h2>
          <p className="text-muted-foreground text-lg mb-8">{L('Présentez-nous votre public, vos objectifs, vos dates et le nombre de participants envisagé.', 'Tell us about your audience, objectives, dates and expected number of participants.')}</p>
          <Button asChild size="lg" className="h-auto py-4 whitespace-normal"><Link to="/contact#projet">{L('Organiser une formation', 'Plan a training event')}<ArrowRight aria-hidden="true" /></Link></Button>
        </div>
      </section>
    </Layout>
  );
};

export default TrainingEvents;