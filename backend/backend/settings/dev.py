from .settings import *

DEBUG = True

ALLOWED_HOSTS = ['ubangservice.com', '127.0.0.1']

SESSION_COOKIE_DOMAIN = 'ubangservice.com'

CACHEOPS_REDIS = "redis://127.0.0.1:6379/0"

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': os.path.join(BASE_DIR, 'db.sqlite3'),
    }
}

JWT_AUTH = {
    'JWT_EXPIRATION_DELTA': datetime.timedelta(days=1), 
    'JWT_AUTH_COOKIE': 'Access-Token',
}