export const formations = [
        {
                id: "form-1",
                customId: "data-science-fondamentaux",
                title: "Fondamentaux de la Data Science",
                tagline: "Comprenez la chaîne de valeur des données et créez vos premiers modèles prédictifs.",
                description:
                        "Cette formation intensive vous guide à travers l'ensemble du cycle de vie d'un projet data : collecte, préparation, exploration et modélisation.\nVous mettrez en place un pipeline complet en moins de trois jours.",
                image: "https://images.unsplash.com/photo-1523475472560-d2df97ec485c?auto=format&fit=crop&w=1200&q=80",
                rating: 4.8,
                duration: "3 jours",
                code: "DS-101",
                certification: "Certification Skylonis - Data Analyst Junior",
                price: 1490,
                link: "https://www.skylonis.com/contact",
                pdf: "https://wavefilesystem.s3.eu-west-3.amazonaws.com/cours/data-science-fondamentaux.pdf",
                objectives: [
                        "Identifier les étapes clés d'un projet data",
                        "Nettoyer et structurer des jeux de données hétérogènes",
                        "Construire et évaluer un modèle supervisé avec scikit-learn",
                ],
                audience:
                        "Cette formation s'adresse aux équipes métiers, chefs de projet et profils techniques souhaitant comprendre la valeur des données dans leur organisation.",
                prerequisites: [
                        "Notions de logique ou d'algorithmie",
                        "Aisance avec Excel ou un outil de reporting",
                ],
                modalities:
                        "Alternance d'apports théoriques, d'ateliers pratiques en petits groupes et de séances d'analyse collective.\nAccès à une plateforme d'entraînement pendant 30 jours après la session.",
                programme: [
                        {
                                title: "Jour 1 — Architecture d'un projet data",
                                duration: "1 jour",
                                objectives: [
                                        "Comprendre les rôles d'une équipe data",
                                        "Cartographier les sources de données",
                                ],
                                exercises: [
                                        "Atelier : cadrage d'un use case",
                                        "Manipulation d'un data lake simplifié",
                                ],
                        },
                        {
                                title: "Jour 2 — Préparation et exploration des données",
                                duration: "1 jour",
                                objectives: [
                                        "Nettoyer, normaliser et enrichir un jeu de données",
                                        "Identifier des signaux métier avec des visualisations avancées",
                                ],
                                exercises: [
                                        "Notebook : préparation automatisée",
                                        "Challenge : storytelling avec des données",
                                ],
                        },
                        {
                                title: "Jour 3 — Modélisation et industrialisation",
                                duration: "1 jour",
                                objectives: [
                                        "Choisir un algorithme supervisé pertinent",
                                        "Mettre en place une veille et un monitoring du modèle",
                                ],
                                exercises: [
                                        "Atelier : entraînement et tuning",
                                        "Déploiement d'un modèle sur un espace collaboratif",
                                ],
                        },
                ],
                sessions: [
                        {
                                date: "15/01/2025",
                                city: "Paris",
                                price: 1490,
                                link: "https://www.skylonis.com/contact",
                        },
                        {
                                date: "12/03/2025",
                                city: "Lyon",
                                price: 1490,
                                link: "https://www.skylonis.com/contact",
                        },
                ],
        },
        {
                id: "form-2",
                customId: "devops-essentiels",
                title: "DevOps & Automatisation",
                tagline: "Déployer plus vite et en toute sécurité grâce aux bonnes pratiques DevOps.",
                description:
                        "Mettez en place une chaîne CI/CD complète, de la gestion du code source au monitoring de production.\nVous apprendrez à industrialiser vos applications cloud native.",
                image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80",
                rating: 4.7,
                duration: "4 jours",
                code: "DV-204",
                certification: "Badge Skylonis - DevOps Practitioner",
                price: 1890,
                link: "https://www.skylonis.com/contact",
                pdf: "https://wavefilesystem.s3.eu-west-3.amazonaws.com/cours/devops-essentiels.pdf",
                objectives: [
                        "Structurer une chaîne d'intégration continue",
                        "Déployer automatiquement sur un cluster Kubernetes",
                        "Sécuriser la supply chain applicative",
                ],
                audience: "Ingénieurs logiciels, administrateurs systèmes et chefs de projet technique.",
                prerequisites: [
                        "Connaissances de base en Git",
                        "Notions de conteneurisation (Docker)",
                ],
                modalities:
                        "70 % de pratique : conception de pipelines, déploiement sur un cluster sandbox, étude de cas en binôme.\nSupport de cours illustré et tutoriels vidéo accessibles après la formation.",
                programme: [
                        {
                                title: "Jour 1 — Culture DevOps et pipelines CI",
                                duration: "1 jour",
                                objectives: ["Mettre en place une branche principale protégée", "Automatiser les tests unitaires"],
                                exercises: ["Pipeline GitHub Actions", "Analyse d'un lead time"],
                        },
                        {
                                title: "Jour 2 — Conteneurs & orchestrateurs",
                                duration: "1 jour",
                                objectives: ["Dockeriser une application", "Déployer sur Kubernetes"],
                                exercises: ["Helm chart minimal", "Autoscaling expérimental"],
                        },
                        {
                                title: "Jour 3 — Observabilité & sécurité",
                                duration: "1 jour",
                                objectives: ["Configurer Prometheus & Grafana", "Scanner une image conteneur"],
                                exercises: ["Alerting incident", "Durcissement supply chain"],
                        },
                        {
                                title: "Jour 4 — Atelier fil rouge",
                                duration: "1 jour",
                                objectives: ["Construire une pipeline bout en bout", "Automatiser un rollback"],
                                exercises: ["Rituel post-mortem", "Automatisation release"],
                        },
                ],
                sessions: [
                        {
                                date: "03/02/2025",
                                city: "Paris",
                                price: 1890,
                                link: "https://www.skylonis.com/contact",
                        },
                ],
        },
        {
                id: "form-3",
                customId: "ux-design-pro",
                title: "UX Design orienté produit",
                tagline: "Construisez des expériences mémorables en vous appuyant sur les données utilisateurs.",
                description:
                        "De la recherche utilisateur au prototypage haute fidélité, cette formation fournit une méthodologie complète et actionnable pour vos équipes produit.",
                image: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1200&q=80",
                rating: 4.9,
                duration: "3 jours",
                code: "UX-120",
                certification: "Certification Skylonis - UX Designer",
                price: 1590,
                link: "https://www.skylonis.com/contact",
                pdf: "https://wavefilesystem.s3.eu-west-3.amazonaws.com/cours/ux-design-pro.pdf",
                objectives: [
                        "Conduire des entretiens qualitatifs",
                        "Prioriser les besoins grâce aux personas",
                        "Prototyper et tester rapidement des parcours",
                ],
                audience: "Product designers, product managers et marketeurs souhaitant structurer leur démarche UX.",
                prerequisites: ["Aucun prérequis technique"],
                modalities:
                        "Mises en situation, co-design en ateliers et restitution filmée pour ancrer les apprentissages.\nAccompagnement individuel sur un cas réel proposé par les participants.",
                programme: [
                        {
                                title: "Jour 1 — Recherche utilisateur",
                                duration: "1 jour",
                                objectives: ["Planifier une démarche de recherche", "Identifier les biais et hypothèses"],
                                exercises: ["Grille d'entretien", "Analyse d'insights"],
                        },
                        {
                                title: "Jour 2 — Idéation & priorisation",
                                duration: "1 jour",
                                objectives: ["Construire des personas actionnables", "Prioriser avec l'impact mapping"],
                                exercises: ["Atelier persona", "Session ideation"],
                        },
                        {
                                title: "Jour 3 — Prototypage & tests",
                                duration: "1 jour",
                                objectives: ["Prototyper un parcours high fidelity", "Conduire un test utilisateur"],
                                exercises: ["Figma sprint", "Synthèse post-test"],
                        },
                ],
                sessions: [
                        {
                                date: "27/02/2025",
                                city: "Remote",
                                price: 1590,
                                link: "https://www.skylonis.com/contact",
                        },
                ],
        },
];

