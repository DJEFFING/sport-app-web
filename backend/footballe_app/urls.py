from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/teams/', include('teams.urls')),
    path('api/tournaments/', include('tournaments.urls')),  # This is required!
    path('api-auth/', include('rest_framework.urls')),
]
