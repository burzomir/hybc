from django.contrib.auth import get_user_model
from django.utils.translation import ugettext_lazy as _
from rest_framework.compat import authenticate

from app.models import DeviceRelation

User = get_user_model()

from rest_framework import serializers

from django.contrib.auth.models import User as django_user


class DeviceRelationSerializer(serializers.ModelSerializer):
    class Meta:
        model = DeviceRelation
        fields = [
            'from_device_id',
            'to_device_id',
            'distance',
        ]


class AuthTokenSerializer(serializers.Serializer):
    username = serializers.CharField(label=_("Username"))
    password = serializers.CharField(
        label=_("Password"),
        style={'input_type': 'password'},
        trim_whitespace=False
    )

    def validate(self, attrs):
        username = attrs.get('username')
        password = attrs.get('password')

        if not User.objects.filter(username=username).exists():
            User.objects.create_user(username=username, password=password,
                                     is_active=True)

        if username and password:
            user = authenticate(request=self.context.get('request'),
                                username=username, password=password)

            if user:
                # From Django 1.10 onwards the `authenticate` call simply
                # returns `None` for is_active=False users.
                # (Assuming the default `ModelBackend` authentication backend.)
                if not user.is_active:
                    msg = _('User account is disabled.')
                    raise serializers.ValidationError(msg, code='authorization')
            else:
                msg = _('Unable to log in with provided credentials.')
                raise serializers.ValidationError(msg, code='authorization')
        else:
            msg = _('Must include "username" and "password".')
            raise serializers.ValidationError(msg, code='authorization')

        attrs['user'] = user
        return attrs


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = django_user
        fields = [
            'username',
            'id'
        ]
        ready_only_fields = fields