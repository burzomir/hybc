# -*- coding: utf-8 -*-
# Generated by Django 1.11.6 on 2017-10-29 02:52
from __future__ import unicode_literals

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0001_initial'),
    ]

    operations = [
        migrations.AlterUniqueTogether(
            name='devicesubscription',
            unique_together=set([]),
        ),
    ]
