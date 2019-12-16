from django.db import models
from django.contrib.auth.models import AbstractUser, Group

class User(AbstractUser):

    company = models.CharField(null=True, blank=True, max_length=64)

    photoURL = models.URLField(null=True, blank=True)

    name = models.CharField(null=True, blank=True, max_length=150)

    phone = models.CharField(null=True, blank=True, max_length=16)
    
    class Meta:
        db_table = 'user'

class Role(Group):

    class Meta:
        db_table = 'role'