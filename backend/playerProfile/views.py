from rest_framework import viewsets
from .models import PlayerProfile
from .serializers import PlayerProfileSerializer

class PlayerProfileViewSet(viewsets.ModelViewSet):
    queryset = PlayerProfile.objects.all()
    serializer_class = PlayerProfileSerializer
