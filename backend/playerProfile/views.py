# playerProfile/views.py

from rest_framework import generics, permissions
from .models import PlayerProfile
from .serializers import PlayerProfileSerializer


class PlayerProfileView(generics.RetrieveUpdateAPIView):
    """
    Endpoints :

    - GET   /api/player/profile/   : récupérer mon profil joueur
    - PATCH /api/player/profile/   : mettre à jour mon profil joueur

    Le profil est lié à l'utilisateur connecté (OneToOne).
    S'il n'existe pas, il est créé automatiquement.
    """

    serializer_class = PlayerProfileSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self):
        user = self.request.user
        # Crée le profil si inexistant
        profile, _ = PlayerProfile.objects.get_or_create(user=user)
        return profile
