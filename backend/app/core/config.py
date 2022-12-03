from functools import lru_cache
from locale import setlocale, LC_ALL

from typing import Type, Dict

from app.core.settings.app import AppSettings
from app.core.settings.base import AppEnv, BaseAppSettings
from app.core.settings.development import DevelopmentAppSettings

environments : Dict[AppEnv, Type[AppSettings]] = {
    AppEnv.Development: DevelopmentAppSettings,
}

setlocale(LC_ALL, 'es_ES.UTF-8')

@lru_cache
def get_app_settings() -> AppSettings:
    app_env = BaseAppSettings().env
    config = environments[app_env]
    return config()