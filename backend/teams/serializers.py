from rest_framework import serializers
from .models import Team
from django.contrib.auth.models import User

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'first_name', 'last_name']

class TeamSerializer(serializers.ModelSerializer):
    organizer = UserSerializer(read_only=True)
    members = UserSerializer(many=True, read_only=True)
    is_full = serializers.BooleanField(read_only=True)
    members_count = serializers.IntegerField(read_only=True)

    class Meta:
        model = Team
        fields = ['id', 'name', 'organizer', 'members', 'city', 'sport', 'capacity', 'tournament_name', 'is_full', 'members_count', 'created_at']
        read_only_fields = ['created_at']

class TeamCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Team
        fields = ['name', 'city', 'sport', 'capacity', 'tournament_name']
