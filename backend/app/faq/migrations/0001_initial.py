# Generated by Django 2.2 on 2019-10-23 10:59

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Faq',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('categoryId', models.IntegerField()),
                ('question', models.CharField(blank=True, max_length=128, null=True)),
                ('answer', models.TextField()),
            ],
        ),
    ]