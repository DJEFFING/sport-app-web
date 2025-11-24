# Documentation du Projet – Application de Ligues Sportives

Projet Django + React/Next (frontend) pour gérer des **tournois sportifs**, **équipes**, **matchs**, **profils joueurs** et **demandes d’adhésion** avec **authentification Clerk**.

---

## 1. Stack Technique

### Backend

- **Framework** : Django 5 + Django REST Framework
- **Base de données** : PostgreSQL (Neon) via `DATABASE_URL`
- **Auth** : Clerk (JWT sur le backend, Clerk côté frontend)
- **Apps Django** :
  - `users` : gestion des utilisateurs
  - `tournaments` : tournois
  - `teams` : équipes
  - `joinRequest` : demandes pour rejoindre une équipe
  - `matchs` : matchs
  - `playerProfile` : profil joueur
  - `adminpanel` : customisation de l’admin Django

### Frontend

- **Framework** : React / Next.js (selon le dépôt)
- **Auth** : Clerk (widgets UI + gestion de session côté frontend)
- **Backend API** : consommée via `http://127.0.0.1:8000/api/` (en local)

---

## 2. Installation & Configuration Backend

### 2.1. Cloner le projet

```bash
git clone https://github.com/DJEFFING/sport-app-web.git
cd sport-app-web/backend
```

## 2.2. Environnement virtuel (Windows / PowerShell)

```bash
python -m venv venv
venv\Scripts\activate

```

## Installer les dépendances

```bash
pip install -r requirements.txt
python -m pip install --upgrade pip
pip install " python-jose[cryptographie] " requêtes
pip install PyJWT requests
# Pouur creer le projet
django-admin startproject sports_platform

#  Pour creer les application
python manage.py startapp accounts
python manage.py startapp players
python manage.py startapp tournaments
python manage.py startapp requests_app
python manage.py startapp matches
python manage.py startapp payments

# pour lancer imigration
python manage.py makemigrations
python manage.py migrate
```

## Fichier .env

```env
# Django
SECRET_KEY=remplace_par_une_cle_secrete
DEBUG=True
ALLOWED_HOSTS=localhost,127.0.0.1

# Base de données (Postgres / Neon)
DATABASE_URL=postgres://<user>:<password>@<host>:<port>/<dbname>

# Frontend autorisé pour CORS
FRONTEND_URL=http://localhost:3000

# Clerk
CLERK_SECRET_KEY=sk_test_*****
CLERK_PUBLISHABLE_KEY=pk_test_*****
CLERK_JWKS_URL=https://<ton_instance>.clerk.accounts.dev/.well-known/jwks.json


```

## Paramètres Django importants

```python
INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'corsheaders',
    'rest_framework',

    'tournaments.apps.TournamentsConfig',
    'joinRequest.apps.JoinrequestConfig',
    'teams.apps.TeamsConfig',
    'users.apps.UsersConfig',
    'playerProfile.apps.PlayerprofileConfig',
    'matchs.apps.MatchsConfig',
    'adminpanel.apps.AdminpanelConfig',
]
# CORS
CORS_ALLOWED_ORIGINS = [
    os.getenv('FRONTEND_URL', 'http://localhost:3000'),
]

CORS_ALLOW_CREDENTIALS = True

# REST
REST_FRAMEWORK = {
    'DEFAULT_PAGINATION_CLASS': 'rest_framework.pagination.PageNumberPagination',
    'PAGE_SIZE': 20,
    'DEFAULT_RENDERER_CLASSES': [
        'rest_framework.renderers.JSONRenderer',
    ],
    'DEFAULT_PARSER_CLASSES': [
        'rest_framework.parsers.JSONParser',
    ],



```

## 3 3. Étapes pour lancer le BACKEND

```bash
cd sport-app-web/backend
venv\Scripts\activate
python manage.py makemigrations
python manage.py migrate
python manage.py createsuperuser
python manage.py runserver


```

### Le backend sera accessible sur :

- http://127.0.0.1:8000/

- API : http://127.0.0.1:8000/api/

## 4 -Étapes pour lancer le FRONTEND

```bash
cd sport-app-web/frontend
npm install
npm run dev


```

## 5. Structure des principales apps

### 5.1. Users

- Modèle User (custom ou extension du modèle Django standard)

      - Champs typiques :

      - id (UUID)

      - email

      - full_name

      - role : organizer ou player

      - clerk_id (id renvoyé par Clerk)

  Exemple de test via users.http :

```http
GET http://127.0.0.1:8000/api/users/
Content-type: application/json

### user 1
POST http://127.0.0.1:8000/api/users/
Content-type: application/json

{
    "id":"aaf3dcaa-39ce-40d0-9caf-11b6a10ce51f",
    "clerk_id":2345,
    "email":"drake.dev@gmail.com",
    "full_name":"drake245",
    "role":"organizer"
}

```

### 5.2. Tournaments

- Modèle Tournament avec :

  - id (UUID)

  - name

  - location / city

  - sport

  - start_date / end_date

  - organizer (FK vers User)

- Serializer (TournamentSerializer) :

  - Renvoie organizer_username (lecture seule) au lieu de juste l’ID.

