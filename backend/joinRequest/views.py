# joinRequest/views.py

from django.db import IntegrityError
from django.db.models import F
from django.contrib.auth import get_user_model
from rest_framework import viewsets, permissions, status
from rest_framework.decorators import action
from rest_framework.response import Response

from .models import JoinRequest
from .serializers import JoinRequestSerializer
from teams.models import Team
from users.models import User  # même modèle que dans JoinRequest


class JoinRequestViewSet(viewsets.ModelViewSet):
    """
    Version SANS Clerk pour tests.

    Endpoints :

      POST  /api/join-requests/           -> créer une demande
      GET   /api/join-requests/my/        -> demandes d'un joueur (?player_id=...)
      GET   /api/join-requests/received/  -> demandes pour un organisateur (?organizer_id=...)
      PATCH /api/join-requests/<id>/      -> changer le statut (accepted / rejected)
    """

    queryset = JoinRequest.objects.select_related(
        "player", "team", "team__tournament"
    )
    serializer_class = JoinRequestSerializer
    authentication_classes = []  # pas d'auth pour l’instant
    permission_classes = [permissions.AllowAny]
    http_method_names = ["get", "post", "patch", "head", "options"]

    # ---------- POST /api/join-requests/ ----------
    def create(self, request, *args, **kwargs):
        """
        Créer une demande d'adhésion.

        Pour les tests :
        - si request.user n'est pas authentifié → on prend le premier User en base.
        
        Body JSON attendu :
        {
          "team": "<UUID_TEAM>",
          "message": "optionnel"
        }
        """
        # 1) Choisir un user pour jouer le rôle de player
        user = request.user
        if not user or not user.is_authenticated:
            user = User.objects.first()
            if not user:
                return Response(
                    {"detail": "Aucun utilisateur trouvé pour créer la demande."},
                    status=status.HTTP_400_BAD_REQUEST,
                )

        # 2) Récupérer les données du body
        team_id = request.data.get("team")
        message = request.data.get("message", "")

        if not team_id:
            return Response(
                {"detail": "Le champ 'team' est obligatoire."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        # 3) Charger l’équipe
        try:
            team = Team.objects.select_related("tournament").get(id=team_id)
        except Team.DoesNotExist:
            return Response(
                {"detail": "Équipe introuvable."},
                status=status.HTTP_404_NOT_FOUND,
            )

        # 4) Vérifier capacité
        if team.current_capacity >= team.max_capacity:
            return Response(
                {"detail": "Cette équipe est déjà pleine."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        # 💡 unique_together(player, team) existe déjà dans le modèle
        # donc on entoure de try/except pour gérer les doublons proprement
        try:
            jr = JoinRequest.objects.create(
                player=user,
                team=team,
                message=message,
            )
        except IntegrityError:
            return Response(
                {"detail": "Une demande existe déjà pour cette équipe."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        serializer = self.get_serializer(jr)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    # ---------- GET /api/join-requests/my/?player_id=... ----------
    @action(detail=False, methods=["get"], url_path="my")
    def my_requests(self, request):
        """
        Mes demandes en tant que joueur (version sans Clerk).

        Utilisation :
        GET /api/join-requests/my/?player_id=<UUID_USER>
        """
        player_id = request.query_params.get("player_id")
        if not player_id:
            return Response(
                {"detail": "Le paramètre 'player_id' est obligatoire."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        qs = self.get_queryset().filter(player_id=player_id)
        serializer = self.get_serializer(qs, many=True)
        return Response(serializer.data)

    # ---------- GET /api/join-requests/received/?organizer_id=... ----------
    @action(detail=False, methods=["get"], url_path="received")
    def received_requests(self, request):
        """
        Demandes reçues pour un organisateur (version sans Clerk).

        Utilisation :
        GET /api/join-requests/received/?organizer_id=<UUID_ORGANIZER>[&team=<UUID_TEAM>]
        """
        organizer_id = request.query_params.get("organizer_id")
        if not organizer_id:
            return Response(
                {"detail": "Le paramètre 'organizer_id' est obligatoire."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        qs = self.get_queryset().filter(team__tournament__organizer_id=organizer_id)

        team_id = request.query_params.get("team")
        if team_id:
            qs = qs.filter(team_id=team_id)

        serializer = self.get_serializer(qs, many=True)
        return Response(serializer.data)

    # ---------- PATCH /api/join-requests/<id>/ ----------
    def partial_update(self, request, *args, **kwargs):
        """
        Version simplifiée pour tests, SANS Clerk.

        Body JSON :
        {
          "status": "accepted" | "rejected"
        }
        """
        jr = self.get_object()
        new_status = request.data.get("status")

        if new_status not in ["accepted", "rejected"]:
            return Response(
                {
                    "detail": "Le statut doit être 'accepted' ou 'rejected'."
                },
                status=status.HTTP_400_BAD_REQUEST,
            )

        # Si accepted → ajouter le joueur dans l'équipe + incrémenter la capacité
        if new_status == "accepted" and jr.status == "pending":
            team = jr.team

            if team.current_capacity >= team.max_capacity:
                return Response(
                    {"detail": "L'équipe est pleine, impossible d'accepter."},
                    status=status.HTTP_400_BAD_REQUEST,
                )

            team.members.add(jr.player)
            team.current_capacity = F("current_capacity") + 1
            team.save(update_fields=["current_capacity"])

        jr.status = new_status
        jr.save()

        serializer = self.get_serializer(jr)
        return Response(serializer.data)
