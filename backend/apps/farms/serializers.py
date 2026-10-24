from rest_framework import serializers
from .models import CropPlot, FishPond, ExpenseRecord

class CropPlotSerializer(serializers.ModelSerializer):
    class Meta:
        model = CropPlot
        fields = '__all__'


class FishPondSerializer(serializers.ModelSerializer):
    class Meta:
        model = FishPond
        fields = '__all__'


class ExpenseRecordSerializer(serializers.ModelSerializer):
    category_display = serializers.CharField(source='get_category_display', read_only=True)

    class Meta:
        model = ExpenseRecord
        fields = '__all__'