export const cursusList = [
        {
                _id: "cursus-web",
                Title: "Cursus Développeur Web Full Stack",
                tagline: "Maîtrisez la conception d'applications web modernes du front au back.",
                Description:
                        "Un parcours de douze semaines mêlant projets concrets, mentorat individuel et veille technologique. Vous construirez et déploierez une application complète toutes les deux semaines.",
                Rating: 4.9,
                Skills: ["React", "Node.js", "DevOps"],
                Objectifs: [
                        "Structurer un projet React de bout en bout",
                        "Concevoir une API Node.js sécurisée",
                        "Déployer et superviser une application sur le cloud",
                ],
                Prérequis: ["Bases de HTML/CSS", "Premières notions de programmation"],
                Modalités:
                        "12 semaines intensives (3 jours en présentiel, 2 jours en autonomie guidée).\nAccès à un mentor senior et à un canal Slack privé.",
                Content: [
                        {
                                title: "Sprint 1 — Fondamentaux du front",
                                duration: "2 semaines",
                                objectives: ["Prendre en main React 18", "Structurer le design system"],
                                exercises: ["Création d'un landing page responsive", "Audit d'accessibilité"],
                        },
                        {
                                title: "Sprint 3 — API et persistance",
                                duration: "2 semaines",
                                objectives: ["Modéliser une base de données", "Créer des endpoints REST sécurisés"],
                                exercises: ["Projet CRUD complet", "Tests automatisés"],
                        },
                        {
                                title: "Sprint 5 — Industrialisation",
                                duration: "2 semaines",
                                objectives: ["Mettre en place une pipeline CI/CD", "Superviser les performances"],
                                exercises: ["Monitoring applicatif", "Mise à l'échelle sur le cloud"],
                        },
                ],
                Image: "https://images.unsplash.com/photo-1517430816045-df4b7de11d1d?auto=format&fit=crop&w=1200&q=80",
        },
        {
                _id: "cursus-data",
                Title: "Cursus Data & IA",
                tagline: "Devenez spécialiste de l'exploitation de données et du machine learning.",
                Description:
                        "Un programme de dix semaines construit autour d'un projet fil rouge de prédiction. Vous mettrez en place des pipelines de traitement, des dashboards et des modèles avancés.",
                Rating: 4.8,
                Skills: ["Python", "Machine Learning", "DataViz"],
                Objectifs: [
                        "Constituer un data warehouse fiable",
                        "Automatiser une chaîne de machine learning",
                        "Piloter une stratégie data-driven",
                ],
                Prérequis: ["Connaissances SQL", "Notions statistiques"],
                Modalités:
                        "Format hybride : 2 jours en présentiel, 3 jours en distanciel accompagné.\nCoaching individuel et masterclass hebdomadaire avec un expert du secteur.",
                Content: [
                        {
                                title: "Module 1 — Data Engineering",
                                duration: "3 semaines",
                                objectives: ["Concevoir un pipeline d'ingestion", "Optimiser les performances d'une base"],
                                exercises: ["Implémentation d'un ETL", "Monitoring DataOps"],
                        },
                        {
                                title: "Module 2 — Machine Learning",
                                duration: "3 semaines",
                                objectives: ["Évaluer des modèles supervisés", "Industrialiser l'entraînement"],
                                exercises: ["Notebook collaboratif", "Déploiement d'une API ML"],
                        },
                        {
                                title: "Module 3 — Valorisation et gouvernance",
                                duration: "4 semaines",
                                objectives: ["Mettre en place une gouvernance data", "Définir des indicateurs métiers"],
                                exercises: ["Atelier dataviz", "Plan de gouvernance"],
                        },
                ],
                Image: "https://images.unsplash.com/photo-1534751516642-a1af1ef26a56?auto=format&fit=crop&w=1200&q=80",
        },
        {
                _id: "cursus-cyber",
                Title: "Cursus Cybersécurité Offensive",
                tagline: "Apprenez à auditer et défendre des infrastructures critiques.",
                Description:
                        "Huit semaines de simulations réalistes pour acquérir les réflexes d'un expert sécurité. Les participants alternent entre exercices d'attaque et stratégies de défense.",
                Rating: 4.7,
                Skills: ["Pentest", "SOC", "Gestion de crise"],
                Objectifs: [
                        "Mener un pentest méthodique",
                        "Déployer un SOC léger",
                        "Coordonner la réponse à incident",
                ],
                Prérequis: ["Administration système", "Connaissances réseau"],
                Modalités:
                        "Bootcamp intensif : 4 jours par semaine sur notre cyber-range, 1 jour dédié au retour d'expérience.\nAccès à des labs en ligne 24/7.",
                Content: [
                        {
                                title: "Phase 1 — Reconnaissance & exploitation",
                                duration: "3 semaines",
                                objectives: ["Collecter des informations", "Exploiter des vulnérabilités"],
                                exercises: ["Challenge CTF", "Reverse engineering"],
                        },
                        {
                                title: "Phase 2 — Défense & monitoring",
                                duration: "3 semaines",
                                objectives: ["Installer un SOC", "Gérer les alertes"],
                                exercises: ["Blue team exercise", "Hunt de menace"],
                        },
                        {
                                title: "Phase 3 — Gestion de crise",
                                duration: "2 semaines",
                                objectives: ["Construire un plan de réponse", "Communiquer avec les parties prenantes"],
                                exercises: ["Tabletop exercice", "Rétro-analyse d'incident"],
                        },
                ],
                Image: "https://images.unsplash.com/photo-1510511459019-5dda7724fd87?auto=format&fit=crop&w=1200&q=80",
        },
];
