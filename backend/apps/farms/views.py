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

    def perform_create(self, serializer):
        plot = serializer.save()
        self._mirror_to_mongo(plot)

    def perform_update(self, serializer):
        plot = serializer.save()
        self._mirror_to_mongo(plot)

    def _mirror_to_mongo(self, plot):
        try:
            import time
            from agrovoice_backend.mongodb import get_crop_farms_collection
            col = get_crop_farms_collection()
            if col is not None:
                col.update_one(
                    {'sql_id': str(plot.id)},
                    {
                        '$set': {
                            'sql_id': str(plot.id),
                            'plot_name': plot.plot_name,
                            'crop_name': plot.crop_name,
                            'variety': plot.variety,
                            'area_acres': float(plot.area_acres),
                            'sowing_date': str(plot.sowing_date),
                            'soil_type': plot.soil_type,
                            'irrigation_type': plot.irrigation_type,
                            'crop_stage': plot.crop_stage,
                            'health_status': plot.health_status,
                            'expected_yield_quintals': float(plot.expected_yield_quintals),
                            'updated_at': time.time()
                        }
                    },
                    upsert=True
                )
        except Exception:
            pass


class FishPondViewSet(viewsets.ModelViewSet):
    queryset = FishPond.objects.all().order_by('id')
    serializer_class = FishPondSerializer
    permission_classes = [AllowAny]

    def get_queryset(self):
        user = self.request.user
        if user.is_authenticated:
            return FishPond.objects.filter(user=user).order_by('id')
        return FishPond.objects.all().order_by('id')

    def perform_create(self, serializer):
        pond = serializer.save()
        self._mirror_to_mongo(pond)

    def perform_update(self, serializer):
        pond = serializer.save()
        self._mirror_to_mongo(pond)

    def _mirror_to_mongo(self, pond):
        try:
            import time
            from agrovoice_backend.mongodb import get_fish_farms_collection
            col = get_fish_farms_collection()
            if col is not None:
                col.update_one(
                    {'sql_id': str(pond.id)},
                    {
                        '$set': {
                            'sql_id': str(pond.id),
                            'pond_name': pond.pond_name,
                            'species': pond.primary_species,
                            'stocked_count': pond.stocked_count,
                            'current_average_weight_kg': float(pond.current_average_weight_kg),
                            'aerator_running': pond.aerators_active,
                            'morning_do_level': float(pond.morning_do_level),
                            'water_ph': float(pond.water_ph),
                            'updated_at': time.time()
                        }
                    },
                    upsert=True
                )
        except Exception:
            pass


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
