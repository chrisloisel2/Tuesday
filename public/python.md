# Présentation de Python



---

## Qu'est-ce que Python ?

Python est un langage de programmation interprété, interactif et orienté objet.
Il a été créé par Guido van Rossum et publié pour la première fois en 1991.
Python est conçu pour être facile à lire et à écrire, avec une syntaxe claire.



---

## Historique de Python

- 1991: Publication de Python 0.9.0.
- 2000: Sortie de Python 2.0, avec de nombreuses nouvelles fonctionnalités.
- 2008: Lancement de Python 3.0, incompatible avec Python 2.
- 2020: Fin du support de Python 2.7.



---

## Caractéristiques de Python

- Syntaxe épurée et lisible.
- Typage dynamique.
- Gestion automatique de la mémoire.
- Bibliothèque standard étendue.
- Supporte les paradigmes de programmation procédurale, orientée objet et fonctionnelle.



---

## Domaines d'application

- Développement web (Django, Flask).
- Science des données (Pandas, NumPy).
- Machine Learning (scikit-learn, TensorFlow).
- Développement de scripts et d'automatisation.
- Développement de jeux (Pygame).



---

## Python 2 vs Python 3

| Critère            | Python 2           | Python 3          |
|--------------------|--------------------|-------------------|
| Date de sortie     | 2000               | 2008              |
| Fin de vie         | 2020               | Toujours supporté |
| Syntaxe            | Plus permissive    | Plus stricte      |
| Print              | `print "text"`     | `print("text")`   |
| Division entière   | `3/2 = 1`          | `3/2 = 1.5`       |



---

## Interpréteur Python

L'interpréteur Python est le programme qui lit et exécute le code Python.
Il peut être utilisé en mode script ou en mode interactif.
Pour démarrer l'interpréteur en mode interactif, tapez `python` ou `python3` dans votre terminal.



---

## Exemples de projets célèbres utilisant Python

- Instagram: Réseau social pour le partage de photos et vidéos.
- Dropbox: Service de stockage et de partage de fichiers en ligne.
- Spotify: Service de streaming musical.
- Netflix: Plateforme de streaming vidéo proposant films et séries.



--

# Installation de Python



---

## Options d'installation de Python

- Téléchargement et installation depuis le site officiel
- Utilisation de gestionnaires de paquets pour Linux ou MacOS
- Installation via des distributeurs comme Anaconda
- Utilisation de versions pré-installées sur certains systèmes



---

## Téléchargement depuis le site officiel

