# playerProfile/urls.py

from django.urls import path
from .views import PlayerProfileView

urlpatterns = [
    # /api/player/profile/
    path("player/profile/", PlayerProfileView.as_view(), name="player-profile"),
]
