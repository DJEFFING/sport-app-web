from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import TeamViewSet, MyTeamsView

router = DefaultRouter()
router.register(r'teams', TeamViewSet, basename='team')

urlpatterns = [
    path('', include(router.urls)),
    path('my-teams/', MyTeamsView.as_view(), name='my-teams'),
]
