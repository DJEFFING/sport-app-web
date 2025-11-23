from rest_framework import routers
from playerProfile.views import PlayerProfileViewSet

router = routers.DefaultRouter()
router.register(r'playerprofiles', PlayerProfileViewSet)

urlpatterns = router.urls
