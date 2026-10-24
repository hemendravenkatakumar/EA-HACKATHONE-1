import os
import re
import time
from pathlib import Path
from typing import Dict, Any, Optional
from pymongo import MongoClient
from pymongo.errors import ServerSelectionTimeoutError, OperationFailure, ConfigurationError
from dotenv import load_dotenv

backend_env = Path(__file__).resolve().parent.parent / '.env'
if backend_env.exists():
    load_dotenv(dotenv_path=backend_env)
else:
    load_dotenv()

MONGODB_URI = os.getenv('MONGODB_URI', '').strip()
MONGODB_DB_NAME = os.getenv('MONGODB_DB_NAME', 'agrovoice_ai').strip()

_mongo_client: Optional[MongoClient] = None


def sanitize_uri(uri: str) -> str:
    """Masks credentials in MongoDB URI for safe logging and display."""
    if not uri:
        return 'Not configured'
    return re.sub(r'://([^:]+):([^@]+)@', r'://\1:****@', uri)


def is_placeholder_uri(uri: str) -> bool:
    """Checks if the URI still contains template placeholders."""
    if not uri:
        return True
    return any(p in uri for p in ['<db_username>', '<db_password>', '<password>', '<username>'])


def get_mongodb_client() -> Optional[MongoClient]:
    """Returns a singleton MongoClient instance connected to MongoDB Atlas."""
    global _mongo_client
    if _mongo_client is not None:
        return _mongo_client

    uri = os.getenv('MONGODB_URI', MONGODB_URI).strip()
    if not uri or is_placeholder_uri(uri):
        return None

    try:
        _mongo_client = MongoClient(
            uri,
            serverSelectionTimeoutMS=5000,
            connectTimeoutMS=5000,
            socketTimeoutMS=5000,
            appname='AgroVoice-AI-Farm-Platform'
        )
        return _mongo_client
    except Exception as e:
        print(f"[AgroVoice MongoDB] Failed to instantiate MongoClient: {str(e)}")
        return None


def get_mongodb_db():
    """Returns the AgroVoice AI Database handle from MongoDB Atlas."""
    client = get_mongodb_client()
    if client is None:
        return None
    db_name = os.getenv('MONGODB_DB_NAME', MONGODB_DB_NAME)
    return client[db_name]


def check_mongo_connection() -> Dict[str, Any]:
    """Tests live connectivity to MongoDB Atlas cluster with diagnostics."""
    uri = os.getenv('MONGODB_URI', '').strip()
    db_name = os.getenv('MONGODB_DB_NAME', 'agrovoice_ai').strip()

    if not uri:
        return {
            'connected': False,
            'status': 'unconfigured',
            'database': db_name,
            'message': 'MONGODB_URI is not set in backend/.env',
            'troubleshooting': ['Add MONGODB_URI=... in backend/.env', 'Set MONGODB_DB_NAME=agrovoice_ai']
        }

    if is_placeholder_uri(uri):
        return {
            'connected': False,
            'status': 'credentials_required',
            'database': db_name,
            'masked_uri': sanitize_uri(uri),
            'message': 'Placeholder credentials detected in MONGODB_URI. Actual database username and password needed.',
            'troubleshooting': [
                'Open backend/.env in your text editor.',
                'Replace <db_username> with your MongoDB Atlas database user.',
                'Replace <db_password> with your database user password.',
                'Ensure Atlas Network Access has 0.0.0.0/0 or your current IP enabled.'
            ]
        }

    client = None
    try:
        start_time = time.time()
        client = MongoClient(uri, serverSelectionTimeoutMS=4000, connectTimeoutMS=4000, socketTimeoutMS=4000)
        client.admin.command('ping')
        latency_ms = round((time.time() - start_time) * 1000, 2)
        db = client[db_name]
        return {
            'connected': True,
            'status': 'active',
            'database': db_name,
            'cluster': 'Cluster0 (cluster0.4sc5uom.mongodb.net)',
            'masked_uri': sanitize_uri(uri),
            'latency_ms': latency_ms,
            'collections': db.list_collection_names(),
            'collections_count': len(db.list_collection_names()),
            'message': f'Successfully connected to MongoDB Atlas database "{db_name}" ({latency_ms}ms latency).'
        }
    except ServerSelectionTimeoutError as e:
        return {
            'connected': False,
            'status': 'connection_timeout',
            'database': db_name,
            'masked_uri': sanitize_uri(uri),
            'message': 'Connection timed out while trying to reach MongoDB Atlas Cluster0.',
            'troubleshooting': ['Check Atlas Network Access for 0.0.0.0/0', 'Check internet and DNS.'],
            'error_details': str(e)
        }
    except OperationFailure as e:
        return {
            'connected': False,
            'status': 'authentication_failed',
            'database': db_name,
            'masked_uri': sanitize_uri(uri),
            'message': 'MongoDB Atlas Authentication failed. Invalid username or password.',
            'troubleshooting': ['Verify database user credentials in MongoDB Atlas Database Access.'],
            'error_details': str(e)
        }
    except Exception as e:
        return {
            'connected': False,
            'status': 'error',
            'database': db_name,
            'masked_uri': sanitize_uri(uri),
            'message': f'MongoDB Atlas connection failed: {str(e)}',
            'error_details': str(e)
        }
    finally:
        if client:
            client.close()
