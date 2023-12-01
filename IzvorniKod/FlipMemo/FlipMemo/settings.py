"""
Django settings for FlipMemo project.

Generated by 'django-admin startproject' using Django 4.2.7.

For more information on this file, see
https://docs.djangoproject.com/en/4.2/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/4.2/ref/settings/
"""

from pathlib import Path
import os, re
from urllib.parse import urlparse

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent


# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/4.2/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = 'django-insecure-1t2f#e%+^f03#5k(^79!00d=he88(t&jas6n$!m$%naxl_cmpd'

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True

ALLOWED_HOSTS = []

# Application definition

INSTALLED_APPS = [
    'corsheaders',
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'rest_framework',

    #Local
    'main',
]

REST_FRAMEWORK = {
    'DEFAULT_PERMISSION_CLASSES': [
        'rest_framework.permissions.IsAuthenticated',
    ],
    'DEFAULT_AUTHENTICATION_CLASSES': [
        'rest_framework.authentication.SessionAuthentication',
    ]
}

MIDDLEWARE = [
    "django.middleware.security.SecurityMiddleware",
    "django.contrib.sessions.middleware.SessionMiddleware",
    "corsheaders.middleware.CorsMiddleware",
    "django.middleware.common.CommonMiddleware",
    "django.middleware.csrf.CsrfViewMiddleware",
    "django.contrib.auth.middleware.AuthenticationMiddleware",
    "django.contrib.messages.middleware.MessageMiddleware",
    "django.middleware.clickjacking.XFrameOptionsMiddleware",
]

ROOT_URLCONF = 'FlipMemo.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': ['templates'],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'FlipMemo.wsgi.application'


# Database
# https://docs.djangoproject.com/en/4.2/ref/settings/#databases

full_db_string = urlparse(os.environ["DB_CONNECTION_STRING"])
host = full_db_string.netloc
username = full_db_string.username
password = full_db_string.password
auth_source = full_db_string.path.split('/')[0]
match = re.search(r'@([^.]*)\.', os.environ["DB_CONNECTION_STRING"])
database_name = match.group(1)


DATABASES = {
    'default': {
        'ENGINE': 'djongo',
        'NAME': "CanonPrinterDB",
        'ENFORCE_SCHEMA': False,
        'CLIENT': {
            'host': os.environ["DB_CONNECTION_STRING"] + 'CanonPrinterDB?retryWrites=true',
            "username": username,
            "password": password,       
            "authMechanism": "SCRAM-SHA-1",
        },
        'TEST': {
            'NAME': 'testDB',
        }
    }
}

# Password validation
# https://docs.djangoproject.com/en/4.2/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]


# Internationalization
# https://docs.djangoproject.com/en/4.2/topics/i18n/

LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'UTC'

USE_I18N = True

USE_TZ = True


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/4.2/howto/static-files/

STATIC_URL = 'static/'
LOGIN_REDIRECT_URL = '/profile'
LOGIN_URL = 'login/'

EMAIL_HOST = 'smtp.gmail.com'
EMAIL_PORT = 587
EMAIL_HOST_USER = 'lov587395@gmail.com'
EMAIL_HOST_PASSWORD = 'ydmeetcbtbjahpzw'
EMAIL_BACKEND = 'django.core.mail.backends.smtp.EmailBackend'
EMAIL_USE_TLS = True
EMAIL_USE_SSL = False
EMAIL_TIMEOUT = 5

# Default primary key field type
# https://docs.djangoproject.com/en/4.2/ref/settings/#default-auto-field

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'

# FlipMemo dev settings
AUTH_USER_MODEL = 'main.CustomUser'


#CORS_ALLOW_ALL_ORIGINS = True


CORS_ALLOWED_ORIGINS = [
     'http://localhost:3000',
]

CSRF_TRUSTED_ORIGINS = [
     'http://localhost:3000',
]

CORS_ORIGIN_WHITELIST = [
     'http://localhost:3000',
]


CORS_ALLOW_HEADERS = ['*']



AUTHENTICATION_BACKENDS = ['main.auth_backends.FlipMemoAuthBackend']
CORS_ALLOW_CREDENTIALS = True
#CSRF_COOKIE_HTTPONLY = True


"""
CORS_ALLOW_HEADERS = [
    'accept',
    'accept-encoding',
    'authorization',
    'Content-Type',
    'dnt',
    'origin',
    'user-agent',
    'x-csrftoken',
    'x-requested-with',
    'csrf',
    'mail',
    'password',
]
"""

CSRF_COOKIE_HTTPONLY = False
CSRF_COOKIE_SECURE = False
CSRF_COOKIE_SAMESITE = None
#CSRF_COOKIE_NAME = "XSRF-TOKEN"
