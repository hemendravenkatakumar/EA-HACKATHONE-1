import uuid
from django.db import models
from django.contrib.auth.models import User

class ChatSession(models.Model):
    FARM_TYPES = (
        ('crop', 'Crop Agriculture'),
        ('fish', 'Aquaculture'),
    )
    LANGUAGES = (
        ('en', 'English'),
        ('te', 'Telugu'),
        ('hi', 'Hindi'),
        ('ta', 'Tamil'),
        ('kn', 'Kannada'),
    )

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='chat_sessions', null=True, blank=True)
    session_title = models.CharField(max_length=200, default='New Farming Consultation')
    farm_type = models.CharField(max_length=10, choices=FARM_TYPES, default='crop')
    language = models.CharField(max_length=5, choices=LANGUAGES, default='en')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.session_title} ({self.farm_type} - {self.language})"


class ChatMessage(models.Model):
    SENDER_CHOICES = (
        ('user', 'Farmer'),
        ('assistant', 'AgroVoice AI'),
    )

    session = models.ForeignKey(ChatSession, on_delete=models.CASCADE, related_name='messages')
    sender = models.CharField(max_length=10, choices=SENDER_CHOICES)
    text = models.TextField()
    suggested_route = models.CharField(max_length=50, blank=True, null=True)
    suggested_label = models.CharField(max_length=100, blank=True, null=True)
    audio_url = models.CharField(max_length=300, blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"[{self.sender}] {self.text[:40]}"


class DiseaseScan(models.Model):
    FARM_TYPES = (
        ('crop', 'Plant / Crop Leaf'),
        ('fish', 'Fish / Aquaculture'),
    )

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='disease_scans', null=True, blank=True)
    farm_type = models.CharField(max_length=10, choices=FARM_TYPES, default='crop')
    image = models.ImageField(upload_to='disease_scans/%Y/%m/', null=True, blank=True)
    crop_or_species = models.CharField(max_length=150, default='Paddy / Rice')
    detected_disease = models.CharField(max_length=150)
    telugu_disease_name = models.CharField(max_length=150, blank=True, null=True)
    confidence_percentage = models.DecimalField(max_digits=5, decimal_places=1, default=94.5)
    symptoms = models.JSONField(default=list)
    treatment_organic = models.JSONField(default=list)
    treatment_chemical = models.JSONField(default=list)
    notes = models.TextField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.crop_or_species} - {self.detected_disease} ({self.confidence_percentage}%)"
