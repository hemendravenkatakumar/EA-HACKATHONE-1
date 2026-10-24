from rest_framework import serializers
from .models import ChatSession, ChatMessage, DiseaseScan

class ChatMessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ChatMessage
        fields = ['id', 'sender', 'text', 'suggested_route', 'suggested_label', 'audio_url', 'created_at']


class ChatSessionSerializer(serializers.ModelSerializer):
    messages = ChatMessageSerializer(many=True, read_only=True)

    class Meta:
        model = ChatSession
        fields = ['id', 'session_title', 'farm_type', 'language', 'created_at', 'messages']


class DiseaseScanSerializer(serializers.ModelSerializer):
    class Meta:
        model = DiseaseScan
        fields = '__all__'
