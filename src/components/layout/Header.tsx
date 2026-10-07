import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Globe, ChevronDown } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import logoChanyEvents from '@/assets/logo-chany-events.png';

type Sub = { href: string; label: string };
type MegaCol = { title: string; href: string; subs: Sub[]; feature?: { title: string; href: string; label: string } };
type NavItem = { href: string; label: string; mega?: MegaCol[] };

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [mobileSub, setMobileSub] = useState<string | null>(null);
  const { language, setLanguage, t } = useLanguage();
  const location = useLocation();
  const fr = language === 'fr';
  const L = (a: string, b: string) => (fr ? a : b);

  useEffect(() => {
    const h = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', h);
    return () => window.removeEventListener('scroll', h);
  }, []);
  useEffect(() => { setOpen(false); setMobileSub(null); }, [location.pathname, location.hash]);

  const nav: NavItem[] = [
    { href: '/', label: t('nav.home') },
    {
      href: '/business-events',
      label: L('Événements', 'Events'),
      mega: [
        {
          title: 'Business Events',
          href: '/business-events',
          subs: [
            { href: '/business-events#salons', label: L('Foires & Salons', 'Trade Fairs & Shows') },
            { href: '/business-events#conferences', label: L('Conférences & Sommets', 'Conferences & Summits') },
            { href: '/business-events#b2b', label: 'B2B & Business Matching' },
            { href: '/business-events#missions', label: L('Missions économiques', 'Trade Missions') },
            { href: '/business-events#roadshows', label: 'Roadshows' },
            { href: '/business-events#pavillons', label: L('Pavillons & Expositions', 'Pavilions & Exhibitions') },
            { href: '/business-events#investment', label: 'Investment Events' },
          ],
        },
        {
          title: L('Corporate & Institutionnel', 'Corporate & Institutional'),
          href: '/corporate-institutional',
          subs: [
            { href: '/corporate-institutional#corporate', label: 'Corporate Events' },
            { href: '/corporate-institutional#institutionnel', label: L('Événements institutionnels', 'Institutional Events') },
            { href: '/corporate-institutional#diplomatique', label: L('Événements diplomatiques', 'Diplomatic Events') },
            { href: '/corporate-institutional#delegations', label: L('Délégations', 'Delegations') },
            { href: '/corporate-institutional#lancements', label: L('Lancements & inaugurations', 'Launches & Inaugurations') },
          ],
          feature: { title: 'Private Event', href: '/weddings', label: 'Wedding Planning' },
        },
      ],
    },
    { href: '/services', label: t('nav.services') },
    { href: '/portfolio', label: t('nav.portfolio') },
    { href: '/about', label: t('nav.about') },
    { href: '/careers', label: t('nav.careers') },
    { href: '/contact', label: t('nav.contact') },
  ];

  const active = (h: string) => location.pathname === h;
  const eventsActive = ['/business-events', '/corporate-institutional', '/weddings'].includes(location.pathname);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled ? 'bg-background/95 backdrop-blur-md border-b border-border shadow-[0_6px_24px_-18px_hsl(var(--ink)/0.35)]' : 'bg-background/80 backdrop-blur-sm'}`}>
      <div className="max-w-[1440px] mx-auto">
        <nav className="flex items-center justify-between h-20 px-6 lg:px-10 gap-6">
          <Link to="/" className="shrink-0">
            <span className="flex h-14 w-40 xl:w-48 items-center overflow-hidden">
              <img src={logoChanyEvents} alt="CHANY EVENT'S" className="h-full w-full object-contain object-left" />
            </span>
          </Link>

          <div className="hidden lg:flex items-center gap-6">
            {nav.map((n) => (
              <div key={n.href} className="relative group">
                <Link to={n.href} className={`flex items-center gap-1 whitespace-nowrap text-[13px] font-medium tracking-wide uppercase transition-colors py-7 ${active(n.href) || (n.mega && eventsActive) ? 'text-primary' : 'text-foreground/80 hover:text-primary'}`}>
                  {n.label}{n.mega && <ChevronDown className="w-3.5 h-3.5" />}
                </Link>
                {n.mega && (
                  <div className="absolute left-1/2 -translate-x-1/2 top-full invisible opacity-0 translate-y-1 group-hover:visible group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                    <div className="bg-card border border-border rounded-sm shadow-[var(--shadow-elegant)] p-8 grid grid-cols-2 gap-10 w-[560px]">
                      {n.mega.map((col) => (
                        <div key={col.title}>
                          <Link to={col.href} className="block font-serif text-lg text-foreground hover:text-primary mb-4 pb-3 border-b border-border">{col.title}</Link>
                          <div className="space-y-1">
                            {col.subs.map((c) => (
                              <Link key={c.href} to={c.href} className="block px-1 py-1.5 text-sm text-foreground/75 hover:text-primary transition-colors">
                                {c.label}
                              </Link>
                            ))}
                            {col.feature && (
                              <Link to={col.feature.href} className="block mt-6 pt-5 border-t border-champagne/50 text-foreground hover:text-primary transition-colors">
                                <span className="block font-serif text-3xl leading-tight">{col.feature.title}</span>
                                <span className="block mt-2 text-sm font-semibold uppercase tracking-[0.12em] text-primary">{col.feature.label}</span>
                              </Link>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="hidden lg:flex items-center gap-4">
            <button onClick={() => setLanguage(fr ? 'en' : 'fr')} className="flex items-center gap-1.5 text-sm text-foreground/80 hover:text-primary">
              <Globe className="w-4 h-4" />{language.toUpperCase()}
            </button>
            <Link to="/contact#projet" className="hidden 2xl:inline-block px-5 py-2.5 bg-primary text-primary-foreground rounded-sm text-sm font-semibold hover-gold-glow whitespace-nowrap">
              {L('Démarrer un projet', 'Start a project')}
            </Link>
          </div>

          <button onClick={() => setOpen(!open)} className="lg:hidden p-2 text-foreground" aria-label="Menu">
            {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </nav>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="lg:hidden bg-background border-b border-border max-h-[calc(100vh-5rem)] overflow-y-auto">
            <div className="px-6 py-6 space-y-1">
              {nav.map((n) => (
                <div key={n.href}>
                  <div className="flex items-center justify-between">
                    <Link to={n.href} className={`block py-2.5 text-lg ${active(n.href) || (n.mega && eventsActive) ? 'text-primary' : 'text-foreground/85'}`}>{n.label}</Link>
                    {n.mega && (
                      <button onClick={() => setMobileSub(mobileSub === n.href ? null : n.href)} className="p-2" aria-label="Sous-menu">
                        <ChevronDown className={`w-5 h-5 transition-transform ${mobileSub === n.href ? 'rotate-180' : ''}`} />
                      </button>
                    )}
                  </div>
                  {n.mega && mobileSub === n.href && (
                    <div className="pl-4 border-l border-border mb-2 space-y-4">
                      {n.mega.map((col) => (
                        <div key={col.title}>
                          <Link to={col.href} className="block py-1 font-serif text-lg text-foreground">{col.title}</Link>
                          {col.subs.map((c) => (
                            <Link key={c.href} to={c.href} className="block py-1.5 text-muted-foreground">
                              {c.label}
                            </Link>
                          ))}
                          {col.feature && (
                            <Link to={col.feature.href} className="block mt-4 pt-4 border-t border-champagne/50 text-foreground">
                              <span className="block font-serif text-2xl leading-tight">{col.feature.title}</span>
                              <span className="block mt-1.5 text-sm font-semibold uppercase tracking-[0.12em] text-primary">{col.feature.label}</span>
                            </Link>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              <Link to="/contact#projet" className="block mt-4 text-center px-5 py-3 bg-primary text-primary-foreground rounded-sm font-semibold">{L('Démarrer un projet', 'Start a project')}</Link>
              <button onClick={() => setLanguage(fr ? 'en' : 'fr')} className="flex items-center gap-2 pt-4 text-sm text-foreground/80">
                <Globe className="w-4 h-4" />{fr ? 'English' : 'Français'}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
