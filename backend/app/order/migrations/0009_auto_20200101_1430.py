# Generated by Django 3.0 on 2020-01-01 10:30

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('order', '0008_auto_20191231_1450'),
    ]

    operations = [
        migrations.AddField(
            model_name='order',
            name='is_lock',
            field=models.BooleanField(blank=True, default=False, null=True),
        ),
        migrations.AlterField(
            model_name='order',
            name='status',
            field=models.CharField(choices=[('New', 'New'), ('Confirm', 'Confirm'), ('Cancel', 'Cancel'), ('Complete', 'Complete'), ('Paid', 'Paid')], default='New', max_length=16),
        ),
    ]