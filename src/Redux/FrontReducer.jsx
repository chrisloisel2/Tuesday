import { createSlice } from "@reduxjs/toolkit";
import { FaAngular, FaApple, FaWindows, FaJava, FaMobileAlt, FaPython, FaBrain, FaChartBar, FaCloud, FaCode, FaCodeBranch, FaCogs, FaDatabase, FaMicrochip, FaMobile, FaReact, FaRobot, FaServer, FaShieldAlt } from "react-icons/fa";

const colors = ["#FF6B6B", "#FFD93D", "#6BCB77", "#4D96FF", "#9B5DE5"];

const FrontReducer = createSlice({
	name: "item",
	initialState: {
		status: "idle",
		cursus: [
			{
				id: "webdev-angular",
				title: "Cursus Fullstack Angular & Node.js",
				description:
					"Découvrez le développement web complet avec Angular, Node.js et les meilleures pratiques back-end.",
				icon: FaAngular,
				data: {
					children: [
						{
							name: "Frontend",
							children: [
								{ name: "Angular", value: 4, link: "https://angular.io/docs" },
								{ name: "Tailwind", value: 3, link: "https://tailwindcss.com/" },
								{ name: "RxJS", value: 4, link: "https://rxjs.dev/guide/overview" },
								{ name: "WebSockets", value: 3 },
							],
						},
						{
							name: "Deployment",
							children: [
								{ name: "AWS S3", value: 3 },
								{ name: "Netlify", value: 4 },
								{ name: "Vercel", value: 3 },
							],
						},
						{
							name: "Backend",
							children: [
								{ name: "Node.js", value: 4 },
								{ name: "Express.js", value: 3 },
								{ name: "NestJS", value: 3 },
							],
						},
						{
							name: "Database",
							children: [
								{ name: "MongoDB", value: 3 },
								{ name: "PostgreSQL", value: 3 },
								{ name: "Redis", value: 2 },
							],
						}
					],
				},
			},
			{
				id: "ai-machine-learning",
				title: "Cursus Intelligence Artificielle & Machine Learning",
				description:
					"Maîtrisez l'apprentissage automatique, les réseaux de neurones profonds et les techniques avancées d'IA pour résoudre des problèmes complexes.",
				icon: FaRobot,
				data: {
					children: [
						{
							name: "Fondamentaux IA",
							children: [
								{ name: "Python", value: 5, link: "https://docs.python.org/3/" },
								{ name: "NumPy", value: 4, link: "https://numpy.org/doc/" },
								{ name: "Pandas", value: 4, link: "https://pandas.pydata.org/docs/" },
								{ name: "Matplotlib", value: 3, link: "https://matplotlib.org/stable/contents.html" }
							],
						},
						{
							name: "Deep Learning",
							children: [
								{ name: "TensorFlow", value: 4, link: "https://www.tensorflow.org/learn" },
								{ name: "Keras", value: 4, link: "https://keras.io/" },
								{ name: "PyTorch", value: 3, link: "https://pytorch.org/docs/stable/index.html" },
								{ name: "CNNs, RNNs", value: 4 },
								{ name: "NLP avec Transformers", value: 4, link: "https://huggingface.co/docs" }
							],
						},
						{
							name: "MLOps & Déploiement",
							children: [
								{ name: "MLflow", value: 3, link: "https://mlflow.org/docs/latest/index.html" },
								{ name: "Docker", value: 4, link: "https://docs.docker.com/" },
								{ name: "FastAPI", value: 3, link: "https://fastapi.tiangolo.com/" },
								{ name: "TensorBoard", value: 3 },
							],
						},
						{
							name: "Cloud & Scalabilité",
							children: [
								{ name: "AWS SageMaker", value: 4 },
								{ name: "Azure ML Studio", value: 3 },
								{ name: "Google AI Platform", value: 3 },
							],
						}
					],
				},
			},
			{
				id: "backend-nodejs",
				title: "Cursus Backend Node.js & Microservices",
				description:
					"Apprenez à concevoir des applications backend performantes avec Node.js, Express et une architecture microservices.",
				icon: FaServer,
				data: {
					children: [
						{
							name: "Core Backend",
							children: [
								{ name: "Node.js", value: 5, link: "https://nodejs.org/en/docs/" },
								{ name: "Express.js", value: 4, link: "https://expressjs.com/fr/" },
								{ name: "NestJS", value: 4, link: "https://docs.nestjs.com/" },
								{ name: "GraphQL", value: 3, link: "https://graphql.org/learn/" }
							],
						},
						{
							name: "Architecture",
							children: [
								{ name: "Microservices", value: 4 },
								{ name: "Serverless", value: 3 },
								{ name: "API Gateway", value: 3 },
								{ name: "WebSockets", value: 4 }
							],
						},
						{
							name: "Bases de données",
							children: [
								{ name: "MongoDB", value: 4, link: "https://www.mongodb.com/docs/" },
								{ name: "PostgreSQL", value: 3, link: "https://www.postgresql.org/docs/" },
								{ name: "Redis", value: 3 },
							],
						},
						{
							name: "CI/CD",
							children: [
								{ name: "Jenkins", value: 3 },
								{ name: "GitHub Actions", value: 4, link: "https://docs.github.com/en/actions" },
								{ name: "Docker", value: 4 },
							],
						}
					],
				},
			},
			{
				id: "devops-expert",
				title: "Cursus DevOps & Cloud Engineering",
				description:
					"Devenez expert DevOps en maîtrisant Docker, Kubernetes, CI/CD, et les principales plateformes cloud.",
				icon: FaCogs,
				data: {
					children: [
						{
							name: "Conteneurisation",
							children: [
								{ name: "Docker", value: 5, link: "https://docs.docker.com/" },
								{ name: "Docker Compose", value: 4 },
							],
						},
						{
							name: "Orchestration",
							children: [
								{ name: "Kubernetes", value: 5, link: "https://kubernetes.io/docs/home/" },
								{ name: "Helm", value: 3 },
								{ name: "ArgoCD", value: 3 },
							],
						},
						{
							name: "CI/CD & Automatisation",
							children: [
								{ name: "Jenkins", value: 4 },
								{ name: "GitLab CI", value: 4 },
								{ name: "Terraform", value: 4, link: "https://developer.hashicorp.com/terraform/docs" },
							],
						},
						{
							name: "Cloud & Monitoring",
							children: [
								{ name: "AWS", value: 4 },
								{ name: "Azure", value: 3 },
								{ name: "Prometheus", value: 3 },
								{ name: "Grafana", value: 3 },
							],
						}
					],
				},
			},
			{
				id: "frontend-react",
				title: "Cursus Frontend React & Next.js",
				description:
					"Créez des applications web modernes avec React, Next.js, TailwindCSS et les meilleures pratiques UX/UI.",
				icon: FaReact,
				data: {
					children: [
						{
							name: "Frameworks & Libs",
							children: [
								{ name: "React", value: 5, link: "https://react.dev/learn" },
								{ name: "Next.js", value: 4, link: "https://nextjs.org/docs" },
								{ name: "TailwindCSS", value: 4 },
								{ name: "Redux Toolkit", value: 4 },
							],
						},
						{
							name: "Performance & SEO",
							children: [
								{ name: "Lighthouse", value: 3 },
								{ name: "SSR & SSG", value: 4 },
								{ name: "React Query", value: 3 },
							],
						},
						{
							name: "Testing & Qualité",
							children: [
								{ name: "Jest", value: 4 },
								{ name: "Testing Library", value: 3 },
								{ name: "Storybook", value: 3 },
							],
						},
						{
							name: "Déploiement",
							children: [
								{ name: "Vercel", value: 4 },
								{ name: "Netlify", value: 3 },
								{ name: "AWS Amplify", value: 4 },
							],
						}
					],
				},
			},
			{
				id: "data-science",
				title: "Cursus Data Science & Analyse de Données",
				description:
					"Apprenez à manipuler, analyser et visualiser des données en profondeur avec Python et des bibliothèques avancées.",
				icon: FaChartBar,
				data: {
					children: [
						{
							name: "Data Manipulation",
							children: [
								{ name: "Python", value: 5 },
								{ name: "Pandas", value: 5 },
								{ name: "NumPy", value: 4 },
							],
						},
						{
							name: "Analyse & Statistiques",
							children: [
								{ name: "SciPy", value: 4 },
								{ name: "Statistiques avancées", value: 4 },
								{ name: "Jupyter Notebooks", value: 4 },
							],
						},
						{
							name: "Visualisation",
							children: [
								{ name: "Matplotlib", value: 4 },
								{ name: "Seaborn", value: 3 },
								{ name: "Plotly", value: 3 },
							],
						},
						{
							name: "Machine Learning",
							children: [
								{ name: "Scikit-learn", value: 4 },
								{ name: "XGBoost", value: 3 },
								{ name: "LightGBM", value: 3 },
							],
						}
					],
				},
			},
			{
				id: "python-software-dev",
				title: "Cursus Développement Logiciel Python",
				description:
					"Apprenez à concevoir des applications robustes avec Python en explorant le développement logiciel, l'architecture, la gestion des dépendances et les tests.",
				icon: FaPython,
				data: {
					children: [
						{
							name: "Langage & Frameworks",
							children: [
								{ name: "Python 3+", value: 5, link: "https://docs.python.org/3/" },
								{ name: "Flask", value: 4, link: "https://flask.palletsprojects.com/en/3.0.x/" },
								{ name: "Django", value: 4, link: "https://docs.djangoproject.com/en/stable/" },
								{ name: "FastAPI", value: 3, link: "https://fastapi.tiangolo.com/" }
							],
						},
						{
							name: "Architecture & Patterns",
							children: [
								{ name: "Architecture MVC", value: 4 },
								{ name: "Clean Architecture", value: 3 },
								{ name: "Design Patterns (Singleton, Factory)", value: 4 },
							],
						},
						{
							name: "Tests & Qualité",
							children: [
								{ name: "PyTest", value: 4 },
								{ name: "Tox", value: 3 },
								{ name: "Coverage.py", value: 3 },
							],
						},
						{
							name: "Packaging & Déploiement",
							children: [
								{ name: "Docker", value: 4 },
								{ name: "Poetry", value: 3 },
								{ name: "AWS Lambda", value: 3 },
							],
						}
					],
				},
			},
			{
				id: "dotnet-software-engineering",
				title: "Cursus Développement Logiciel avec .NET et C#",
				description:
					"Devenez un ingénieur logiciel en maîtrisant C#, .NET Core, ASP.NET et les pratiques de développement d'applications évolutives.",
				icon: FaWindows,
				data: {
					children: [
						{
							name: "Langage & Frameworks",
							children: [
								{ name: "C#", value: 5, link: "https://learn.microsoft.com/en-us/dotnet/csharp/" },
								{ name: ".NET Core", value: 5 },
								{ name: "ASP.NET MVC", value: 4 },
								{ name: "Entity Framework Core", value: 4 },
							],
						},
						{
							name: "Architecture & APIs",
							children: [
								{ name: "RESTful APIs", value: 4 },
								{ name: "gRPC", value: 3 },
								{ name: "Clean Architecture", value: 4 },
							],
						},
						{
							name: "Tests & CI/CD",
							children: [
								{ name: "xUnit", value: 4 },
								{ name: "Azure DevOps Pipelines", value: 4 },
								{ name: "SonarQube", value: 3 },
							],
						},
						{
							name: "Déploiement Cloud",
							children: [
								{ name: "Azure App Services", value: 4 },
								{ name: "Docker", value: 4 },
								{ name: "Kubernetes (AKS)", value: 3 },
							],
						}
					],
				},
			},
			{
				id: "java-enterprise",
				title: "Cursus Développement Java pour Entreprise",
				description:
					"Apprenez à développer des applications Java robustes avec Spring Boot, Hibernate, et une architecture orientée microservices.",
				icon: FaJava,
				data: {
					children: [
						{
							name: "Langage & Frameworks",
							children: [
								{ name: "Java 17+", value: 5, link: "https://docs.oracle.com/en/java/" },
								{ name: "Spring Boot", value: 5, link: "https://spring.io/projects/spring-boot" },
								{ name: "Spring Security", value: 4 },
								{ name: "Hibernate", value: 4 },
							],
						},
						{
							name: "Architecture",
							children: [
								{ name: "Microservices", value: 4 },
								{ name: "REST & GraphQL APIs", value: 4 },
								{ name: "Reactive Programming (WebFlux)", value: 3 },
							],
						},
						{
							name: "Outils & Déploiement",
							children: [
								{ name: "Docker", value: 4 },
								{ name: "Maven", value: 4 },
								{ name: "Kubernetes (EKS)", value: 3 },
							],
						},
						{
							name: "Tests",
							children: [
								{ name: "JUnit 5", value: 4 },
								{ name: "Mockito", value: 3 },
							],
						}
					],
				},
			},
			{
				id: "kotlin-android",
				title: "Cursus Développement Mobile Kotlin pour Android",
				description:
					"Développez des applications mobiles performantes et modernes pour Android avec Kotlin et Jetpack Compose.",
				icon: FaMobileAlt,
				data: {
					children: [
						{
							name: "Langage & UI",
							children: [
								{ name: "Kotlin", value: 5, link: "https://kotlinlang.org/docs/home.html" },
								{ name: "Jetpack Compose", value: 4 },
								{ name: "Android SDK", value: 4 },
								{ name: "Material Design", value: 3 },
							],
						},
						{
							name: "Architecture",
							children: [
								{ name: "MVVM", value: 4 },
								{ name: "Koin (DI)", value: 3 },
								{ name: "Room (DB)", value: 3 },
							],
						},
						{
							name: "Tests & Performance",
							children: [
								{ name: "JUnit", value: 3 },
								{ name: "Espresso", value: 3 },
								{ name: "Firebase Performance", value: 3 },
							],
						},
						{
							name: "Déploiement",
							children: [
								{ name: "Google Play Store", value: 4 },
								{ name: "CI/CD avec GitHub Actions", value: 3 },
							],
						}
					],
				},
			},
			{
				id: "swift-ios-dev",
				title: "Cursus Développement iOS avec Swift",
				description:
					"Maîtrisez le développement iOS moderne en utilisant Swift, SwiftUI et les dernières technologies Apple.",
				icon: FaApple,
				data: {
					children: [
						{
							name: "Langage & UI",
							children: [
								{ name: "Swift 5+", value: 5, link: "https://swift.org/documentation/" },
								{ name: "SwiftUI", value: 4 },
								{ name: "UIKit", value: 4 },
							],
						},
						{
							name: "Architecture",
							children: [
								{ name: "MVVM", value: 4 },
								{ name: "Combine Framework", value: 3 },
								{ name: "CoreData", value: 3 },
							],
						},
						{
							name: "Tests & Sécurité",
							children: [
								{ name: "XCTest", value: 3 },
								{ name: "Keychain Services", value: 3 },
							],
						},
						{
							name: "Publication & Déploiement",
							children: [
								{ name: "TestFlight", value: 4 },
								{ name: "App Store Connect", value: 4 },
							],
						}
					],
				},
			},
			{
				id: "flutter-crossplatform",
				title: "Cursus Développement Mobile Flutter",
				description:
					"Créez des applications mobiles multi-plateformes avec Flutter et Dart, tout en garantissant des performances natives.",
				icon: FaMobile,
				data: {
					children: [
						{
							name: "Langage & UI",
							children: [
								{ name: "Dart", value: 5, link: "https://dart.dev/guides" },
								{ name: "Flutter SDK", value: 5, link: "https://docs.flutter.dev/" },
								{ name: "Material Design", value: 4 },
							],
						},
						{
							name: "Gestion de l'État",
							children: [
								{ name: "Provider", value: 4 },
								{ name: "Bloc", value: 3 },
								{ name: "Riverpod", value: 3 },
							],
						},
						{
							name: "Déploiement Multi-Plateforme",
							children: [
								{ name: "Android & iOS", value: 4 },
								{ name: "Web & Desktop", value: 3 },
								{ name: "Firebase Integration", value: 3 },
							],
						},
						{
							name: "Tests",
							children: [
								{ name: "Flutter Test", value: 3 },
								{ name: "Integration Tests", value: 3 },
							],
						}
					],
				},
			},
			{
				id: "cpp-embedded",
				title: "Cursus C++ pour Logiciel Embarqué",
				description:
					"Développez des logiciels embarqués performants en C++ en explorant la programmation bas niveau et les systèmes temps réel.",
				icon: FaMicrochip,
				data: {
					children: [
						{
							name: "Langage & Concepts",
							children: [
								{ name: "C++17/20", value: 5 },
								{ name: "Programmation Orientée Objet", value: 4 },
								{ name: "Gestion de la Mémoire", value: 4 },
							],
						},
						{
							name: "Développement Embarqué",
							children: [
								{ name: "RTOS (FreeRTOS)", value: 4 },
								{ name: "CMake", value: 3 },
								{ name: "Optimisation Temps Réel", value: 4 },
							],
						},
						{
							name: "Débogage & Tests",
							children: [
								{ name: "GDB", value: 3 },
								{ name: "Valgrind", value: 3 },
							],
						},
						{
							name: "Hardware & Protocoles",
							children: [
								{ name: "SPI, I2C, UART", value: 4 },
								{ name: "Raspberry Pi", value: 3 },
							],
						}
					],
				},
			},
			{
				id: "go-lang",
				title: "Cursus Développement Backend avec Go",
				description:
					"Concevez des applications backend ultra performantes avec Go, gRPC et une architecture orientée microservices.",
				icon: FaCodeBranch,
				data: {
					children: [
						{
							name: "Langage & Concurrence",
							children: [
								{ name: "Go (Golang)", value: 5, link: "https://go.dev/doc/" },
								{ name: "Goroutines", value: 4 },
								{ name: "Channels", value: 4 },
							],
						},
						{
							name: "Web & API",
							children: [
								{ name: "Gin Gonic", value: 4 },
								{ name: "gRPC", value: 3 },
								{ name: "Echo Framework", value: 3 },
							],
						},
						{
							name: "Tests & Déploiement",
							children: [
								{ name: "Go Test", value: 4 },
								{ name: "Docker", value: 4 },
								{ name: "CI/CD avec GitHub Actions", value: 3 },
							],
						},
						{
							name: "Cloud & Scalabilité",
							children: [
								{ name: "Google Cloud (GKE)", value: 4 },
								{ name: "AWS Lambda", value: 3 },
							],
						}
					],
				},
			},
			{
				id: "rust-systems",
				title: "Cursus Développement Systèmes avec Rust",
				description:
					"Maîtrisez Rust pour le développement de systèmes performants, sûrs et concurrents, en explorant les concepts avancés du langage.",
				icon: FaShieldAlt,
				data: {
					children: [
						{
							name: "Langage & Sécurité",
							children: [
								{ name: "Rust", value: 5, link: "https://doc.rust-lang.org/book/" },
								{ name: "Ownership & Borrowing", value: 5 },
								{ name: "Cargo & Crates.io", value: 4 },
							],
						},
						{
							name: "Systèmes & Performance",
							children: [
								{ name: "Asynchronous Programming", value: 4 },
								{ name: "Tokio Runtime", value: 3 },
								{ name: "WebAssembly (Wasm)", value: 3 },
							],
						},
						{
							name: "Testing & Déploiement",
							children: [
								{ name: "Rust Test", value: 4 },
								{ name: "Docker", value: 3 },
							],
						},
						{
							name: "Développement Web",
							children: [
								{ name: "Rocket Framework", value: 3 },
								{ name: "Actix Web", value: 3 },
							],
						}
					],
				},
			},
		],
		formations: [
			{
				"id": "1",
				"title": "Développement Web Full Stack",
				"description": "Apprenez à créer des applications web complètes avec React, Node.js, et MongoDB.",
				"duration": "12 semaines",
				"price": 1499,
				"rating": 4.8,
				"level": "Intermédiaire",
				"category": "Développement Web",
				"language": "Français",
				"link": "https://example.com/formation/web-fullstack",
				"image": "https://example.com/images/web-fullstack.jpg"
			},
			{
				"id": "2",
				"title": "Introduction à l'Intelligence Artificielle",
				"description": "Découvrez les bases de l'IA, le machine learning et l'apprentissage profond.",
				"duration": "8 semaines",
				"price": 1199,
				"rating": 4.7,
				"level": "Débutant",
				"category": "Intelligence Artificielle",
				"language": "Français",
				"link": "https://example.com/formation/intro-ia",
				"image": "https://example.com/images/intro-ia.jpg"
			},
			{
				"id": "3",
				"title": "Data Science Avancée",
				"description": "Maîtrisez la data science avec Python, Pandas, et les modèles prédictifs.",
				"duration": "10 semaines",
				"price": 1599,
				"rating": 4.9,
				"level": "Avancé",
				"category": "Data Science",
				"language": "Français",
				"link": "https://example.com/formation/data-science-avancee",
				"image": "https://example.com/images/data-science.jpg"
			},
			{
				"id": "4",
				"title": "Sécurité Informatique pour Entreprises",
				"description": "Protégez vos systèmes et réseaux contre les menaces et attaques modernes.",
				"duration": "6 semaines",
				"price": 1399,
				"rating": 4.6,
				"level": "Intermédiaire",
				"category": "Sécurité Informatique",
				"language": "Français",
				"link": "https://example.com/formation/securite-informatique",
				"image": "https://example.com/images/securite-informatique.jpg"
			},
			{
				"id": "5",
				"title": "DevOps et Déploiement Cloud",
				"description": "Apprenez les pratiques DevOps et déployez vos applications sur AWS.",
				"duration": "9 semaines",
				"price": 1499,
				"rating": 4.7,
				"level": "Avancé",
				"category": "DevOps",
				"language": "Français",
				"link": "https://example.com/formation/devops-cloud",
				"image": "https://example.com/images/devops-cloud.jpg"
			},
			{
				"id": "6",
				"title": "Big Data et Traitement Massif",
				"description": "Manipulez et analysez des volumes massifs de données avec Hadoop et Spark.",
				"duration": "11 semaines",
				"price": 1699,
				"rating": 4.8,
				"level": "Avancé",
				"category": "Big Data",
				"language": "Français",
				"link": "https://example.com/formation/big-data",
				"image": "https://example.com/images/big-data.jpg"
			},
			{
				"id": "7",
				"title": "UX/UI Design Moderne",
				"description": "Créez des interfaces utilisateur intuitives et attrayantes avec Figma et Adobe XD.",
				"duration": "5 semaines",
				"price": 999,
				"rating": 4.5,
				"level": "Débutant",
				"category": "Design",
				"language": "Français",
				"link": "https://example.com/formation/ux-ui-design",
				"image": "https://example.com/images/ux-ui-design.jpg"
			},
			{
				"id": "8",
				"title": "Python pour l'Analyse de Données",
				"description": "Apprenez à utiliser Python pour analyser et visualiser des données complexes.",
				"duration": "7 semaines",
				"price": 1299,
				"rating": 4.7,
				"level": "Intermédiaire",
				"category": "Programmation",
				"language": "Français",
				"link": "https://example.com/formation/python-data",
				"image": "https://example.com/images/python-data.jpg"
			},
			{
				"id": "9",
				"title": "Développement Mobile avec React Native",
				"description": "Créez des applications mobiles performantes pour Android et iOS avec React Native.",
				"duration": "8 semaines",
				"price": 1399,
				"rating": 4.6,
				"level": "Intermédiaire",
				"category": "Développement Mobile",
				"language": "Français",
				"link": "https://example.com/formation/react-native",
				"image": "https://example.com/images/react-native.jpg"
			},
			{
				"id": "10",
				"title": "Gestion de Projet Agile avec Scrum",
				"description": "Maîtrisez la gestion de projet agile et devenez Scrum Master certifié.",
				"duration": "6 semaines",
				"price": 1299,
				"rating": 4.8,
				"level": "Intermédiaire",
				"category": "Gestion de Projet",
				"language": "Français",
				"link": "https://example.com/formation/agile-scrum",
				"image": "https://example.com/images/agile-scrum.jpg"
			}
		],
		error: null,
		selectedItems: [],
	},
	reducers: {
	},
});


export default FrontReducer.reducer;
