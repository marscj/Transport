from django.db import models

# Create your models here.
class Faq(models.Models):
    categoryId = models.IntegerField()
    question = models.CharField()
    answer = models.TextField()