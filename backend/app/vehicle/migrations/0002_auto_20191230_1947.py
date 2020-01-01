# Generated by Django 3.0 on 2019-12-30 15:47

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('vehicle', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='category',
            name='name',
            field=models.CharField(blank=True, max_length=64, null=True, unique=True),
        ),
        migrations.AlterField(
            model_name='itinerary',
            name='name',
            field=models.CharField(blank=True, max_length=128, null=True, unique=True),
        ),
    ]