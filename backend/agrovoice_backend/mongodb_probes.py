import os
import time
from typing import Dict, Any
from .mongodb_client import check_mongo_connection, get_mongodb_db


def test_mongo_read_write() -> Dict[str, Any]:
    """
    Performs an end-to-end Read and Write test against MongoDB Atlas.
    Inserts a probe document, verifies retrieval, and cleans it up.
    """
    conn_status = check_mongo_connection()
    if not conn_status.get('connected'):
        return {
            'success': False,
            'connection_status': conn_status,
            'message': 'Cannot run Read/Write test: MongoDB Atlas is not connected yet.'
        }

    try:
        db = get_mongodb_db()
        if db is None:
            return {'success': False, 'message': 'Database reference unavailable.'}

        test_col = db['_connection_tests']
        test_payload = {
            'test_key': 'atlas_verification_probe',
            'platform': 'AgroVoice AI Farm Platform',
            'timestamp': time.time(),
            'modules_tested': ['users', 'crop_farms', 'fish_farms', 'chat_history', 'farm_reports'],
            'verified': True
        }

        # 1. Write Test
        start_write = time.time()
        insert_res = test_col.insert_one(test_payload)
        write_time_ms = round((time.time() - start_write) * 1000, 2)

        # 2. Read Test
        start_read = time.time()
        retrieved_doc = test_col.find_one({'_id': insert_res.inserted_id})
        read_time_ms = round((time.time() - start_read) * 1000, 2)

        if not retrieved_doc:
            return {'success': False, 'message': 'Write succeeded but Read verification failed.'}

        # 3. Clean up
        test_col.delete_one({'_id': insert_res.inserted_id})

        return {
            'success': True,
            'write_verified': True,
            'read_verified': True,
            'inserted_id': str(insert_res.inserted_id),
            'write_latency_ms': write_time_ms,
            'read_latency_ms': read_time_ms,
            'database': os.getenv('MONGODB_DB_NAME', 'agrovoice_ai'),
            'message': f'MongoDB Atlas Read and Write verified! (Write: {write_time_ms}ms, Read: {read_time_ms}ms)'
        }
    except Exception as e:
        return {
            'success': False,
            'write_verified': False,
            'read_verified': False,
            'message': f'Read/Write test error: {str(e)}'
        }
