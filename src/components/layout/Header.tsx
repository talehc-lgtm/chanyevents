import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Globe, ChevronDown } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import logoChanyEvents from '@/assets/logo-chany-events.png';

type NavItem = { href: string; label: string; children?: { href: string; label: string }[] };

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
  useEffect(() => { setOpen(false); }, [location.pathname, location.hash]);

  const nav: NavItem[] = [
    { href: '/', label: t('nav.home') },
    { href: '/business-events', label: 'Business Events', children: [
      { href: '/business-events#salons', label: L('Foires & Salons', 'Trade Fairs & Shows') },
      { href: '/business-events#conferences', label: L('Conférences & Sommets', 'Conferences & Summits') },
      { href: '/business-events#b2b', label: 'B2B & Business Matching' },
      { href: '/business-events#missions', label: L('Missions économiques', 'Trade Missions') },
      { href: '/business-events#roadshows', label: 'Roadshows' },
      { href: '/business-events#pavillons', label: L('Pavillons & Expositions', 'Pavilions & Exhibitions') },
      { href: '/business-events#investment', label: 'Investment Events' },
    ] },
    { href: '/corporate-institutional', label: 'Corporate & Institutional', children: [
      { href: '/corporate-institutional#corporate', label: 'Corporate Events' },
      { href: '/corporate-institutional#institutionnel', label: L('Événements institutionnels', 'Institutional Events') },
      { href: '/corporate-institutional#diplomatique', label: L('Événements diplomatiques', 'Diplomatic Events') },
      { href: '/corporate-institutional#delegations', label: L('Délégations', 'Delegations') },
      { href: '/corporate-institutional#lancements', label: L('Lancements & inaugurations', 'Launches & Inaugurations') },
    ] },
    { href: '/services', label: t('nav.services') },
    { href: '/weddings', label: 'Weddings' },
    { href: '/portfolio', label: t('nav.portfolio') },
    { href: '/about', label: t('nav.about') },
    { href: '/contact', label: t('nav.contact') },
  ];

  const active = (h: string) => location.pathname === h;

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled ? 'bg-background/95 backdrop-blur-md border-b border-border shadow-[0_6px_24px_-18px_hsl(var(--ink)/0.35)]' : 'bg-background/80 backdrop-blur-sm'}`}>
      <div className="max-w-[1440px] mx-auto">
        <nav className="flex items-center justify-between h-20 px-6 xl:px-10 gap-6">
          <Link to="/" className="shrink-0">
            <span className="flex h-14 w-40 xl:w-48 items-center overflow-hidden">
              <img src={logoChanyEvents} alt="CHANY EVENT'S" className="h-full w-full object-contain object-left" />
            </span>
          </Link>

          <div className="hidden xl:flex items-center gap-6">
            {nav.map((n) => (
              <div key={n.href} className="relative group">
                <Link to={n.href} className={`flex items-center gap-1 text-[13px] font-medium tracking-wide uppercase transition-colors py-7 ${active(n.href) ? 'text-primary' : 'text-foreground/80 hover:text-primary'}`}>
                  {n.label}{n.children && <ChevronDown className="w-3.5 h-3.5" />}
                </Link>
                {n.children && (
                  <div className="absolute left-0 top-full pt-0 invisible opacity-0 translate-y-1 group-hover:visible group-hover:opacity-100 group-hover:translate-y-0 transition-all">
                    <div className="min-w-64 bg-card border border-border rounded-sm shadow-[var(--shadow-elegant)] py-3">
                      {n.children.map((c) => (
                        <Link key={c.href} to={c.href} className="block px-5 py-2 text-sm text-foreground/80 hover:text-primary hover:bg-charcoal">{c.label}</Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="hidden xl:flex items-center gap-5">
            <button onClick={() => setLanguage(fr ? 'en' : 'fr')} className="flex items-center gap-1.5 text-sm text-foreground/80 hover:text-primary">
              <Globe className="w-4 h-4" />{language.toUpperCase()}
            </button>
            <Link to="/contact#projet" className="px-5 py-2.5 bg-primary text-primary-foreground rounded-sm text-sm font-semibold hover-gold-glow whitespace-nowrap">
              {L('Démarrer un projet', 'Start a project')}
            </Link>
          </div>

          <button onClick={() => setOpen(!open)} className="xl:hidden p-2 text-foreground" aria-label="Menu">
            {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </nav>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="xl:hidden bg-background border-b border-border max-h-[calc(100vh-5rem)] overflow-y-auto">
            <div className="px-6 py-6 space-y-1">
              {nav.map((n) => (
                <div key={n.href}>
                  <div className="flex items-center justify-between">
                    <Link to={n.href} className={`block py-2.5 text-lg ${active(n.href) ? 'text-primary' : 'text-foreground/85'}`}>{n.label}</Link>
                    {n.children && (
                      <button onClick={() => setMobileSub(mobileSub === n.href ? null : n.href)} className="p-2" aria-label="Sous-menu">
                        <ChevronDown className={`w-5 h-5 transition-transform ${mobileSub === n.href ? 'rotate-180' : ''}`} />
                      </button>
                    )}
                  </div>
                  {n.children && mobileSub === n.href && (
                    <div className="pl-4 border-l border-border mb-2">
                      {n.children.map((c) => <Link key={c.href} to={c.href} className="block py-2 text-muted-foreground">{c.label}</Link>)}
                    </div>
                  )}
                </div>
              ))}
              <Link to="/careers" className="block py-2.5 text-lg text-foreground/85">{t('nav.careers')}</Link>
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
