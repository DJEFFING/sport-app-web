from rest_framework.routers import DefaultRouter
from .views import TournamentViewSet
from django.urls import path, include

# Le DefaultRouter gère toutes les routes CRUD pour le ViewSet
router = DefaultRouter()
router.register(r'tournaments', TournamentViewSet, basename='tournament')

# Les patterns d'URL générés par le router
urlpatterns = [path('', include(router.urls))]