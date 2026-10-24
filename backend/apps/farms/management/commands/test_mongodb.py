import sys
from django.core.management.base import BaseCommand
from agrovoice_backend.mongodb import check_mongo_connection, test_mongo_read_write, init_database_collections, get_mongodb_db

class Command(BaseCommand):
    help = 'Tests the MongoDB Atlas database connection, verifies collections and runs read/write probes.'

    def handle(self, *args, **options):
        self.stdout.write(self.style.MIGRATE_HEADING("=== AgroVoice AI MongoDB Atlas Diagnostic Probe ==="))
        
        status = check_mongo_connection()
        self.stdout.write(f"Target Database : {status.get('database')}")
        self.stdout.write(f"Connection URI  : {status.get('masked_uri', 'Not set')}")
        self.stdout.write(f"Connection State: {status.get('status')}")

        if status.get('connected'):
            self.stdout.write(self.style.SUCCESS(f"[SUCCESS] {status.get('message')}"))
            self.stdout.write(f"Cluster Latency : {status.get('latency_ms')} ms")
            self.stdout.write(f"Collections     : {', '.join(status.get('collections', [])) or 'None yet'}")

            # Run read/write test
            self.stdout.write(self.style.MIGRATE_HEADING("\n--- Running Atlas Read/Write Probe ---"))
            probe = test_mongo_read_write()
            if probe.get('success'):
                self.stdout.write(self.style.SUCCESS(f"[SUCCESS] {probe.get('message')}"))
            else:
                self.stdout.write(self.style.ERROR(f"[FAIL] {probe.get('message')}"))

            # Ensure collections & indexes
            self.stdout.write(self.style.MIGRATE_HEADING("\n--- Initializing Collections & Indexes ---"))
            indexes = init_database_collections()
            self.stdout.write(str(indexes))
        else:
            self.stdout.write(self.style.WARNING(f"\n[ATTENTION] {status.get('message')}"))
            troubleshooting = status.get('troubleshooting', [])
            if troubleshooting:
                self.stdout.write(self.style.NOTICE("\nActionable Troubleshooting Steps:"))
                for step in troubleshooting:
                    self.stdout.write(f"  * {step}")
            if status.get('error_details'):
                self.stdout.write(self.style.ERROR(f"\nTechnical Details: {status.get('error_details')}"))
