from django.db import models
from django.contrib.auth.models import User

class Team(models.Model):
    name = models.CharField(max_length=100)
    organizer = models.ForeignKey(User, on_delete=models.CASCADE, related_name='organized_teams')
    members = models.ManyToManyField(User, related_name='teams', blank=True)
    city = models.CharField(max_length=100, blank=True, null=True)
    sport = models.CharField(max_length=50, blank=True, null=True)
    capacity = models.PositiveIntegerField(default=11)  # Default football team size?
    tournament_name = models.CharField(max_length=100, blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name

    @property
    def is_full(self):
        return self.members.count() >= self.capacity

    @property
    def members_count(self):
        return self.members.count()
