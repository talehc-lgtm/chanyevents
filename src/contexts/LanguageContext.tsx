import React, { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'fr' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations: Record<Language, Record<string, string>> = {
  fr: {
    // Navigation
    'nav.home': 'Accueil',
    'nav.about': "L'Agence",
    'nav.services': 'Services',
    'nav.portfolio': 'Réalisations',
    'nav.quote': 'Devis',
    'nav.careers': 'Casting',
    'nav.contact': 'Contacts',
    
    // Hero
    'hero.subtitle': 'Agence Événementielle Premium',
    'hero.title': "L'Excellence au Service de Vos Événements",
    'hero.description': "Créons ensemble des moments d'exception. Du concept à la réalisation, nous transformons vos visions en expériences inoubliables.",
    'hero.cta.quote': 'Demander un Devis',
    'hero.cta.discover': 'Découvrir nos Services',
    
    // About
    'about.subtitle': 'Notre Histoire',
    'about.title': 'Une Vision, Une Passion',
    'about.description': "CHANY EVENT'S est née de la transformation d'Ebene Chany Agency, portée par la vision de Mario Chany Nguetmi. Notre mission : sublimer chaque événement avec élégance, professionnalisme et un sens aigu du détail.",
    'about.vision.title': 'Notre Vision',
    'about.vision.text': "Devenir la référence de l'événementiel premium en Afrique Centrale, en alliant excellence opérationnelle et créativité sans limites.",
    'about.values.title': 'Nos Valeurs',
    'about.values.elegance': 'Élégance',
    'about.values.excellence': 'Excellence',
    'about.values.human': 'Humain',
    'about.values.detail': 'Sens du Détail',
    
    // Services
    'services.subtitle': 'Nos Expertises',
    'services.title': 'Des Services Sur Mesure',
    'services.corporate.title': 'Événements Corporate',
    'services.corporate.desc': 'Conférences, séminaires, team building, lancements de produits — nous créons des expériences professionnelles mémorables.',
    'services.weddings.title': 'Mariages & Célébrations',
    'services.weddings.desc': "Du romantique à l'extravagant, nous orchestrons le plus beau jour de votre vie avec passion et précision.",
    'services.vip.title': 'Événements VIP',
    'services.vip.desc': 'Galas, soirées privées, réceptions exclusives — un service discret et irréprochable pour une clientèle exigeante.',
    'services.fairs.title': 'Salons & Foires',
    'services.fairs.desc': 'Conception, logistique et animation de stands et espaces événementiels pour maximiser votre impact.',
    'services.staffing.title': 'Personnel Événementiel',
    'services.staffing.desc': "Hôtesses, stewards, mannequins et figurants qualifiés pour représenter votre marque avec excellence.",
    
    // Portfolio
    'portfolio.subtitle': 'Nos Réalisations',
    'portfolio.title': "L'Art de l'Événement",
    'portfolio.view': 'Voir le projet',
    
    // Quote
    'quote.subtitle': 'Votre Projet',
    'quote.title': 'Demandez Votre Devis',
    'quote.description': 'Partagez votre vision, nous la concrétisons. Remplissez ce formulaire détaillé pour recevoir une proposition personnalisée.',
    'quote.name': 'Nom complet',
    'quote.email': 'Email',
    'quote.phone': 'Téléphone',
    'quote.company': 'Entreprise (optionnel)',
    'quote.eventType': "Type d'événement",
    'quote.eventDate': "Date souhaitée",
    'quote.guests': "Nombre d'invités",
    'quote.budget': 'Budget estimé',
    'quote.location': 'Lieu souhaité',
    'quote.details': 'Décrivez votre projet',
    'quote.submit': 'Envoyer ma demande',
    'quote.success': 'Merci ! Votre demande a été envoyée. Nous vous contacterons sous 24h.',
    
    // Contact
    'contact.subtitle': 'Parlons de Votre Projet',
    'contact.title': 'Contactez-Nous',
    'contact.description': "Nous sommes à votre écoute. Contactez-nous pour discuter de votre projet ou prendre rendez-vous.",
    'contact.name': 'Votre nom',
    'contact.email': 'Votre email',
    'contact.message': 'Votre message',
    'contact.send': 'Envoyer',
    'contact.whatsapp': 'Discuter sur WhatsApp',
    'contact.appointment': 'Prendre rendez-vous',
    'contact.locations': 'Nos Implantations',
    
    // Footer
    'footer.tagline': "L'excellence événementielle au cœur de l'Afrique",
    'footer.rights': 'Tous droits réservés',
    
    // CTA
    'cta.title': 'Prêt à Créer Quelque Chose d\'Extraordinaire ?',
    'cta.description': 'Chaque grand événement commence par une conversation. Partagez votre vision avec nous.',
    'cta.button': 'Commencer Votre Projet',
  },
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.about': 'The Agency',
    'nav.services': 'Services',
    'nav.portfolio': 'Portfolio',
    'nav.quote': 'Quote',
    'nav.careers': 'Careers',
    'nav.contact': 'Contacts',
    
    // Hero
    'hero.subtitle': 'Premium Event Agency',
    'hero.title': 'Excellence at the Service of Your Events',
    'hero.description': "Let's create exceptional moments together. From concept to execution, we transform your visions into unforgettable experiences.",
    'hero.cta.quote': 'Request a Quote',
    'hero.cta.discover': 'Discover Our Services',
    
    // About
    'about.subtitle': 'Our Story',
    'about.title': 'A Vision, A Passion',
    'about.description': "CHANY EVENT'S was born from the transformation of Ebene Chany Agency, driven by the vision of Mario Chany Nguetmi. Our mission: to elevate every event with elegance, professionalism, and a keen attention to detail.",
    'about.vision.title': 'Our Vision',
    'about.vision.text': 'To become the reference for premium events in Central Africa, combining operational excellence and limitless creativity.',
    'about.values.title': 'Our Values',
    'about.values.elegance': 'Elegance',
    'about.values.excellence': 'Excellence',
    'about.values.human': 'Human Touch',
    'about.values.detail': 'Attention to Detail',
    
    // Services
    'services.subtitle': 'Our Expertise',
    'services.title': 'Tailored Services',
    'services.corporate.title': 'Corporate Events',
    'services.corporate.desc': 'Conferences, seminars, team building, product launches — we create memorable professional experiences.',
    'services.weddings.title': 'Weddings & Celebrations',
    'services.weddings.desc': 'From romantic to extravagant, we orchestrate the most beautiful day of your life with passion and precision.',
    'services.vip.title': 'VIP Events',
    'services.vip.desc': 'Galas, private parties, exclusive receptions — discreet and impeccable service for discerning clients.',
    'services.fairs.title': 'Trade Shows & Fairs',
    'services.fairs.desc': 'Design, logistics, and animation of booths and event spaces to maximize your impact.',
    'services.staffing.title': 'Event Staffing',
    'services.staffing.desc': 'Qualified hostesses, stewards, models, and extras to represent your brand with excellence.',
    
    // Portfolio
    'portfolio.subtitle': 'Our Work',
    'portfolio.title': 'The Art of Events',
    'portfolio.view': 'View project',
    
    // Quote
    'quote.subtitle': 'Your Project',
    'quote.title': 'Request Your Quote',
    'quote.description': 'Share your vision, we make it happen. Fill out this detailed form to receive a personalized proposal.',
    'quote.name': 'Full name',
    'quote.email': 'Email',
    'quote.phone': 'Phone',
    'quote.company': 'Company (optional)',
    'quote.eventType': 'Event type',
    'quote.eventDate': 'Preferred date',
    'quote.guests': 'Number of guests',
    'quote.budget': 'Estimated budget',
    'quote.location': 'Preferred location',
    'quote.details': 'Describe your project',
    'quote.submit': 'Send my request',
    'quote.success': 'Thank you! Your request has been sent. We will contact you within 24 hours.',
    
    // Contact
    'contact.subtitle': "Let's Talk About Your Project",
    'contact.title': 'Contact Us',
    'contact.description': 'We are here to listen. Contact us to discuss your project or schedule an appointment.',
    'contact.name': 'Your name',
    'contact.email': 'Your email',
    'contact.message': 'Your message',
    'contact.send': 'Send',
    'contact.whatsapp': 'Chat on WhatsApp',
    'contact.appointment': 'Book an appointment',
    'contact.locations': 'Our Locations',
    
    // Footer
    'footer.tagline': 'Event excellence in the heart of Africa',
    'footer.rights': 'All rights reserved',
    
    // CTA
    'cta.title': 'Ready to Create Something Extraordinary?',
    'cta.description': 'Every great event starts with a conversation. Share your vision with us.',
    'cta.button': 'Start Your Project',
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('fr');

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
