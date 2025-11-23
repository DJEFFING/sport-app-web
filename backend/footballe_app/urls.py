from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('users.urls')),
    path('api/', include('teams.urls')), #teams
    path('api/', include('tournaments.urls')),  # This is required!
    path('api/', include('matchs.urls')), #match
    path("api/", include("playerProfile.urls")), #player
    path('api-auth/', include('rest_framework.urls')),
]
