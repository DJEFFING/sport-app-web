# from rest_framework import serializers
# from .models import Team
# from django.contrib.auth.models import User

# class UserSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = User
#         fields = ['id', 'username', 'first_name', 'last_name']

# class TeamSerializer(serializers.ModelSerializer):
#     organizer = UserSerializer(read_only=True)
#     members = UserSerializer(many=True, read_only=True)
#     is_full = serializers.BooleanField(read_only=True)
#     members_count = serializers.IntegerField(read_only=True)

#     class Meta:
#         model = Team
#         fields = ['id', 'name', 'organizer', 'members', 'city', 'sport', 'capacity', 'tournament_name', 'is_full', 'members_count', 'created_at']
#         read_only_fields = ['created_at']

# class TeamCreateSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Team
#         fields = ['name', 'city', 'sport', 'capacity', 'tournament_name']
# teams/serializers.py

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
