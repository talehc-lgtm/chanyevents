import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Instagram, Facebook, Linkedin, MessageCircle } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useL } from '@/components/common/Blocks';
import logoChanyEvents from '@/assets/logo-chany-events.png';

const Footer: React.FC = () => {
  const { t } = useLanguage();
  const L = useL();
  const currentYear = new Date().getFullYear();

  const events = [
    { to: '/business-events', label: 'Business Events' },
    { to: '/corporate-institutional', label: 'Corporate & Institutional' },
    { to: '/weddings', label: 'Weddings & Signature Events' },
    { to: '/portfolio', label: t('nav.portfolio') },
  ];

  const agency = [
    { to: '/', label: t('nav.home') },
    { to: '/about', label: t('nav.about') },
    { to: '/services', label: t('nav.services') },
    { to: '/careers', label: t('nav.careers') },
    { to: '/contact', label: t('nav.contact') },
  ];

  const socials = [
    { href: 'https://instagram.com', Icon: Instagram, name: 'Instagram' },
    { href: 'https://facebook.com', Icon: Facebook, name: 'Facebook' },
    { href: 'https://linkedin.com', Icon: Linkedin, name: 'LinkedIn' },
  ];

  return (
    <footer className="bg-charcoal border-t border-border">
      <div aria-hidden="true" className="h-px w-full bg-gradient-to-r from-transparent via-primary/50 to-transparent" />

      <div className="container-luxury section-padding">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-12 lg:gap-8">
          {/* Brand */}
          <div className="lg:col-span-4">
            <Link to="/" className="mb-5 flex h-36 w-36 items-center justify-center overflow-hidden drop-shadow-[0_0_22px_hsl(var(--primary)/0.22)]">
              <img
                src={logoChanyEvents}
                alt="CHANY EVENT'S"
                className="h-full w-full object-contain"
              />
            </Link>
            <p className="text-muted-foreground text-lg mb-6 max-w-md">
              {t('footer.tagline')}
            </p>
            <div className="flex gap-3">
              {socials.map(({ href, Icon, name }) => (
                <a
                  key={name}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={name}
                  className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary transition-colors"
                >
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Events */}
          <div className="lg:col-span-3">
            <h4 className="font-serif text-lg text-foreground mb-6 pb-3 border-b border-border">
              {L('Événements', 'Events')}
            </h4>
            <ul className="space-y-3">
              {events.map((item) => (
                <li key={item.to + item.label}>
                  <Link to={item.to} className="text-muted-foreground hover:text-primary transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Agency */}
          <div className="lg:col-span-2">
            <h4 className="font-serif text-lg text-foreground mb-6 pb-3 border-b border-border">
              {L("L'Agence", 'Agency')}
            </h4>
            <ul className="space-y-3">
              {agency.map((item) => (
                <li key={item.to + item.label}>
                  <Link to={item.to} className="text-muted-foreground hover:text-primary transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="lg:col-span-3">
            <h4 className="font-serif text-lg text-foreground mb-6 pb-3 border-b border-border">Contact</h4>
            <ul className="space-y-4 text-muted-foreground">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 mt-1 text-primary flex-shrink-0" />
                <span>Yaoundé, Cameroun</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-primary flex-shrink-0" />
                <a href="tel:+237675788550" className="hover:text-primary transition-colors">+237 675 788 550</a>
              </li>
              <li className="flex items-center gap-3">
                <MessageCircle className="w-4 h-4 text-primary flex-shrink-0" />
                <a href="https://wa.me/237675788550" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">WhatsApp</a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-primary flex-shrink-0" />
                <a href="mailto:contacts@chanyevents.com" className="hover:text-primary transition-colors">contacts@chanyevents.com</a>
              </li>
            </ul>
            <Link
              to="/contact#projet"
              className="mt-7 inline-flex items-center text-primary font-semibold hover:underline underline-offset-4"
            >
              {L('Démarrer un projet', 'Start a project')}
            </Link>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-14 pt-8 border-t border-border flex flex-col md:flex-row md:items-center md:justify-between gap-4 text-center md:text-left">
          <p className="text-muted-foreground text-sm">
            © {currentYear} CHANY EVENT'S. {t('footer.rights')}.
          </p>
          <p className="text-muted-foreground text-sm">
            {L('Fondée par Mario Chany Nguetmi', 'Founded by Mario Chany Nguetmi')}
          </p>
          <p className="text-muted-foreground text-xs tracking-wide">
            Powered by{' '}
            <a
              href="https://www.irixcom.net"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary font-semibold hover:underline underline-offset-4"
            >
              IRIXCOM
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
