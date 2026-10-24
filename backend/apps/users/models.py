from django.db import models
from django.contrib.auth.models import User

class FarmerProfile(models.Model):
    FARM_TYPES = (
        ('crop', 'Normal Agriculture / Crop Farming'),
        ('fish', 'Aquaculture / Fish Farming'),
    )

    LANGUAGES = (
        ('en', 'English'),
        ('te', 'Telugu (తెలుగు)'),
        ('hi', 'Hindi (हिन्दी)'),
        ('ta', 'Tamil (தமிழ்)'),
        ('kn', 'Kannada (ಕನ್ನಡ)'),
    )

    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='farmer_profile')
    phone_number = models.CharField(max_length=15, blank=True, null=True)
    farm_type = models.CharField(max_length=10, choices=FARM_TYPES, default='crop')
    preferred_language = models.CharField(max_length=5, choices=LANGUAGES, default='en')
    state = models.CharField(max_length=100, default='Andhra Pradesh')
    district = models.CharField(max_length=100, default='Guntur')
    village = models.CharField(max_length=100, blank=True, null=True)
    total_area_acres = models.DecimalField(max_digits=6, decimal_places=2, default=3.0)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.user.username} ({self.get_farm_type_display()} - {self.preferred_language})"
