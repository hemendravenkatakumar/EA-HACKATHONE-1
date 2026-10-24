from django.db import models
from django.contrib.auth.models import User

class CropPlot(models.Model):
    STATUS_CHOICES = (
        ('vegetative', 'Vegetative Stage'),
        ('flowering', 'Flowering / Tillering'),
        ('grain_filling', 'Grain Filling / Maturing'),
        ('harvest_ready', 'Ready for Harvest'),
        ('fallow', 'Fallow / Post-Harvest'),
    )

    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='crop_plots', null=True, blank=True)
    plot_name = models.CharField(max_length=120, default='Plot 1 (North Field)')
    crop_name = models.CharField(max_length=120, default='Paddy / Rice (వరి)')
    area_acres = models.DecimalField(max_digits=5, decimal_places=2, default=3.0)
    sowing_date = models.DateField(null=True, blank=True)
    expected_yield_quintals = models.DecimalField(max_digits=6, decimal_places=2, default=72.0)
    status = models.CharField(max_length=30, choices=STATUS_CHOICES, default='vegetative')
    soil_type = models.CharField(max_length=100, default='Black Cotton Clay')
    irrigation_source = models.CharField(max_length=100, default='Borewell + Canal')
    notes = models.TextField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.plot_name} - {self.crop_name} ({self.area_acres} Acres)"


class FishPond(models.Model):
    STATUS_CHOICES = (
        ('Optimal', 'Optimal Condition'),
        ('Review', 'Needs Review / Observation'),
        ('Critical', 'Critical Intervention Required'),
    )

    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='fish_ponds', null=True, blank=True)
    pond_name = models.CharField(max_length=120, default='Pond 1: Nursery Carps')
    species_name = models.CharField(max_length=150, default='Rohu & Catla (లబేయో రోహిత)')
    water_area_hectares = models.DecimalField(max_digits=5, decimal_places=2, default=1.0)
    stock_count = models.IntegerField(default=15000)
    stocking_date = models.DateField(null=True, blank=True)
    avg_weight_grams = models.DecimalField(max_digits=6, decimal_places=1, default=450.0)
    aerators_count = models.IntegerField(default=2)
    aerators_active = models.BooleanField(default=False)
    morning_do_mg_l = models.DecimalField(max_digits=4, decimal_places=2, default=5.4)
    water_temperature_c = models.DecimalField(max_digits=4, decimal_places=1, default=28.0)
    water_status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='Optimal')
    last_fed_text = models.CharField(max_length=150, default='Today, 8:30 AM (45 kg)')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.pond_name} ({self.species_name})"


class ExpenseRecord(models.Model):
    CATEGORY_CHOICES = (
        ('seeds', 'Seeds & Nursery'),
        ('fertilizer', 'Fertilizers & Sprays'),
        ('machinery', 'Tractor & Diesel'),
        ('labor', 'Labor Wages'),
        ('feed', 'Fish Feed Pellets'),
        ('electricity', 'Power & Irrigation'),
        ('transport', 'Transport & Bagging'),
        ('other', 'Miscellaneous / Maintenance'),
    )

    FARM_TYPE_CHOICES = (
        ('crop', 'Crop Farming'),
        ('fish', 'Aquaculture'),
    )

    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='expense_records', null=True, blank=True)
    farm_type = models.CharField(max_length=10, choices=FARM_TYPE_CHOICES, default='crop')
    title = models.CharField(max_length=150)
    category = models.CharField(max_length=30, choices=CATEGORY_CHOICES, default='seeds')
    amount_inr = models.DecimalField(max_digits=10, decimal_places=2)
    expense_date = models.DateField()
    notes = models.TextField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"₹{self.amount_inr} - {self.title} ({self.category})"
