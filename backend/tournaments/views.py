from rest_framework import viewsets, permissions
from .models import Tournament
from .serializers import TournamentSerializer

# TournamentViewSet gère toutes les opérations CRUD (Create, Read, Update, Delete)
class TournamentViewSet(viewsets.ModelViewSet):
    
    
    """
    API endpoint that allows tournaments to be viewed, created, edited or deleted.
    
    Routes gérées automatiquement par DRF :
    - GET /api/tournaments/      : Liste des tournois
    - POST /api/tournaments/     : Créer un nouveau tournoi
    - GET /api/tournaments/{id}/ : Détails d'un tournoi
    - PUT/PATCH /api/tournaments/{id}/ : Mettre à jour un tournoi
    - DELETE /api/tournaments/{id}/: Supprimer un tournoi
    """
    queryset = Tournament.objects.all().order_by('-start_date')
    serializer_class = TournamentSerializer