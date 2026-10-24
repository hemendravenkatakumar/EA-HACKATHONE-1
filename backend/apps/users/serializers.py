from rest_framework import serializers
from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from .models import FarmerProfile

class FarmerProfileSerializer(serializers.ModelSerializer):
    username = serializers.CharField(source='user.username', read_only=True)
    email = serializers.EmailField(source='user.email', read_only=True)
    first_name = serializers.CharField(source='user.first_name', read_only=True)
    last_name = serializers.CharField(source='user.last_name', read_only=True)

    class Meta:
        model = FarmerProfile
        fields = [
            'id', 'username', 'email', 'first_name', 'last_name',
            'phone_number', 'farm_type', 'preferred_language',
            'state', 'district', 'village', 'total_area_acres', 'created_at'
        ]

class RegisterSerializer(serializers.Serializer):
    name = serializers.CharField(max_length=150)
    email = serializers.EmailField()
    phone = serializers.CharField(max_length=20, required=False, allow_blank=True)
    password = serializers.CharField(write_only=True, min_length=6)
    farm_type = serializers.ChoiceField(choices=['crop', 'fish'], default='crop')
    preferred_language = serializers.ChoiceField(choices=['en', 'te', 'hi', 'ta', 'kn'], default='en')
    state = serializers.CharField(max_length=100, default='Andhra Pradesh')
    district = serializers.CharField(max_length=100, default='Guntur')

    def create(self, validated_data):
        email = validated_data['email']
        name = validated_data['name']
        username = email.split('@')[0] + '_' + str(User.objects.count() + 1)
        
        user = User.objects.create_user(
            username=username,
            email=email,
            password=validated_data['password'],
            first_name=name
        )

        profile = FarmerProfile.objects.create(
            user=user,
            phone_number=validated_data.get('phone', ''),
            farm_type=validated_data.get('farm_type', 'crop'),
            preferred_language=validated_data.get('preferred_language', 'en'),
            state=validated_data.get('state', 'Andhra Pradesh'),
            district=validated_data.get('district', 'Guntur')
        )
        return user, profile

class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True)

    def validate(self, data):
        email = data.get('email')
        password = data.get('password')

        try:
            user = User.objects.get(email=email)
        except User.DoesNotExist:
            user = None

        if user and user.check_password(password):
            return user
        raise serializers.ValidationError("Invalid email or password.")
