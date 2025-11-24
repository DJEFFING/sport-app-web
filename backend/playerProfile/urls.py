from rest_framework import routers
from django.urls import path, include
from playerProfile.views import PlayerProfileViewSet

router = routers.DefaultRouter()
router.register(r'playerprofiles', PlayerProfileViewSet)

# Les patterns d'URL générés par le router
urlpatterns = [path('', include(router.urls))]
