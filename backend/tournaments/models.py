import uuid
from django.db import models


class Tournament(models.Model):
    """Tournoi/Ligue créé par un organisateur"""
    # L'ID est maintenant un UUID
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    
    name = models.CharField(max_length=200)
    sport = models.CharField(max_length=50) # Nouveau champ
    city = models.CharField(max_length=100) # Nouveau champ
    
    start_date = models.DateField()
    end_date = models.DateField()
    
    # L'organizer est lié à l'utilisateur Django standard
    organizer = models.ForeignKey(
        'users.User', 
        on_delete=models.CASCADE,
        related_name='tournaments'
    )
    
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = 'tournaments'
        ordering = ['-created_at'] # Tri par défaut

    def __str__(self):
        return self.name