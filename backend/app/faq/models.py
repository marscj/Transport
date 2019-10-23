from django.db import models

# Create your models here.
class Faq(models.Model):
    categoryId = models.IntegerField()
    question = models.CharField(null=True, blank=True, max_length=128)
    answer = models.TextField()
    
    