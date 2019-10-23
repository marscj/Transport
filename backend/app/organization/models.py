from django.db import models

# Create your models here.
class Organization(models.Model):
    name = models.CharField(null=True, blank=True, unique=True, max_length=128)
    contact = models.CharField(null=True, blank=True, max_length=64)