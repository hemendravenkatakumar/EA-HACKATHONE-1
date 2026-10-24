import datetime
from django.core.management.base import BaseCommand
from django.contrib.auth.models import User
from apps.users.models import FarmerProfile
from apps.farms.models import CropPlot, FishPond, ExpenseRecord

class Command(BaseCommand):
    help = 'Seeds initial demonstration data for Indian farmers and aquaculture'

    def handle(self, *args, **kwargs):
        self.stdout.write("Seeding AgroVoice demo data...")

        # Create or update demo farmer
        user, created = User.objects.get_or_create(
            username='ramesh_patel',
            defaults={
                'email': 'ramesh.farmer@agrovoice.ai',
                'first_name': 'Ramesh Patel'
            }
        )
        if created:
            user.set_password('agrovoice2026')
            user.save()

        profile, _ = FarmerProfile.objects.get_or_create(
            user=user,
            defaults={
                'phone_number': '+91 98765 43210',
                'farm_type': 'crop',
                'preferred_language': 'en',
                'state': 'Andhra Pradesh',
                'district': 'Guntur',
                'total_area_acres': 3.0
            }
        )

        # Seed Crop Plots
        if CropPlot.objects.count() == 0:
            CropPlot.objects.create(
                user=user,
                plot_name='Plot 1: Main Paddy Field',
                crop_name='Paddy / Rice (వరి - BPT 5204)',
                area_acres=2.0,
                sowing_date=datetime.date(2026, 6, 20),
                expected_yield_quintals=48.0,
                status='vegetative',
                soil_type='Black Cotton Heavy Clay',
                irrigation_source='Canal + Solar Pump'
            )
            CropPlot.objects.create(
                user=user,
                plot_name='Plot 2: Hybrid Maize',
                crop_name='Maize / Corn (మొక్కజొన్న)',
                area_acres=1.0,
                sowing_date=datetime.date(2026, 7, 5),
                expected_yield_quintals=24.0,
                status='flowering',
                soil_type='Red Sandy Loam',
                irrigation_source='Borewell Drip'
            )

        # Seed Fish Ponds
        if FishPond.objects.count() == 0:
            FishPond.objects.create(
                user=user,
                pond_name='Pond 1: Rohu Nursery',
                species_name='Rohu Fingerlings (లబేయో రోహిత)',
                water_area_hectares=1.0,
                stock_count=15000,
                stocking_date=datetime.date(2026, 6, 15),
                avg_weight_grams=180.0,
                aerators_count=2,
                aerators_active=False,
                morning_do_mg_l=5.4,
                water_status='Optimal',
                last_fed_text='Today, 8:30 AM (45 kg)'
            )
            FishPond.objects.create(
                user=user,
                pond_name='Pond 2: Grow-Out Carps',
                species_name='Rohu (80%) + Catla (20%)',
                water_area_hectares=2.0,
                stock_count=8400,
                stocking_date=datetime.date(2026, 5, 10),
                avg_weight_grams=520.0,
                aerators_count=4,
                aerators_active=True,
                morning_do_mg_l=3.8,
                water_status='Review',
                last_fed_text='Today, 8:45 AM (92 kg)'
            )
            FishPond.objects.create(
                user=user,
                pond_name='Pond 3: Pangasius High-Density',
                species_name='Pangasius bocourti (పంకాస్)',
                water_area_hectares=1.5,
                stock_count=18000,
                stocking_date=datetime.date(2026, 4, 1),
                avg_weight_grams=750.0,
                aerators_count=4,
                aerators_active=True,
                morning_do_mg_l=4.9,
                water_status='Optimal',
                last_fed_text='Today, 9:00 AM (140 kg)'
            )

        # Seed Expenses
        if ExpenseRecord.objects.count() == 0:
            ExpenseRecord.objects.create(
                user=user,
                farm_type='crop',
                title='Certified Paddy Seeds (BPT 5204)',
                category='seeds',
                amount_inr=4500.0,
                expense_date=datetime.date(2026, 6, 18)
            )
            ExpenseRecord.objects.create(
                user=user,
                farm_type='crop',
                title='Urea & Zinc Sulphate Top Dressing',
                category='fertilizer',
                amount_inr=6500.0,
                expense_date=datetime.date(2026, 7, 10)
            )
            ExpenseRecord.objects.create(
                user=user,
                farm_type='fish',
                title='Floating Pellet Feed (28% Protein, 50 bags)',
                category='feed',
                amount_inr=32000.0,
                expense_date=datetime.date(2026, 7, 1)
            )

        self.stdout.write(self.style.SUCCESS("Successfully seeded AgroVoice demo data!"))
