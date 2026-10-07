import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';

/** Bilingual helper: pick FR or EN string. */
export const useL = () => {
  const { language } = useLanguage();
  return (fr: string, en: string) => (language === 'fr' ? fr : en);
};

export const Seo: React.FC<{ title: string; description: string }> = ({ title, description }) => {
  useEffect(() => {
    document.title = title;
    let m = document.querySelector('meta[name="description"]');
    if (!m) { m = document.createElement('meta'); m.setAttribute('name', 'description'); document.head.appendChild(m); }
    m.setAttribute('content', description);
  }, [title, description]);
  return null;
};

export const Reveal: React.FC<{ children: React.ReactNode; delay?: number; className?: string }> = ({ children, delay = 0, className }) => (
  <motion.div
    initial={{ opacity: 0, y: 24 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: '-60px' }}
    transition={{ duration: 0.7, delay, ease: [0.2, 0.7, 0.2, 1] }}
    className={className}
  >
    {children}
  </motion.div>
);

export const PageHero: React.FC<{ eyebrow: string; title: React.ReactNode; lead: string; image: string; alt: string }> = ({ eyebrow, title, lead, image, alt }) => (
  <section className="relative pt-32 md:pt-40 pb-16 md:pb-24 bg-gradient-to-b from-charcoal to-background overflow-hidden">
    <div className="container-luxury px-6 md:px-12 grid lg:grid-cols-12 gap-10 lg:gap-14 items-center">
      <Reveal className="lg:col-span-6">
        <span className="eyebrow mb-6">{eyebrow}</span>
        <h1 className="text-display font-serif text-foreground mt-6 mb-6">{title}</h1>
        <p className="text-lead text-muted-foreground max-w-xl">{lead}</p>
      </Reveal>
      <Reveal delay={0.15} className="lg:col-span-6">
        <div className="frame-offset rounded-sm">
          <img src={image} alt={alt} className="w-full aspect-[4/3] object-cover rounded-sm shadow-[var(--shadow-elegant)]" />
        </div>
      </Reveal>
    </div>
  </section>
);

export const Chips: React.FC<{ items: string[] }> = ({ items }) => (
  <ul className="flex flex-wrap gap-2">
    {items.map((i) => (
      <li key={i} className="px-3 py-1.5 text-sm border border-border rounded-full bg-card text-foreground/80">{i}</li>
    ))}
  </ul>
);

/** Split anchored section: title + text on one side, chips/list on the other. */
export const Feature: React.FC<{
  id?: string; index?: string; title: string; text: string; items: string[]; image?: string; reverse?: boolean; tone?: boolean;
}> = ({ id, index, title, text, items, image, reverse, tone }) => (
  <section id={id} className={`section-padding scroll-mt-24 ${tone ? 'bg-charcoal' : ''}`}>
    <div className={`container-luxury grid lg:grid-cols-12 gap-10 lg:gap-16 items-center`}>
      <Reveal className={`lg:col-span-6 ${reverse ? 'lg:order-2' : ''}`}>
        {index && <span className="font-serif text-5xl text-primary/30 block mb-2">{index}</span>}
        <h2 className="text-section font-serif text-foreground mb-5">{title}</h2>
        <p className="text-muted-foreground text-lg mb-8 max-w-xl">{text}</p>
        <Chips items={items} />
      </Reveal>
      {image && (
        <Reveal delay={0.1} className={`lg:col-span-6 ${reverse ? 'lg:order-1' : ''}`}>
          <img src={image} alt={title} loading="lazy" className="w-full aspect-[5/4] object-cover rounded-sm shadow-[var(--shadow-elegant)]" />
        </Reveal>
      )}
    </div>
  </section>
);

export const CtaBand: React.FC<{ title: string; text: string; button: string; to: string }> = ({ title, text, button, to }) => (
  <section className="section-padding">
    <Reveal className="container-luxury text-center max-w-3xl">
      <h2 className="text-section font-serif text-foreground mb-5">{title}</h2>
      <p className="text-lead text-muted-foreground mb-8">{text}</p>
      <a href={to} className="inline-flex items-center px-8 py-4 bg-primary text-primary-foreground rounded-sm font-semibold hover-gold-glow">{button}</a>
    </Reveal>
  </section>
);
