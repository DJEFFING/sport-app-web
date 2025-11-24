# joinRequest/serializers.py

from rest_framework import serializers
from .models import JoinRequest
from teams.models import Team


class JoinRequestSerializer(serializers.ModelSerializer):
    # player vient de request.user (ou du User par défaut pour les tests)
    player = serializers.PrimaryKeyRelatedField(read_only=True)
    team = serializers.PrimaryKeyRelatedField(queryset=Team.objects.all())

    class Meta:
        model = JoinRequest
        fields = [
            "id",
            "player",
            "team",
            "status",
            "message",
            "created_at",
            "updated_at",
        ]
        read_only_fields = [
            "id",
            "player",
            "status",
            "created_at",
            "updated_at",
        ]
