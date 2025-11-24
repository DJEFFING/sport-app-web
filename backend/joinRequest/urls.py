# joinRequest/urls.py

from rest_framework.routers import DefaultRouter
from .views import JoinRequestViewSet

router = DefaultRouter()
router.register(r"join-requests", JoinRequestViewSet, basename="join-request")

urlpatterns = router.urls
