import time
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import AllowAny
from .mongodb import get_mongodb_db, get_crop_farms_collection, get_fish_farms_collection


class MongoSyncAPIView(APIView):
    """
    Synchronizes local database records to MongoDB Atlas collections.
    """
    permission_classes = [AllowAny]

    def post(self, request):
        db = get_mongodb_db()
        if db is None:
            return Response({
                'success': False,
                'message': 'Cannot sync: MongoDB Atlas is not connected.'
            }, status=status.HTTP_400_BAD_REQUEST)

        synced_counts = {'crops': 0, 'ponds': 0}
        try:
            from apps.farms.models import CropPlot, FishPond

            crop_col = get_crop_farms_collection()
            if crop_col is not None:
                for plot in CropPlot.objects.all():
                    crop_col.update_one(
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
                                'synced_at': time.time()
                            }
                        },
                        upsert=True
                    )
                    synced_counts['crops'] += 1

            fish_col = get_fish_farms_collection()
            if fish_col is not None:
                for pond in FishPond.objects.all():
                    fish_col.update_one(
                        {'sql_id': str(pond.id)},
                        {
                            '$set': {
                                'sql_id': str(pond.id),
                                'pond_name': pond.pond_name,
                                'species': pond.primary_species,
                                'stocked_count': pond.stocked_count,
                                'current_average_weight_kg': float(pond.current_average_weight_kg),
                                'aerator_running': pond.aerator_running,
                                'morning_do_level': float(pond.morning_do_level),
                                'water_ph': float(pond.water_ph),
                                'synced_at': time.time()
                            }
                        },
                        upsert=True
                    )
                    synced_counts['ponds'] += 1

            return Response({
                'success': True,
                'message': 'Records successfully synchronized to MongoDB Atlas.',
                'synced_counts': synced_counts
            }, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'success': False, 'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
