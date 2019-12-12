from django.db import models
from django.contrib.auth.models import AbstractUser

class CustomUser(AbstractUser):
    
    organization = models.CharField(null=True, blank=True, max_length=64)

    photoURL = models.URLField(null=True, blank=True)
    
    class Meta:
        db_table = 'user'
        permissions = (
            ("view", "Can view user"),
            ("add", "Can add user"),
            ("change", "Can change user"),
            ("delete", "Can delete user"),
            ("export", "Can export user"),
        )