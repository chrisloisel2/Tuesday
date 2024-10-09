1. Création de l'interface utilisateur :

- Page d’accueil :
        Créer une page d'accueil simple permettant aux utilisateurs de s'enregistrer, se connecter ou se déconnecter.
        Gérer l’état de l’authentification via Redux en utilisant AsyncThunk pour les actions suivantes :
	-	Register (inscription d'un utilisateur)
	- Login (connexion d'un utilisateur)
	- Logout (déconnexion d'un utilisateur)

2. Gestion de l'authentification :

    Utiliser Redux pour stocker et gérer l'état d'authentification des utilisateurs.
    Implémenter Redux AsyncThunk pour gérer les appels asynchrones d'API liés à l'authentification (enregistrement, connexion, déconnexion).
    Ajouter un intercepteur pour gérer les erreurs d'authentification, telles que les jetons expirés, et relancer la connexion si nécessaire.
	Cet intercepteur peut également être utilisé pour gérer les erreurs globales des appels API (ex : erreurs 401, 403, etc.).
    Une fois authentifié, l’utilisateur accède à une interface protégée, réservée aux utilisateurs connectés.

3. Routes protégées :

    Créer des routes protégées (privées) qui ne seront accessibles qu'une fois l'utilisateur authentifié.
    Si l'utilisateur n'est pas connecté, il sera redirigé vers la page de connexion.

4. Connexion via WebSocket :

    Dans la partie protégée de l’application, implémenter un système de communication WebSocket pour récupérer et afficher des informations en temps réel.
    L'utilisation de WebSockets permettra de simuler l’envoi et la réception de données en continu depuis un serveur.

5. Sources d'information en temps réel :

    Récupérer les données en temps réel via WebSockets ou API depuis différentes sources possibles :
        Prix des cryptomonnaies (ex : Bitcoin, Ethereum)
        Météo en temps réel (via une API météo)
        Statistiques financières ou boursières
        Évolution du trafic réseau (si applicable)
    Choisir au moins une de ces sources et la connecter via WebSockets ou une API tierce, puis la mettre à jour en temps réel dans l'application.

6. Affichage des données avec ECharts :

    Sur les routes protégées, afficher les données récupérées via WebSockets ou API à l'aide de ECharts (bibliothèque de graphiques).
    Créer au moins deux types de graphiques différents pour représenter les données en temps réel. Par exemple :
        Un graphique en courbes montrant l’évolution du prix d’une cryptomonnaie (ex : Bitcoin) au fil du temps.
        Un graphique en barres pour représenter une répartition de catégories ou de données (ex : répartition des cryptomonnaies, tendances météorologiques).

7. Mise en place d’un intercepteur pour la sécurité et les erreurs :

    Mettre en place un intercepteur pour les requêtes HTTP afin de :
        Gérer les erreurs liées aux appels API (ex : expiration de token, erreurs 401/403).
        Relancer la connexion automatiquement si nécessaire ou rediriger l’utilisateur vers la page de connexion en cas d'erreur.
        Ajouter des en-têtes sécurisés (comme des tokens JWT) à toutes les requêtes envoyées vers les API protégées.

8. Bonus (optionnel) :

    Ajouter un système de persistance de l'état pour que l'utilisateur reste connecté après un rafraîchissement de la page.
    Intégrer une gestion d'erreurs utilisateur-friendly pour les échecs de connexion, d'enregistrement ou les erreurs liées aux WebSockets.
