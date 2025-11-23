from django.db import models
import uuid

# Le modèle Tournament doit être défini ou importé avant ce modèle.
# Exemple : from .tournament import Tournament 
# ou si Tournament est dans une autre application :
from tournaments.models import Tournament 

# Le modèle User doit être défini ou importé
# Exemple : from users.models import User

class Team(models.Model):
    """
    Représente une équipe participant à un tournoi.
    Gère la relation avec les joueurs (User) et le tournoi (Tournament).
    """

    # --- Champs d'Identification ---
    
    # ID principal de la base de données (UUID standard)
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=200, verbose_name="Nom de l'équipe")
    
    # --- Relations ---
    
    # Lien One-to-Many vers Tournament (Chaque équipe appartient à un tournoi)
    tournament = models.ForeignKey(
        Tournament, # Utiliser une chaîne de caractères si le modèle n'est pas importé
        on_delete=models.CASCADE,
        related_name='teams', # Permet d'accéder aux équipes via tournament.teams.all()
        null=True,  
        blank=True,
        verbose_name="Tournoi associé"
    )
    
    # Lien Many-to-Many vers User (Les membres de l'équipe)
    members = models.ManyToManyField(
        'users.User', # Utiliser une chaîne de caractères si le modèle n'est pas importé
        related_name='teams', # Permet d'accéder aux équipes d'un user via user.teams.all()
        blank=True,
        verbose_name="Membres de l'équipe"
    )

    # --- Gestion de la Capacité ---
    
    max_capacity = models.IntegerField(default=15, verbose_name="Capacité maximale")
    current_capacity = models.IntegerField(default=0, verbose_name="Capacité actuelle")
    
    # --- Champs Temporels ---
    
    created_at = models.DateTimeField(auto_now_add=True)

    # --- Propriétés Calculées (@property) ---
    
    @property
    def available_spots(self):
        """Calcule le nombre de places restantes dans l'équipe."""
        # Utiliser len(self.members.all()) pour un calcul dynamique et précis.
        # Remplacer self.current_capacity dans la propriété pour la robustesse.
        return self.max_capacity - self.current_capacity

    @property
    def is_full(self):
        """Vérifie si l'équipe a atteint sa capacité maximale."""
        return self.current_capacity >= self.max_capacity

    class Meta:
        db_table = 'teams'
        verbose_name = "Équipe"
        verbose_name_plural = "Équipes"
        ordering = ['name', 'tournament'] # Ajout d'un tri par défaut

    def __str__(self):
        """Représentation en chaîne de caractères de l'objet."""
        return f"{self.name} ({self.tournament.name if hasattr(self.tournament, 'name') else 'N/A'})"