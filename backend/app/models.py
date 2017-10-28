from django.db import models


class DeviceRelation(models.Model):
    from_device_id = models.CharField(max_length=255)
    to_device_id = models.CharField(max_length=255)
    distance = models.FloatField()


class DeviceSubscription(models.Model):
    subscriber = models.CharField(max_length=255)
    subscribed_to = models.CharField(max_length=255)

    class Meta:
        unique_together = ('subscriber', 'subscribed_to')
