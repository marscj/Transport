# Generated by Django 3.0 on 2020-01-04 06:36

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('user', '0001_initial'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='user',
            options={'permissions': [('change_group', 'Can change the group')]},
        ),
    ]
