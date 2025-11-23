from rest_framework import serializers
from .models import Tournament

# Le serializer convertit les instances Python (modèles) en JSON 
# et valide les données entrantes.
class TournamentSerializer(serializers.ModelSerializer):
    # Affichage du nom d'utilisateur au lieu de l'ID pour 'organizer' (lecture seule)
    organizer_username = serializers.ReadOnlyField(source='organizer.full_name')

    class Meta:
        model = Tournament
        fields = [
            'id', 
            'name', 
            'location', 
            'start_date', 
            'end_date',  
            'organizer_username'
        ]
        # Champs de lecture seule. Django remplira l'organizer à la création.
        # read_only_fields = ('organizer',)