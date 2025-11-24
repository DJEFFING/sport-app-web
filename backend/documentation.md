# Backend

```bash

cd backend
python -m venv venv
venv\Scripts\activate
source venv/bin/activate   #bash
python -m pip install --upgrade pip
pip install -r requirements.txt

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

# pour aaceder admin 
python manage.py createsuperuser

#pour demarer le serveur 
python manage.py runserver
#
pip install "python-jose[cryptography]" requests
pip install PyJWT requests
```
## Structure backend Django

```bash
sports_platform/                # Dossier du projet backend
├── manage.py
├── sports_platform/            # Config Django (settings, urls, wsgi...)
│   ├── __init__.py
│   ├── settings.py
│   ├── urls.py
│   ├── wsgi.py
│   └── asgi.py (si présent)
│
├── accounts/                   # Gestion utilisateurs + auth Clerk/StackAuth
│   ├── __init__.py
│   ├── models.py               # User, Profile (ou PlayerProfile lié à User)
│   ├── views.py                # Endpoints d’auth / sync user
│   ├── serializers.py
│   ├── urls.py
│   └── admin.py
│
├── players/                    # Profils joueurs (si séparé d’accounts)
│   ├── __init__.py
│   ├── models.py               # PlayerProfile (ville, sport, niveau…)
│   ├── views.py                # Endpoints de profil joueur
│   ├── serializers.py
│   ├── urls.py
│   └── admin.py
│
├── tournaments/                # Tournois + équipes
│   ├── __init__.py
│   ├── models.py               # Tournament, Team
│   ├── views.py                # Liste / détail tournois, équipes dispos, etc.
│   ├── serializers.py
│   ├── urls.py
│   └── admin.py
│
├── requests/                   # Demandes d’adhésion (JoinRequest)
│   ├── __init__.py
│   ├── models.py               # JoinRequest
│   ├── views.py                # Créer / lister / accepter / refuser demandes
│   ├── services.py             # Logique métier (validation, règles)
│   ├── serializers.py (optionnel)
│   ├── urls.py
│   └── admin.py
│
├── matches/                    # Matchs
│   ├── __init__.py
│   ├── models.py               # Match
│   ├── views.py                # Mes matchs, matchs d’un tournoi, etc.
│   ├── serializers.py
│   ├── urls.py
│   └── admin.py
│
└── payments/                   # Intégration Stripe (optionnel)
    ├── __init__.py
    ├── views.py                # Création session checkout, webhooks…
    ├── webhooks.py             # Gestion des webhooks Stripe
    ├── urls.py
    └── services.py (optionnel)
```
### Comment remplir les IDs  JoinRequest?

- `teamId` → tu le prends dans la réponse de `GET /api/teams/`

- `playerId` → tu le prends soit dans `GET /api/users/`, soit dans le champ "`player`" de la join request créée.

- `organizerId` → c’est l’id du user qui est organiser du tournoi de l’équipe (champ `organizer` du tournoi si tu le exposes, ou ce que vous avez utilisé en base).

- `joinRequestId` → `id` dans la réponse du `POST /api/join-requests/`