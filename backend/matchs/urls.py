# matchs/urls.py

from django.urls import path, include
from rest_framework.routers import DefaultRouter

from .views import MatchViewSet

router = DefaultRouter()
router.register(r"matches", MatchViewSet, basename="match")

urlpatterns = [
    # /api/matches/...
    path("", include(router.urls)),
]
