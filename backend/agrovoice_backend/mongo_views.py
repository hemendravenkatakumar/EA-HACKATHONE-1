from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import AllowAny
from .mongodb import (
    check_mongo_connection,
    test_mongo_read_write,
    init_database_collections,
    get_mongodb_db,
)
from .mongo_sync_view import MongoSyncAPIView

__all__ = ['MongoStatusAPIView', 'MongoTestAPIView', 'MongoCollectionsAPIView', 'MongoSyncAPIView']


class MongoStatusAPIView(APIView):
    """Checks live MongoDB Atlas connection status and collections."""
    permission_classes = [AllowAny]

    def get(self, request):
        status_data = check_mongo_connection()
        return Response(status_data, status=status.HTTP_200_OK)


class MongoTestAPIView(APIView):
    """Executes a real-time Read and Write round-trip verification on MongoDB Atlas."""
    permission_classes = [AllowAny]

    def get(self, request):
        return self._run_test()

    def post(self, request):
        return self._run_test()

    def _run_test(self):
        result = test_mongo_read_write()
        status_code = status.HTTP_200_OK if result.get('success') else status.HTTP_400_BAD_REQUEST
        return Response(result, status=status_code)


class MongoCollectionsAPIView(APIView):
    """Returns document counts and schemas across all AgroVoice AI MongoDB collections."""
    permission_classes = [AllowAny]

    def get(self, request):
        db = get_mongodb_db()
        if db is None:
            return Response({
                'connected': False,
                'message': 'MongoDB Atlas is not connected yet.',
                'status': check_mongo_connection()
            }, status=status.HTTP_200_OK)

        try:
            collections_info = {
                'users': db['users'].count_documents({}),
                'crop_farms': db['crop_farms'].count_documents({}),
                'fish_farms': db['fish_farms'].count_documents({}),
                'chat_history': db['chat_history'].count_documents({}),
                'farm_reports': db['farm_reports'].count_documents({}),
                'farming_guidance': db['farming_guidance'].count_documents({})
            }
            return Response({
                'connected': True,
                'database': db.name,
                'collections': collections_info,
                'indexes_status': init_database_collections()
            }, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'connected': False, 'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
