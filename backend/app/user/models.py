from django.db import models
from django.contrib.auth.models import AbstractUser

from app.organization.models import Organization

class CustomUser(AbstractUser):
    
    organization = models.ForeignKey(Organization, on_delete=models.SET_NULL, related_name='user', null=True, blank=True)
    
    class Meta:
        db_table = 'user'
