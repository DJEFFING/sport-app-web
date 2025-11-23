# teams/urls.py

from django.urls import path, include
from rest_framework.routers import DefaultRouter

from .views import TeamViewSet

router = DefaultRouter()
router.register(r"teams", TeamViewSet, basename="team")

urlpatterns = [
    # /api/teams/...
    path("", include(router.urls)),
]
