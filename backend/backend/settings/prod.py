from .settings import *

DEBUG = False

ALLOWED_HOSTS = ['ubangservice.com', '127.0.0.1']

# SESSION_COOKIE_DOMAIN = 'ubangservice.com'

CORS_ORIGIN_ALLOW_ALL = False

# CACHEOPS_REDIS = "redis://redis:6379/0"

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql_psycopg2',
        'NAME': 'postgres',
        'USER': 'postgres',
        'PASSWORD': 'Z)<f[>sOXXcBJ>wi',
        'HOST': 'db_base',
        'PORT': 5432,
    }
}

JWT_AUTH = {
    'JWT_EXPIRATION_DELTA': datetime.timedelta(days=30),
    # 'JWT_AUTH_COOKIE': 'Access-Token',
}

LOGGING = {
    'version': 1,
    'disable_existing_loggers': False,
    'handlers': {
        'console': {
            'level': 'DEBUG',
            'filters': None,
            'class': 'logging.StreamHandler',
        },
    },
    'loggers': {
        'django': {
            'handlers': ['console'],
            'level': 'DEBUG',
        },
    },
}