# matchs/views.py

from django.db.models import Q
from django.utils import timezone
from rest_framework import viewsets, permissions, status
from rest_framework.decorators import action
from rest_framework.response import Response

from .models import Match
from .serializers import MatchSerializer


class MatchViewSet(viewsets.ModelViewSet):
    """
    API endpoint pour gérer les matchs.

    Routes principales DRF :
    - GET    /api/matches/           : liste des matchs (optionnel)
    - POST   /api/matches/           : créer un match
    - GET    /api/matches/{id}/      : détails d’un match
    - PATCH  /api/matches/{id}/      : mettre à jour un match (scores, date, lieu)
    - DELETE /api/matches/{id}/      : supprimer un match

    Routes personnalisées :
    - GET    /api/matches/my/        : voir MES matchs (joueur ou organisateur)
                                       + filtre ?status=upcoming|past
    """

    queryset = Match.objects.select_related("team_a", "team_b", "team_a__tournament")
    serializer_class = MatchSerializer
    # Pour la vraie app : authentification obligatoire
    # permission_classes = [permissions.AllowAny]
    #http_method_names = ["get", "post", "patch", "delete", "head", "options"]

    # # --------- Création d’un match (organisateur du tournoi) ---------
    # def create(self, request, *args, **kwargs):
    #     serializer = self.get_serializer(data=request.data)
    #     serializer.is_valid(raise_exception=True)

    #     team_a = serializer.validated_data["team_a"]
    #     team_b = serializer.validated_data["team_b"]

    #     # 1) Les deux équipes doivent appartenir au même tournoi
    #     if team_a.tournament_id != team_b.tournament_id:
    #         return Response(
    #             {"detail": "Les deux équipes doivent appartenir au même tournoi."},
    #             status=status.HTTP_400_BAD_REQUEST,
    #         )

    #     # 2) L’utilisateur doit être organisateur du tournoi
    #     if not request.user.is_authenticated:
    #         return Response(
    #             {"detail": "Authentification requise."},
    #             status=status.HTTP_401_UNAUTHORIZED,
    #         )

    #     if team_a.tournament.organizer != request.user:
    #         return Response(
    #             {"detail": "Vous devez être l'organisateur du tournoi pour créer un match."},
    #             status=status.HTTP_403_FORBIDDEN,
    #         )

    #     # Si tout est bon -> création
    #     self.perform_create(serializer)
    #     return Response(serializer.data, status=status.HTTP_201_CREATED)

    # --------- Mise à jour partielle (scores, date, lieu) ---------
    def partial_update(self, request, *args, **kwargs):
        match = self.get_object()

        if not request.user.is_authenticated:
            return Response(
                {"detail": "Authentification requise."},
                status=status.HTTP_401_UNAUTHORIZED,
            )

        # Seul l'organisateur du tournoi peut modifier le match
        if match.team_a.tournament.organizer != request.user:
            return Response(
                {"detail": "Seul l'organisateur du tournoi peut modifier ce match."},
                status=status.HTTP_403_FORBIDDEN,
            )

        # je peux décider de restreindre aux scores seulement :
        # allowed_fields = {"score_a", "score_b"}
        # extra = set(request.data.keys()) - allowed_fields
        # if extra:
        #     return Response(
        #         {
        #             "detail": "Seuls 'score_a' et 'score_b' peuvent être modifiés.",
        #             "invalid_fields": list(extra),
        #         },
        #         status=status.HTTP_400_BAD_REQUEST,
        #     )

        return super().partial_update(request, *args, **kwargs)

    # --------- Mes matchs (joueur ou organisateur) ---------
    @action(detail=False, methods=["get"], url_path="my")
    def my_matches(self, request):
        """
        Retourne les matchs :
        - où je suis organisateur du tournoi
        - ou où je suis membre d’une des deux équipes

        Filtre optionnel :
        - ?status=upcoming  : matchs à venir
        - ?status=past      : matchs passés
        """
        if not request.user.is_authenticated:
            return Response(
                {"detail": "Authentification requise."},
                status=status.HTTP_401_UNAUTHORIZED,
            )

        user = request.user

        qs = self.get_queryset().filter(
            Q(team_a__tournament__organizer=user)
            | Q(team_b__tournament__organizer=user)
            | Q(team_a__members=user)
            | Q(team_b__members=user)
        ).distinct()

        status_param = request.query_params.get("status")
        now = timezone.now()

        if status_param == "upcoming":
            qs = qs.filter(date__gte=now)
        elif status_param == "past":
            qs = qs.filter(date__lt=now)

        serializer = self.get_serializer(qs, many=True)
        return Response(serializer.data)
