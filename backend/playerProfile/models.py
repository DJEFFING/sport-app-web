from django.db import models
# Importation du modèle User précédent (assurez-vous qu'il est défini ou importé correctement)
# from .models import User # Si le modèle User est dans le même fichier
from users.models import User # Si le modèle User est dans une autre app

class PlayerProfile(models.Model):
    """
    Profil étendu pour les joueurs, lié de manière un-à-un au modèle User.
    """
    
    # --- Constantes pour les Choix de Niveau ---
    LEVEL_CHOICES = (
        ('beginner', 'Débutant'),
        ('intermediate', 'Intermédiaire'),
        ('advanced', 'Avancé'),
    )

    # --- Lien au Modèle User ---
    
    # Lien One-to-One : assure que chaque profil est lié à un seul utilisateur.
    user = models.OneToOneField(
        "users.User", # Utiliser la chaîne de caractères si User n'est pas importé ou est défini plus tard
        on_delete=models.CASCADE,
        related_name='player_profile' # Nom du lien inverse (ex: user.player_profile)
    )

    # --- Champs d'Information du Joueur ---

    city = models.CharField(max_length=100, verbose_name="Ville")
    favorite_sport = models.CharField(max_length=50, verbose_name="Sport Favori")
    
    # Utilisation des constantes pour le champ Choices
    level = models.CharField(max_length=20, choices=LEVEL_CHOICES)
    
    # Le champ est optionnel (blank=True)
    position = models.CharField(max_length=50, blank=True)

    class Meta:
        # db_table doit toujours être défini dans Meta
        db_table = 'player_profiles'
        verbose_name = "Profil Joueur"
        verbose_name_plural = "Profils Joueurs"
        
    def __str__(self):
        """Représentation en chaîne de caractères."""
        return f"Profil de {self.user.full_name} ({self.level})"