from django.db import models
import uuid

# Importez les modèles nécessaires
# from users.models import User
# from teams.models import Team

class JoinRequest(models.Model):
    """
    Modèle représentant une demande d'adhésion d'un joueur à une équipe.
    """
    
    # --- Constantes pour les Choix de Statut (Meilleure Pratique) ---
    # Correction des guillemets
    STATUS_CHOICES = [
        ('pending', 'En attente'),
        ('accepted', 'Accepté'),
        ('rejected', 'Refusé'),
    ]

    # --- Champs d'Identification ---
    
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    
    # --- Relations ---
    
    # Lien One-to-Many vers User (le joueur qui fait la demande)
    player = models.ForeignKey(
        'users.User', 
        on_delete=models.CASCADE,
        related_name='join_requests',
        verbose_name="Joueur demandeur"
    )
    
    # Lien One-to-Many vers Team (l'équipe ciblée par la demande)
    team = models.ForeignKey(
        'teams.Team', 
        on_delete=models.CASCADE,
        related_name='join_requests',
        verbose_name="Équipe ciblée"
    )
    
    # --- Champs d'Information ---
    
    status = models.CharField(
        max_length=20, 
        choices=STATUS_CHOICES,
        default='pending'
    )
    message = models.TextField(blank=True)
    
    # --- Champs Temporels ---
    
    created_at = models.DateTimeField(auto_now_add=True)
    # Champ mis à jour à chaque modification de l'objet (ex: changement de statut)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'join_requests'
        verbose_name = "Demande d'Adhésion"
        verbose_name_plural = "Demandes d'Adhésion"
        ordering = ['-created_at'] # Tri par défaut : les plus récentes en premier
        
        # S'assure qu'un joueur ne peut faire qu'une seule demande par équipe
        unique_together = ['player', 'team'] 

    def __str__(self):
        """Représentation en chaîne de caractères de l'objet."""
        return f"Demande de {self.player} pour {self.team} - Statut: {self.get_status_display()}"