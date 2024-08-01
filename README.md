# oKanban Backend

oKanban est une application de gestion de projet utilisant la méthode Kanban. Ce dépôt contient le code backend, construit avec Node.js et Express pour gérer les opérations CRUD sur les listes, les cartes et les tags.

## Fonctionnalités

- Gestion des utilisateurs : Enregistrement, connexion et gestion des utilisateurs.
- Gestion des listes : Création, modification, suppression et réorganisation des listes.
- Gestion des cartes : Création, modification, suppression et réorganisation des cartes dans les listes.
- Gestion des tags : Création, modification et suppression des tags, ainsi que l'association des tags aux cartes.
- Authentification : Sécurisation des routes avec des middlewares d'authentification.
- Protection CSRF : Utilisation de tokens CSRF pour sécuriser les requêtes.
- Sessions Sequelize : Gestion des sessions avec Sequelize.

## Technologies utilisées

- ![Node.js](https://img.shields.io/badge/-Node.js-339933?style=flat&logo=node.js&logoColor=white)
- ![Express](https://img.shields.io/badge/-Express-000000?style=flat&logo=express&logoColor=white)
- ![Sequelize](https://img.shields.io/badge/-Sequelize-52B0E7?style=flat&logo=sequelize&logoColor=white)
- ![PostgreSQL](https://img.shields.io/badge/-PostgreSQL-336791?style=flat&logo=postgresql&logoColor=white)
- ![CSRF Token](https://img.shields.io/badge/-CSRF_Token-000000?style=flat&logo=json-web-tokens&logoColor=white)
- ![Docker](https://img.shields.io/badge/-Docker-2496ED?style=flat&logo=docker&logoColor=white)

## Utilisation avec Docker

### Prérequis

- Docker
- Docker Compose

### Configuration

Configurez les variables d'environnement en créant un fichier .env à la racine du projet :

- Utiliser le `.env.example` pour faire votre `.env`

## Démarrage avec Docker

1. Lancez Docker Compose pour démarrer les services :

```bash
docker-compose up -d
```

2. L'API sera disponible à l'adresse suivante :

```bash
http://localhost:3000
```

## Arrêt des services

Pour arrêter les services Docker, exécutez :

```bash
docker-compose down
```

## Endpoints

### Authentification

- `POST /register` : Enregistrer un nouvel utilisateur.
- `POST /login` : Connecter un utilisateur existant.

### Listes

- `GET /lists` : Récupérer toutes les listes.
- `GET /lists/:id` : Récupérer une liste par ID.
- `POST /lists` : Créer une nouvelle liste.
- `PATCH /lists/:id` : Modifier une liste par ID.
- `DELETE /lists/:id` : Supprimer une liste par ID.

### Cartes

- `GET /cards/:id` : Récupérer une carte par ID.
- `POST /cards` : Créer une nouvelle carte.
- `PATCH /cards/:id` : Modifier une carte par ID.
- `DELETE /cards/:id` : Supprimer une carte par ID.

### Tags

- `GET /tags` : Récupérer tous les tags.
- `POST /tags` : Créer un nouveau tag.
- `PATCH /tags/:id` : Modifier un tag par ID.
- `DELETE /tags/:id` : Supprimer un tag par ID.
