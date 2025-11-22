from rest_framework import viewsets, permissions
from .models import Tournament
from .serializers import TournamentSerializer
from rest_framework.decorators import action
from rest_framework.response import Response

class TournamentViewSet(viewsets.ModelViewSet):
    serializer_class = TournamentSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Tournament.objects.filter(organizer=self.request.user)

    def perform_create(self, serializer):
        serializer.save(organizer=self.request.user)

    @action(detail=False, methods=['get'])
    def mine(self, request):
        queryset = self.get_queryset()
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)
