from django.db import models
from django.contrib.auth.models import AbstractUser

class CustomUser(AbstractUser):
    
    organization = models.CharField()
    class Meta:
        db_table = 'user'
