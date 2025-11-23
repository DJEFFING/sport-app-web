from django.db import models
import uuid

# Importez le modèle Team
from teams.models import Team 

class Match(models.Model):
    """
    Modèle représentant un match programmé entre deux équipes.
    """

    # --- Champs d'Identification ---
    
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    
    # --- Relations One-to-Many vers Team ---
    
    # Équipe A (celle qui joue à domicile ou est listée en premier)
    team_a = models.ForeignKey(
        Team, 
        on_delete=models.CASCADE,
        related_name='matches_as_team_a', # Permet d'accéder aux matchs où l'équipe est l'équipe A
        verbose_name="Équipe A"
    )
    
    # Équipe B
    team_b = models.ForeignKey(
        Team, 
        on_delete=models.CASCADE,
        related_name='matches_as_team_b', # Permet d'accéder aux matchs où l'équipe est l'équipe B
        verbose_name="Équipe B"
    )
    
    # --- Champs de Planification et Résultat ---
    
    date = models.DateTimeField(verbose_name="Date et heure du match")
    location = models.CharField(max_length=200, verbose_name="Lieu")
    
    # Les scores sont facultatifs (null=True, blank=True) car le match peut être non joué
    score_a = models.IntegerField(null=True, blank=True, verbose_name="Score Équipe A")
    score_b = models.IntegerField(null=True, blank=True, verbose_name="Score Équipe B")
    
    # --- Champs Temporels ---
    
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = 'matches'
        verbose_name = "Match"
        verbose_name_plural = "Matchs"
        # Ajout d'une contrainte pour éviter qu'une équipe joue contre elle-même (facultatif mais recommandé)
        constraints = [
            models.CheckConstraint(
                check=~models.Q(team_a=models.F('team_b')), 
                name='teams_must_be_different'
            )
        ]
        ordering = ['date'] # Tri par défaut : du plus ancien au plus récent

    def __str__(self):
        """Représentation en chaîne de caractères de l'objet."""
        score_str = f"({self.score_a}-{self.score_b})" if self.score_a is not None else "(À venir)"
        return f"{self.team_a} vs {self.team_b} le {self.date.strftime('%Y-%m-%d')} {score_str}"