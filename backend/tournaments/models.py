from django.db import models
from django.contrib.auth.models import User

class Tournament(models.Model):
    name = models.CharField(max_length=255)
    location = models.CharField(max_length=255, blank=True, null=True)
    start_date = models.DateField()
    end_date = models.DateField()
    organizer = models.ForeignKey(User, related_name='tournaments', on_delete=models.CASCADE)

    def __str__(self):
        return self.name
