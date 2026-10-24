from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAuthenticated
from django.contrib.auth import login, logout
from django.contrib.auth.models import User
from .models import FarmerProfile
from .serializers import RegisterSerializer, LoginSerializer, FarmerProfileSerializer

class RegisterView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = RegisterSerializer(data=request.data)
        if serializer.is_valid():
            user, profile = serializer.save()
            login(request, user)
            profile_data = FarmerProfileSerializer(profile).data

            # Mirror to MongoDB Atlas users collection if connected
            try:
                from agrovoice_backend.mongodb import get_users_collection
                import time
                mongo_users = get_users_collection()
                if mongo_users is not None:
                    mongo_users.update_one(
                        {'sql_id': str(user.id)},
                        {
                            '$set': {
                                'sql_id': str(user.id),
                                'name': user.first_name,
                                'email': user.email,
                                'farm_type': profile.farm_type,
                                'preferred_language': profile.preferred_language,
                                'updated_at': time.time()
                            }
                        },
                        upsert=True
                    )
            except Exception:
                pass

            return Response({
                'message': 'Farmer registered successfully',
                'user': {
                    'id': user.id,
                    'name': user.first_name,
                    'email': user.email,
                    'farm_type': profile.farm_type,
                    'preferred_language': profile.preferred_language
                },
                'profile': profile_data
            }, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class LoginView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = LoginSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.validated_data
            login(request, user)
            profile, _ = FarmerProfile.objects.get_or_create(user=user)
            return Response({
                'message': 'Login successful',
                'user': {
                    'id': user.id,
                    'name': user.first_name or user.username,
                    'email': user.email,
                    'farm_type': profile.farm_type,
                    'preferred_language': profile.preferred_language
                },
                'profile': FarmerProfileSerializer(profile).data
            }, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class LogoutView(APIView):
    def post(self, request):
        logout(request)
        return Response({'message': 'Logged out successfully'}, status=status.HTTP_200_OK)

class ProfileView(APIView):
    permission_classes = [AllowAny]  # Demo friendly, falls back to first profile or mock

    def get(self, request):
        if request.user.is_authenticated:
            profile, _ = FarmerProfile.objects.get_or_create(user=request.user)
            return Response(FarmerProfileSerializer(profile).data)
        
        # Fallback for demo: return latest profile or sample
        first_profile = FarmerProfile.objects.first()
        if first_profile:
            return Response(FarmerProfileSerializer(first_profile).data)
        return Response({
            'username': 'ramesh_patel',
            'name': 'Ramesh Patel',
            'farm_type': 'crop',
            'preferred_language': 'en',
            'state': 'Andhra Pradesh',
            'district': 'Guntur',
            'total_area_acres': 3.0
        })

    def patch(self, request):
        if request.user.is_authenticated:
            profile, _ = FarmerProfile.objects.get_or_create(user=request.user)
            serializer = FarmerProfileSerializer(profile, data=request.data, partial=True)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        return Response({'message': 'Profile updated in demo mode', 'data': request.data})