1. Aller sur [python.org](https://www.python.org/downloads/)
2. Choisir la version correspondant à votre système d'exploitation
3. Télécharger l'exécutable d'installation
4. Suivre les instructions d'installation



---

## Installation sur Windows

1. Exécuter l'installateur téléchargé
2. Cocher "Add Python to PATH"
3. Choisir l'installation personnalisée pour plus d'options
4. Sélectionner les composants à installer
5. Cliquer sur "Install Now" et suivre les instructions



---

## Installation sur MacOS

1. Télécharger le package d'installation depuis le site officiel
2. Ouvrir le fichier `.pkg` téléchargé
3. Suivre les instructions de l'assistant d'installation
4. Optionnel : Vérifier l'installation via le terminal avec `python --version`



---

## Installation sur Linux

- Pour Ubuntu/Debian:
  ```bash
  sudo apt-get update
  sudo apt-get install python3
  ```

- Pour Fedora:
  ```bash
  sudo dnf install python3
  ```

- Pour Arch Linux:
  ```bash
  sudo pacman -S python
  ```



---

## Vérification de l'installation

- Ouvrir le terminal ou l'invite de commande
- Taper `python --version` ou `python3 --version`
- La version installée de Python devrait s'afficher



---

## Mise à jour de Python

- Windows: télécharger et installer la dernière version depuis python.org
- MacOS: utiliser Homebrew avec `brew upgrade python`
- Linux: utiliser le gestionnaire de paquets approprié (apt, dnf, pacman)



---

## Problèmes courants d'installation et solutions

| Problème                                  | Solution possible                       |
|-------------------------------------------|-----------------------------------------|
| Python n'est pas reconnu dans le terminal | Ajouter Python au PATH pendant l'installation |
| Erreurs de dépendance                     | Installer les dépendances manquantes    |
| Conflits de version                       | Utiliser un environnement virtuel       |
| Permissions insuffisantes                 | Installer avec des droits administrateur|



--

# Environnements de développement intégrés (IDE)



---

## Définition d'un IDE

Un IDE, ou Environnement de Développement Intégré, est un logiciel qui offre des outils essentiels pour la programmation :
- Éditeur de texte pour écrire le code
- Compilateur ou interpréteur pour exécuter le code
- Débogueur pour tester et corriger le code
- Gestionnaire de versions (optionnel)



---

## Pourquoi utiliser un IDE pour Python

- Simplification de la configuration de l'environnement de développement
- Productivité accrue grâce aux fonctionnalités intégrées
- Assistance à la rédaction de code (autocomplétion, vérification de syntaxe)
- Facilité pour organiser et naviguer dans le code
- Intégration de systèmes de contrôle de version comme Git



---

## IDE populaires pour Python

- **PyCharm**: Complet, avec une version communautaire gratuite
- **Visual Studio Code**: Léger, personnalisable avec des extensions
- **Spyder**: Orienté analyse de données, inclus avec Anaconda
- **Jupyter Notebook**: Idéal pour le travail interactif et la visualisation de données
- **Thonny**: Simple et convivial pour les débutants



---

## Installation d'un IDE Python

- Téléchargez l'installateur de l'IDE de votre choix
- Exécutez l'installateur et suivez les instructions
- Assurez-vous d'inclure l'IDE dans le PATH si nécessaire
- Ouvrez l'IDE après l'installation pour configurer l'environnement



---

## Configuration de base d'un IDE pour Python

- Sélectionnez l'interpréteur Python installé sur votre système
- Configurez le chemin des scripts et des bibliothèques si nécessaire
- Personnalisez l'apparence et le comportement de l'éditeur (thèmes, indentation)
- Installez des plugins ou extensions pour augmenter les fonctionnalités



---

## Création d'un premier projet Python dans un IDE

- Ouvrez l'IDE et sélectionnez 'Nouveau Projet'
- Nommez votre projet et choisissez un emplacement pour les fichiers
- Configurez l'interpréteur Python et les dépendances si nécessaire
- Créez un nouveau fichier Python (.py) et commencez à coder



---

## Raccourcis et fonctionnalités utiles dans un IDE

- **Autocomplétion**: Tapez une partie du code et laissez l'IDE le compléter
- **Recherche et remplacement**: Trouvez rapidement des éléments dans le code
- **Refactoring**: Renommez, déplacez et modifiez le code facilement
- **Raccourcis clavier**: Apprenez-les pour naviguer et coder plus vite



---

## Debugging avec un IDE Python

- Placez des points d'arrêt dans le code pour suspendre l'exécution
- Exécutez le programme en mode débogage pour suivre l'exécution
- Inspectez les variables et l'état du programme en temps réel
- Utilisez les outils de l'IDE pour corriger les erreurs et optimiser le code



--

# Syntaxe de base de Python



---

## Les commentaires en Python

Les commentaires sont utilisés pour expliquer le code.
Ils aident à rendre le code plus lisible.
En Python, les commentaires commencent par le symbole `#`.

```python
# Ceci est un commentaire
```



---

## Les indentations en Python

En Python, l'indentation est utilisée pour définir des blocs de code.
Elle est cruciale et remplace les accolades `{}` présentes dans d'autres langages.

```python
if condition:
    # Bloc de code indenté
```



---

## Les variables et types de données

Les variables sont des conteneurs pour stocker des données.
En Python, le type de donnée est déterminé automatiquement.

```python
nombre = 10         # Entier
nom = "Alice"       # Chaîne de caractères
```



---

## Les opérateurs de base

| Opérateur | Description          |
|-----------|----------------------|
| `+`       | Addition             |
| `-`       | Soustraction         |
| `*`       | Multiplication       |
| `/`       | Division             |
| `%`       | Modulo               |
| `**`      | Puissance            |
| `//`      | Division entière     |



---

## La structure d'une instruction Python

Une instruction Python se termine par une nouvelle ligne.
Pour une instruction sur plusieurs lignes, utilisez un backslash (`\`).

```python
instruction = "ligne 1" + \
              "ligne 2"
```



---

## La déclaration et l'initialisation des variables

En Python, la déclaration et l'initialisation se font en même temps.

```python
x = 5  # Déclaration et initialisation
```



---

## Les règles de nommage des variables

- Commence par une lettre ou un underscore (`_`).
- Peut contenir des lettres, des chiffres, des underscores.
- Ne doit pas commencer par un chiffre.
- Sensible à la casse (`maVariable` est différent de `mavariable`).



---

## Les mots-clés réservés en Python

Les mots-clés ne peuvent pas être utilisés comme noms de variables.

```python
import keyword
print(keyword.kwlist)
```

Exemple de mots-clés: `False`, `None`, `True`, `and`, `as`, `assert`, `break`.
