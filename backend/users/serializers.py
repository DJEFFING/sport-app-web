from rest_framework import serializers
from .models import User

class UserSerializer(serializers.ModelSerializer):  # ModelSerializer, pas Serializer
    class Meta:
        model = User
        fields = [
            'id',
            'clerk_id',
            'email',      # Correction de la virgule
            'full_name',
            'role'
        ]