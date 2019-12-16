# Generated by Django 3.0 on 2019-12-16 12:47

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='VehicleModel',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(blank=True, max_length=64, null=True)),
                ('model', models.IntegerField(choices=[(5, 'Car'), (11, 'Bus')], default=11)),
                ('passengers', models.IntegerField(default=5)),
            ],
            options={
                'db_table': 'model',
            },
        ),
        migrations.CreateModel(
            name='Vehicle',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('license_plate', models.CharField(blank=True, max_length=64, null=True)),
                ('is_active', models.BooleanField(default=True)),
                ('driver', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='vehicle', to=settings.AUTH_USER_MODEL)),
                ('model', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='vehicle', to='vehicle.VehicleModel')),
            ],
            options={
                'db_table': 'vehicle',
            },
        ),
        migrations.CreateModel(
            name='Price',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('itinerary', models.CharField(blank=True, max_length=64, null=True)),
                ('price', models.DecimalField(decimal_places=2, max_digits=8)),
                ('cost_price', models.DecimalField(decimal_places=2, max_digits=8)),
                ('model', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='price', to='vehicle.VehicleModel')),
            ],
            options={
                'db_table': 'price',
            },
        ),
    ]
