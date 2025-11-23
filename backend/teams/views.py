# from rest_framework import viewsets, status, generics
# from rest_framework.decorators import action
# from rest_framework.response import Response
# from rest_framework.permissions import IsAuthenticated, AllowAny
# from django.db.models import Count, F, Q
# from .models import Team
# from .serializers import TeamSerializer, TeamCreateSerializer

# class TeamViewSet(viewsets.ModelViewSet):
#     queryset = Team.objects.all()
#     serializer_class = TeamSerializer
#     permission_classes = [IsAuthenticated]

#     def get_serializer_class(self):
#         if self.action == 'create':
#             return TeamCreateSerializer
#         return TeamSerializer

#     def perform_create(self, serializer):
#         # Set the organizer to the current user
#         serializer.save(organizer=self.request.user)

#     @action(detail=False, methods=['get'], url_path='available')
#     def available(self, request):
#         # Filter teams that are not full
#         # We need to annotate the queryset with member count to filter
#         teams = Team.objects.annotate(num_members=Count('members')).filter(num_members__lt=F('capacity'))
        
#         # Apply optional filters
#         city = request.query_params.get('city')
#         sport = request.query_params.get('sport')
        
#         if city:
#             teams = teams.filter(city__iexact=city)
#         if sport:
#             teams = teams.filter(sport__iexact=sport)
            
#         serializer = TeamSerializer(teams, many=True)
#         return Response(serializer.data)

# class MyTeamsView(generics.ListAPIView):
#     serializer_class = TeamSerializer
#     permission_classes = [IsAuthenticated]

#     def get_queryset(self):
#         # Return teams where the user is a member OR the organizer
#         return Team.objects.filter(Q(members=self.request.user) | Q(organizer=self.request.user)).distinct()
# teams/views.py

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
