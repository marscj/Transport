from django.db import models
from django.contrib.auth.models import AbstractUser, Group

class User(AbstractUser):
    
    organization = models.CharField(null=True, blank=True, max_length=64)

    photoURL = models.URLField(null=True, blank=True)
    
    class Meta:
        db_table = 'user'

class Role(Group):

    class Meta:
        db_table = 'role'