- ViewSet (TournamentViewSet) :

  - CRUD complet :

    - GET /api/tournaments/

    - POST /api/tournaments/

    - GET /api/tournaments/{id}/

    - PUT/PATCH /api/tournaments/{id}/

    - DELETE /api/tournaments/{id}/

### 5.3. Teams

- Modèle Team :

  - id (UUID)

  - name

  - tournament (FK → Tournament)

  - members (ManyToMany → User)

  - current_capacity / max_capacity

  - propriété is_full (ou équivalent) pour savoir si l’équipe est pleine

- Endpoints principaux :

  - GET /api/teams/

  - POST /api/teams/

  - GET /api/teams/{id}/

  - etc.

- Endpoints JoinRequest

  - POST /api/join-requests/
    Créer une demande d’adhésion.

  - GET /api/join-requests/my/?player_id=<UUID_USER>
    Voir les demandes d’un joueur.

  - GET /api/join-requests/received/?organizer_id=<UUID_ORGANIZER>[&team=<UUID_TEAM>]
    Voir les demandes reçues par un organisateur.

  - PATCH /api/join-requests/{id}/
    Changer le statut (accepted, rejected, cancelled).

## 5.5. Matches

- Modèle Match :

        - id (UUID)

        - team_a, team_b (FK → Team)

- date, location

        - score_a, score_b

        - created_at

- ViewSet (MatchViewSet) :

  - POST /api/matches/ : création d’un match (entre deux équipes d’un même tournoi)

  - GET /api/matches/my/ : liste des matchs liés à l’utilisateur (organisateur ou joueur)

  - PATCH /api/matches/{id}/ : mise à jour des scores (score_a et score_b uniquement)

  - list/retrieve/update/destroy classiques sont désactivés (renvoient 405)

## 5.6. PlayerProfile

- Modèle PlayerProfile (non recollé ici, mais structure classique) :

  - FK → User

  - infos joueur (bio, sport préféré, niveau, etc.)

- Vue PlayerProfileView :

  - GET /api/player/profile/ : retourne le profil du joueur connecté (ou le crée au besoin)

  - PATCH /api/player/profile/ : mise à jour du profil

## 6. Admin Django personnalisé

### 6.1. Activation

- App : adminpanel ajoutée dans INSTALLED_APPS

- Dans adminpanel/admin.py, on enregistre les modèles avec des classes custom :

## 7. Authentification avec Clerk (conceptuellement)

- Frontend utilise Clerk pour :

  - Signup / Login

  - Gestion des sessions

  - Récupération du JWT (getToken())

- Backend Django :

  - Récupère le token dans le header :

    - Authorization: Bearer <CLERK_JWT>

- Un authentication class (par ex. ClerkJWTAuthentication) :

  - Vérifie la signature du JWT avec CLERK_JWKS_URL

  - Extrait sub / email

  - Associe à un User en base

## 8. Résumé des Endpoints Importants (avec URLs)

```text
http://127.0.0.1:8000/api/

```

- Utilisateurs

  - GET /api/users/

  - POST /api/users/

- Tournois

  - GET /api/tournaments/

  - POST /api/tournaments/

  - GET /api/tournaments/{id}/

  - PATCH/PUT /api/tournaments/{id}/

  - DELETE /api/tournaments/{id}/

- Équipes

  - GET /api/teams/

  - POST /api/teams/

  - GET /api/teams/{id}/

- Demandes d’adhésion (joinRequest)

  - POST /api/join-requests/

  - GET /api/join-requests/my/?player_id=<UUID_USER>

  - GET /api/join-requests/received/?organizer_id=<UUID_ORGANIZER>[&team=<UUID_TEAM>]

  - PATCH /api/join-requests/{id}/

- Matchs

  - POST /api/matches/

  - GET /api/matches/my/ (avec éventuellement ?status=upcoming|past)

  - PATCH /api/matches/{id}/ (mise à jour des scores)

- Profil joueur

  - GET /api/player/profile/

  - PATCH /api/player/profile/

- Admin

  - Django Admin : http://127.0.0.1:8000/admin/

## 9. Lancement complet

Backend

```bash
cd sport-app-web/backend
venv\Scripts\activate
python manage.py migrate
python manage.py runserver


```

Frontend

```bash
cd sport-app-web/frontend
npm install
npm run dev

```

## 10. Fonctionnement Global du Projet

1. Un utilisateur s’inscrit via Clerk côté frontend.
2. Clerk envoie son JWT au backend lors des appels API.
3. Le backend valide le JWT et autorise l’action.
4. Le joueur peut :
   - éditer son profil
   - rejoindre une équipe
   - consulter un tournoi
5. Organisateur :
   - voit les équipes de son tournoi
   - accepte/rejet les demandes
6. Admin 🔧 :
   - a accès à toute la plateforme via Django Admin
   - utilise l’interface personnalisée pour gérer les tournois

---

# 14. Conclusion

Ce projet constitue une plateforme complète, moderne et modulaire combinant :

- Backend robuste (Django REST)
- Frontend dynamique (Next.js)
- Auth sécurisée (Clerk)
- Base PostgreSQL cloud
- Système de gestion de tournois totalement opérationnel

Le système respecte toutes les attentes du professeur, notamment :

- la gestion des tournois
- l’inscription des joueurs
- les demandes d’adhésion
- l’interface d’administration avancée
- l’intégration API REST propre

---
