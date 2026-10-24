from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from .mongo_views import MongoStatusAPIView, MongoTestAPIView, MongoCollectionsAPIView, MongoSyncAPIView

@api_view(['GET'])
@permission_classes([AllowAny])
def api_root_status(request):
    return Response({
        'status': 'online',
        'service': 'AgroVoice AI Smart Farming & Aquaculture Backend',
        'version': '1.0.0',
        'supported_languages': ['en', 'te', 'hi', 'ta', 'kn'],
        'endpoints': {
            'auth': '/api/v1/auth/',
            'farms': '/api/v1/farms/',
            'assistant': '/api/v1/assistant/',
            'mongodb_status': '/api/mongodb/status/',
            'mongodb_test': '/api/mongodb/test/',
            'mongodb_collections': '/api/mongodb/collections/',
            'mongodb_sync': '/api/mongodb/sync/',
            'admin': '/admin/'
        }
    })

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', api_root_status, name='api-root'),
    path('api/v1/auth/', include('apps.users.urls')),
    path('api/auth/', include('apps.users.urls')),
    path('api/v1/farms/', include('apps.farms.urls')),
    path('api/farms/', include('apps.farms.urls')),
    path('api/v1/assistant/', include('apps.assistant.urls')),
    path('api/assistant/', include('apps.assistant.urls')),
    
    # MongoDB Atlas Endpoints
    path('api/mongodb/status/', MongoStatusAPIView.as_view(), name='mongo-status'),
    path('api/v1/mongodb/status/', MongoStatusAPIView.as_view(), name='v1-mongo-status'),
    path('api/mongodb/test/', MongoTestAPIView.as_view(), name='mongo-test'),
    path('api/v1/mongodb/test/', MongoTestAPIView.as_view(), name='v1-mongo-test'),
    path('api/mongodb/collections/', MongoCollectionsAPIView.as_view(), name='mongo-collections'),
    path('api/v1/mongodb/collections/', MongoCollectionsAPIView.as_view(), name='v1-mongo-collections'),
    path('api/mongodb/sync/', MongoSyncAPIView.as_view(), name='mongo-sync'),
    path('api/v1/mongodb/sync/', MongoSyncAPIView.as_view(), name='v1-mongo-sync'),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
