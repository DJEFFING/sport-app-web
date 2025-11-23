# playerProfile/serializers.py

from rest_framework import serializers
from .models import PlayerProfile


class PlayerProfileSerializer(serializers.ModelSerializer):
    """
    Sérialiseur pour le profil joueur.
    """

    user_id = serializers.ReadOnlyField(source="user.id")
    full_name = serializers.ReadOnlyField(source="user.full_name")

    class Meta:
        model = PlayerProfile
        fields = [
            "user_id",
            "full_name",
            "city",
            "favorite_sport",
            "level",
            "position",
        ]
