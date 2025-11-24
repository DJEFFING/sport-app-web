from rest_framework import serializers
from .models import Team


class TeamSerializer(serializers.ModelSerializer):
    """
    Sérialiseur pour le modèle Team.
    Utilisé pour convertir les objets Team en JSON et valider les données entrantes.
    """

    # Champs en lecture seule, dérivés du modèle
    tournament_name = serializers.ReadOnlyField(source="tournament.name")
    available_spots = serializers.ReadOnlyField()
    is_full = serializers.ReadOnlyField()
    members_count = serializers.IntegerField(
        source="members.count", read_only=True
    )

    class Meta:
        model = Team
        fields = [
            "id",
            "name",
            "tournament",
            "tournament_name",
            "max_capacity",
            "current_capacity",
            "available_spots",
            "is_full",
            "members_count",
            "created_at",
        ]
        read_only_fields = ["created_at", "available_spots", "is_full", "members_count"]
