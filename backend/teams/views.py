from django.db.models import F
from rest_framework import viewsets, permissions
from rest_framework.decorators import action
from rest_framework.response import Response

from .models import Team
from .serializers import TeamSerializer


class TeamViewSet(viewsets.ModelViewSet):
    """
    API endpoint pour gérer les équipes.

    Routes principales générées par DRF :
    - GET    /api/teams/           : liste des équipes
    - POST   /api/teams/           : créer une équipe
    - GET    /api/teams/{id}/      : détails d’une équipe
    - PUT    /api/teams/{id}/      : modifier entièrement une équipe
    - PATCH  /api/teams/{id}/      : modifier partiellement une équipe
    - DELETE /api/teams/{id}/      : supprimer une équipe

    Routes personnalisées :
    - GET    /api/teams/available/ : équipes avec des places disponibles
                                     + filtres ?city=&sport=
    """

    queryset = (
        Team.objects.select_related("tournament")
        .prefetch_related("members")
        .all()
        .order_by("name")
    )
    serializer_class = TeamSerializer

    # Pour la vraie app : IsAuthenticated
    # permission_classes = [permissions.IsAuthenticated]
    # Pour le moment, tu peux laisser AllowAny si tu veux tester sans auth,
    # mais les endpoints qui utilisent request.user doivent être protégés.
    permission_classes = [permissions.AllowAny]

    @action(detail=False, methods=["get"], url_path="available")
    def available(self, request):
        """
        Retourne les équipes qui ont encore des places disponibles,
        avec filtres optionnels : ?city=... &sport=...
        """
        city = request.query_params.get("city")
        sport = request.query_params.get("sport")

        qs = self.get_queryset().filter(current_capacity__lt=F("max_capacity"))

        if city:
            qs = qs.filter(tournament__city__iexact=city)

        if sport:
            qs = qs.filter(tournament__sport__iexact=sport)

        serializer = self.get_serializer(qs, many=True)
        return Response(serializer.data)
