from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import CropPlotViewSet, FishPondViewSet, ExpenseRecordViewSet, ToggleAeratorAPIView

router = DefaultRouter()
router.register('plots', CropPlotViewSet, basename='plots')
router.register('ponds', FishPondViewSet, basename='ponds')
router.register('expenses', ExpenseRecordViewSet, basename='expenses')

urlpatterns = [
    path('', include(router.urls)),
    path('ponds/<int:pond_id>/toggle-aerator/', ToggleAeratorAPIView.as_view(), name='toggle-aerator'),
]
