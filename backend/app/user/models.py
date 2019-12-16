from django.db import models
from django.contrib.auth.models import AbstractUser, Group

class User(AbstractUser):
    
    # class UserType(models.IntegerChoices):
    #     Customer = 1
    #     Driver = 2
    #     Operator = 3
    #     Accounting = 4

    company = models.CharField(null=True, blank=True, max_length=64)

    photoURL = models.URLField(null=True, blank=True)

    name = models.CharField(null=True, blank=True, max_length=150)

    phone = models.CharField(null=True, blank=True, max_length=16)

    # user_type = models.IntegerField(choices=UserType.choices, default=UserType.Customer)
    
    class Meta:
        db_table = 'user'

class Role(Group):

    class Meta:
        db_table = 'role'