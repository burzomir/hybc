# -*- coding: utf-8 -*-
# Generated by Django 1.11.6 on 2017-10-29 03:11
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0002_auto_20171029_0252'),
    ]

    operations = [
        migrations.CreateModel(
            name='RequestedSearch',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('from_device', models.CharField(max_length=255)),
                ('to_device', models.CharField(max_length=255)),
            ],
        ),
    ]
