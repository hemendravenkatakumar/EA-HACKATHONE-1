from django.urls import path
from .views import ChatAPIView, ChatHistoryAPIView, DiseaseScanAPIView, TTSAPIView

urlpatterns = [
    path('chat/', ChatAPIView.as_view(), name='assistant-chat'),
    path('history/', ChatHistoryAPIView.as_view(), name='assistant-history'),
    path('scan/', DiseaseScanAPIView.as_view(), name='disease-scan'),
    path('tts/', TTSAPIView.as_view(), name='assistant-tts'),
]
