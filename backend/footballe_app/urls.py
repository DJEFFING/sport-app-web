from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('users.urls')),
    path('api/', include('teams.urls')),  # teams
    path('api/', include('tournaments.urls')),  # tournaments
    path('api/', include('playerProfile.urls')),  # playerProfile
    path('api/', include('matchs.urls')),  # matchs (if this app exists)
    path('api-auth/', include('rest_framework.urls')),
]
