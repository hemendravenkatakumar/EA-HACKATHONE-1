from rest_framework import viewsets, status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from .models import CropPlot, FishPond, ExpenseRecord
from .serializers import CropPlotSerializer, FishPondSerializer, ExpenseRecordSerializer

class CropPlotViewSet(viewsets.ModelViewSet):
    queryset = CropPlot.objects.all().order_by('-created_at')
    serializer_class = CropPlotSerializer
    permission_classes = [AllowAny]

    def get_queryset(self):
        user = self.request.user
        if user.is_authenticated:
            return CropPlot.objects.filter(user=user).order_by('-created_at')
        return CropPlot.objects.all().order_by('-created_at')


class FishPondViewSet(viewsets.ModelViewSet):
    queryset = FishPond.objects.all().order_by('id')
    serializer_class = FishPondSerializer
    permission_classes = [AllowAny]

    def get_queryset(self):
        user = self.request.user
        if user.is_authenticated:
            return FishPond.objects.filter(user=user).order_by('id')
        return FishPond.objects.all().order_by('id')


class ToggleAeratorAPIView(APIView):
    permission_classes = [AllowAny]

    def post(self, request, pond_id):
        try:
            pond = FishPond.objects.get(id=pond_id)
            pond.aerators_active = not pond.aerators_active
            pond.save()
            return Response({
                'id': pond.id,
                'pond_name': pond.pond_name,
                'aerators_active': pond.aerators_active,
                'message': f"Aerators for {pond.pond_name} turned {'ON' if pond.aerators_active else 'OFF'}"
            }, status=status.HTTP_200_OK)
        except FishPond.DoesNotExist:
            return Response({'error': 'Pond not found'}, status=status.HTTP_404_NOT_FOUND)


class ExpenseRecordViewSet(viewsets.ModelViewSet):
    queryset = ExpenseRecord.objects.all().order_by('-expense_date')
    serializer_class = ExpenseRecordSerializer
    permission_classes = [AllowAny]

    def get_queryset(self):
        farm_type = self.request.query_params.get('farm_type')
        qs = ExpenseRecord.objects.all()
        if self.request.user.is_authenticated:
            qs = qs.filter(user=self.request.user)
        if farm_type:
            qs = qs.filter(farm_type=farm_type)
        return qs.order_by('-expense_date')
