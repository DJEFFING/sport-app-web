# matchs/serializers.py

from rest_framework import serializers
from .models import Match


class MatchSerializer(serializers.ModelSerializer):
    """
    Sérialiseur pour le modèle Match.
    """

    team_a_name = serializers.ReadOnlyField(source="team_a.name")
    team_b_name = serializers.ReadOnlyField(source="team_b.name")
    tournament_id = serializers.ReadOnlyField(source="team_a.tournament.id")
    tournament_name = serializers.ReadOnlyField(source="team_a.tournament.name")

    class Meta:
        model = Match
        fields = [
            "id",
            "team_a",
            "team_a_name",
            "team_b",
            "team_b_name",
            "tournament_id",
            "tournament_name",
            "date",
            "location",
            "score_a",
            "score_b",
            "created_at",
        ]
        read_only_fields = ["created_at", "tournament_id", "tournament_name"]
