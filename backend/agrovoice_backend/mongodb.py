"""
AgroVoice AI MongoDB Atlas Facade
Modularized into sub-modules (< 150 lines each) for clean architecture.
"""
from .mongodb_client import (
    sanitize_uri,
    is_placeholder_uri,
    get_mongodb_client,
    get_mongodb_db,
    check_mongo_connection,
)
from .mongodb_collections import (
    get_users_collection,
    get_crop_farms_collection,
    get_fish_farms_collection,
    get_chat_history_collection,
    get_farm_reports_collection,
    get_farming_guidance_collection,
    init_database_collections,
)
from .mongodb_probes import test_mongo_read_write

__all__ = [
    'sanitize_uri',
    'is_placeholder_uri',
    'get_mongodb_client',
    'get_mongodb_db',
    'check_mongo_connection',
    'get_users_collection',
    'get_crop_farms_collection',
    'get_fish_farms_collection',
    'get_chat_history_collection',
    'get_farm_reports_collection',
    'get_farming_guidance_collection',
    'init_database_collections',
    'test_mongo_read_write',
]
