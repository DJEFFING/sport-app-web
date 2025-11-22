from rest_framework import serializers
from .models import Tournament

class TournamentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tournament
        fields = ['id', 'name', 'location', 'start_date', 'end_date', 'organizer']
        read_only_fields = ['organizer']
