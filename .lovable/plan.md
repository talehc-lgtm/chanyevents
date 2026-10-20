# Espace privé de casting CHANY EVENTS

## Périmètre
Remplacer l’interface de notation simple par un espace privé complet en français, sans modifier les offres ni le formulaire public de candidature. Conserver les données de casting déjà enregistrées : les anciennes notes resteront identifiées comme historiques et ne seront pas converties artificiellement en notes sur 100.

## Écrans et parcours
- **Tableau de bord** : choix de l’événement, compteurs de présence, évaluations, décisions et postes à pourvoir.
- **Candidats** : inscription rapide, fiche personne réutilisable, candidature par événement, numéro CH-001, recherche et filtres. Signalement des doublons par téléphone sans suppression automatique. Photos et CV facultatifs et privés.
- **File de passage** : arrivée horodatée, ordre de passage, affectation au jury et suivi des statuts. Vue d’attente sans coordonnées personnelles.
- **Évaluations** : une candidate à la fois, dix critères sur 100, niveaux 0–5, points en direct, commentaires, tests pratiques et chronomètre facultatif. Brouillons sauvegardés avec confirmation, validation complète et verrouillage.
- **Classement** : moyenne des évaluations validées uniquement, résultat provisoire, moyennes par critère, écarts entre jurés et alertes métier/disponibilité. Recommandation distincte de la décision de l’administrateur, avec motif en cas d’écart.
- **Affectations** : postes, quotas, réservistes, journées et créneaux ; alertes de conflits et d’indisponibilité.
- **Paramètres** : événements, grilles versionnées, nombre de jurés requis, membres et rôles, archivage et journal des actions.

## Premier événement
**Casting IN VINO ITALIA DOUALA 2026**, le 21 octobre 2026 à 14 h, aux Bureaux DAS, Bépanda Axe Lourd, Douala. Mission du 26 au 28 novembre 2026 au SOAHO Douala Airport Hotel. Dates et heures interprétées dans le fuseau Africa/Douala ; informations modifiables.

## Accès et confidentialité
Réutiliser la connexion existante. Chaque juré dispose de son propre compte ; l’administrateur attribue les accès aux événements. L’accueil gère les inscriptions, dossiers et présences ; le jury saisit ses propres notes ; l’administrateur configure, décide et exporte. Les protections sont vérifiées côté serveur. Les jurés ne voient pas les notes des autres avant de valider leur propre évaluation. Les coordonnées et notes administratives sont limitées aux personnes autorisées.

## Présentation
Espace privé clair, blanc/gris léger, bordeaux et touches dorées discrètes, police sans-serif lisible et logo CHANY EVENTS existant. Navigation simple, grands contrôles tactiles, tableaux sur ordinateur et fiches sur téléphone. Le design public reste inchangé.

## Exports
Fiche candidat et grille A4 en PDF ; classement et listes des retenus/réservistes en Excel ; présence imprimable et planning par poste/journée. Tous reprennent les filtres, le nom de l’événement et la date d’édition, sans informations de connexion.

## Détails techniques
- Stockage persistant séparant événements, personnes, candidatures, disponibilités, postes, versions de grilles, évaluations individuelles, affectations et journal.
- Actions privées protégées par session et rôles côté serveur ; accès aux fichiers privés autorisé au cas par cas.
- Calculs centralisés et testés : pondération, consolidation, recommandations, critères obligatoires, seuils accueil/consignes, disponibilité et conflits.
- Grille verrouillée dès le premier brouillon ; évaluations validées réouvrables uniquement par l’administrateur avec motif journalisé.
- Aucun changement des règles de sélection du formulaire public ni notification automatique aux candidats.

## Vérification
Tester 100/100 pour tous les niveaux à 5, 60/100 à 3, le zéro réel, le refus d’une validation incomplète, la moyenne 70/90 = 80 et l’exclusion des brouillons. Tester les seuils, les conflits, les droits de chaque rôle, la persistance après actualisation et la concordance des exports. Fournir des données fictives clairement marquées avec suppression dédiée, puis vérifier les parcours inscription, accueil, jury, classement et affectation.