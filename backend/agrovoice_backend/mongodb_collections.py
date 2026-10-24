from typing import Dict, Any
from pymongo import ASCENDING, DESCENDING
from .mongodb_client import get_mongodb_db


def get_users_collection():
    """Collection for farmers, preferences, farm types, and profile records."""
    db = get_mongodb_db()
    return db['users'] if db is not None else None


def get_crop_farms_collection():
    """Collection for crop farming plots, sowing schedules, and varieties."""
    db = get_mongodb_db()
    return db['crop_farms'] if db is not None else None


def get_fish_farms_collection():
    """Collection for aquaculture ponds, stocking, aerators, and feed schedules."""
    db = get_mongodb_db()
    return db['fish_farms'] if db is not None else None


def get_chat_history_collection():
    """Collection for AI conversational sessions, queries, and spoken responses."""
    db = get_mongodb_db()
    return db['chat_history'] if db is not None else None


def get_farm_reports_collection():
    """Collection for disease scans, water tests, and agronomy reports."""
    db = get_mongodb_db()
    return db['farm_reports'] if db is not None else None


def get_farming_guidance_collection():
    """Collection for government schemes, pest management, and advisory libraries."""
    db = get_mongodb_db()
    return db['farming_guidance'] if db is not None else None


def init_database_collections() -> Dict[str, Any]:
    """Ensures required collections and performant indexes exist on MongoDB Atlas."""
    db = get_mongodb_db()
    if db is None:
        return {'status': 'error', 'message': 'Database not connected'}

    results = {}
    try:
        db['users'].create_index([('email', ASCENDING)], unique=True, sparse=True)
        db['users'].create_index([('phone', ASCENDING)], sparse=True)
        db['users'].create_index([('farm_type', ASCENDING)])
        results['users'] = 'Indexes configured (email, phone, farm_type)'

        db['crop_farms'].create_index([('user_id', ASCENDING)])
        db['crop_farms'].create_index([('crop_name', ASCENDING)])
        results['crop_farms'] = 'Indexes configured (user_id, crop_name)'

        db['fish_farms'].create_index([('user_id', ASCENDING)])
        db['fish_farms'].create_index([('pond_id', ASCENDING)])
        results['fish_farms'] = 'Indexes configured (user_id, pond_id)'

        db['chat_history'].create_index([('session_id', ASCENDING)])
        db['chat_history'].create_index([('created_at', DESCENDING)])
        db['chat_history'].create_index([('language', ASCENDING)])
        results['chat_history'] = 'Indexes configured (session_id, created_at, language)'

        db['farm_reports'].create_index([('report_type', ASCENDING)])
        db['farm_reports'].create_index([('created_at', DESCENDING)])
        results['farm_reports'] = 'Indexes configured (report_type, created_at)'

        db['farming_guidance'].create_index([('category', ASCENDING)])
        db['farming_guidance'].create_index([('scheme_name', ASCENDING)], sparse=True)
        results['farming_guidance'] = 'Indexes configured (category, scheme_name)'

        return {'status': 'success', 'collections': results}
    except Exception as e:
        return {'status': 'error', 'message': str(e)}
