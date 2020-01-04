from django.db import models
from django.contrib.auth.models import AbstractUser, Group

class User(AbstractUser):

    class Role(models.TextChoices):
        Customer = 'Customer'
        Driver = 'Driver'
        Operator = 'Operator'
        Accounting = 'Accounting'

    role = models.CharField(default=Role.Customer, choices=Role.choices, max_length=16)

    company = models.CharField(null=True, blank=True, max_length=64)

    photoURL = models.URLField(null=True, blank=True)

    phone = models.CharField(null=True, blank=True, max_length=16)
    
    class Meta:
        db_table = 'user'
        permissions = [
            ("change_group", "Can change the group"),
        ]