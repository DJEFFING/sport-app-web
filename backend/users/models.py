from django.db import models
import uuid

class User(models.Model):
    """
    Modèle utilisateur synchronisé avec Clerk. 
    Contient les informations clés pour le rôle et l'identification externe.
    """
    
    # --- Constantes pour les Choix (Meilleure Pratique) ---
    ROLE_CHOICES = (
        ('player', 'Joueur'),
        ('organizer', 'Organisateur'),
    )

    # --- Champs d'Identification ---
    
    # ID principal de la base de données (UUID standard)
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    
    # ID unique fourni par le service Clerk (clé pour la synchronisation)
    clerk_id = models.CharField(max_length=255, unique=True, verbose_name="Clerk ID")
    
    # --- Champs d'Information ---
    
    email = models.EmailField(unique=True)
    full_name = models.CharField(max_length=255)
    
    # Utilisation des constantes pour la robustesse et la clarté
    role = models.CharField(max_length=20, choices=ROLE_CHOICES)
    
    # --- Champs Temporels ---
    
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        # PEP 8/Conventions : La docstring doit être la première ligne non-champ.
        # db_table est déplacé ici.
        db_table = 'users'
        verbose_name = "Utilisateur Clerk"
        verbose_name_plural = "Utilisateurs Clerk"
        ordering = ['created_at'] # Ajout d'un tri par défaut
        
    def __str__(self):
        """Représentation en chaîne de caractères de l'objet."""
        return f"{self.full_name} ({self.role})"