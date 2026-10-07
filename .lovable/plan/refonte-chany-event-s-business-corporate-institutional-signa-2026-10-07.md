# Refonte CHANY EVENT'S — Business, Corporate, Institutional & Signature Events

Repositionnement complet du site autour des événements d'affaires en Afrique, en gardant le style lumineux actuel (ivoire, beige, anthracite, bleu du logo en touches, Bodoni Moda + Manrope), toutes les fonctions existantes (devis, contact, casting, espace admin, WhatsApp) et le bilingue FR/EN.

## Nouveau menu

```text
Accueil | Business Events ▾ | Corporate & Institutionnel ▾ | Services | Weddings & Signature | Réalisations | L'Agence | Contacts   [Démarrer un projet]
```
- Menus déroulants sur ordinateur, menu en accordéon sur téléphone.
- « Casting » est conservé dans le pied de page et dans le menu mobile (il n'est pas dans le menu du brief).
- Le bouton « Démarrer un projet » mène au nouveau formulaire projet.

## Pages

1. **Accueil** — grande photo corporate fixe (plus de diaporama), titre « We design events that move business forward. », zones « Central Africa • West Africa • East Africa », 2 boutons. Puis : promesse « De la réflexion à l'exécution » + « Confiez-nous tout. Ou simplement la partie qui vous manque. », 8 familles d'expertises, bloc Business Events (connexions, leads, contrats…), processus en 7 étapes (Understand → Measure) animé au défilement, Africa Event Partner avec carte stylisée des 3 zones et liste des pays, « Who we work with » + « International companies entering Africa », grille de 25 secteurs, chiffres validés (+50, 15+, 250+, 1,000+), In Vino Italia à la une, bloc Weddings séparé (~20 % de la page), appel final.
2. **Business Events** (une page, sections ancrées) — Foires & Salons, Conférences & Sommets, B2B & Business Matching (processus en 9 étapes, Hosted Buyers…), Missions économiques, Roadshows, Pavillons & Expositions, Investment Events.
3. **Corporate & Institutionnel** (une page, sections ancrées) — Corporate events, institutionnels, diplomatiques, Delegation Management, lancements & inaugurations.
4. **Services** — les 9 pôles du brief, chacun avec ses prestations détaillées (liste transversale complète).
5. **Weddings & Signature Events** — nouvelle page élégante avec les photos mariage existantes, « Vos moments personnels méritent la même exigence. »
6. **Réalisations** — « Selected Work » : fiches projet (nom, client, pays, ville, année, type, participants, mission, résultats) + filtres Business / Corporate / Institutional / Conferences / Trade Shows / Weddings. In Vino Italia en tête. Les champs non connus restent vides, rien n'est inventé.
7. **L'Agence** — histoire existante conservée, nouvelle phase panafricaine, 8 valeurs en présentation moderne.
8. **Contacts / Démarrer un projet** — formulaire projet complet (organisation, fonction, pays, ville, type, date, participants, budget, « De quoi avez-vous besoin ? » à choix multiples, message), bouton « Tell us about your project ». Les demandes arrivent dans l'onglet « Demandes de devis » de l'espace admin, qui affichera les nouveaux champs. L'ancienne page Devis renvoie vers ce formulaire.

## Points d'attention
- **Traduction & interprétation** : vous l'aviez retirée, le brief demande de la remettre. Je la remets comme prestation dans Services, Missions et Délégations, sauf avis contraire.
- **Photos** : le site n'a presque pas de photos de conférences ou de salons. Je générerai des visuels corporate (conférence, salon, réunion B2B, délégation) pour l'accueil et les pages business, à remplacer plus tard par vos vraies photos.
- **Chiffres et pays** : seuls les chiffres validés sont affichés ; les pays sont présentés comme « capacité d'intervention / réseau de partenaires », jamais comme des bureaux.
- Titres et descriptions de référencement propres à chaque page, images chargées à la demande.

## Détails techniques
- Nouvelles routes : `/business-events`, `/corporate-institutional`, `/weddings`; `/quote` redirige vers `/contact`.
- Contenus FR/EN dans des fichiers de contenu par page (objets `{fr, en}`) plutôt que dans LanguageContext, pour garder la traduction gérable.
- Migration : ajout de colonnes à `quote_requests` (organization, job_title, country, city, needs text[]), lecture côté admin.
- Petit composant SEO (title/description par page via `document.title` + meta).
- Animations Framer Motion `whileInView` légères ; carte d'Afrique en SVG simple.
