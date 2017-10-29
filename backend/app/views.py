import json
from typing import List, Set

from channels import Group
from channels.generic.websockets import WebsocketConsumer
from django.contrib.auth import get_user_model
from django.db import transaction
from django.db.models import Q
from django.db.models.functions import Length
from rest_framework import parsers, renderers
from rest_framework.authtoken.models import Token
from rest_framework.response import Response
from rest_framework.views import APIView

from app.algo import algo, flatter
from app.auth_token import RestTokenConsumerMixin
from app.models import DeviceRelation, DeviceSubscription, RequestedSearch
from app.serializers import AuthTokenSerializer, UserSerializer, DeviceRelationSerializer

User = get_user_model()


class ObtainAuthToken(APIView):
    throttle_classes = ()
    permission_classes = ()
    parser_classes = (
        parsers.FormParser, parsers.MultiPartParser, parsers.JSONParser,)
    renderer_classes = (renderers.JSONRenderer,)
    serializer_class = AuthTokenSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data,
                                           context={'request': request})
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
        token, created = Token.objects.get_or_create(user=user)
        return Response({'token': f'{user.username}-{user.pk}-{token.key}'})


obtain_auth_token = ObtainAuthToken.as_view()


class UserLookUpConsumer(WebsocketConsumer):
    def get_handler(self, message, **kwargs):
        return super(UserLookUpConsumer, self).get_handler(message, **kwargs)

    def receive(self, text=None, bytes=None, **kwargs):
        data = json.loads(text)
        message = data['message']
        users = (
            User
                .objects
                .filter(Q(Q(username__contains=message)
                          | Q(email__contains=message)))
                .order_by(Length('username').asc())[:10]
        )
        serializer = UserSerializer(users, many=True)
        data = {'message': serializer.data}
        data = json.dumps(data)
        self.message.reply_channel.send({"text": data})


class DeviceRelationConsumer(RestTokenConsumerMixin, WebsocketConsumer):
    rest_user = True

    def get_action_handler(self, type):
        return {
            'UPDATE_NODES': self.update_nodes_handler,
            'GO_TO': self.go_to_handler,
            'GO_TO_CANCEL': self.go_to_cancel_handler,
        }[type]

    @property
    def from_device_id(self):
        return self.kwargs['from_device_id']

    def connection_groups(self, from_device_id=None, **kwargs):
        if self.message.user.is_anonymous():
            print('User is anonymous')
            return []
        if not from_device_id:
            print('from_device_id is False')
        return [from_device_id]

    def connect(self, message, **kwargs):
        return super(DeviceRelationConsumer, self).connect(message, **kwargs)

    def receive(self, text=None, bytes=None, **kwargs):
        data = json.loads(text)['message']
        handler = self.get_action_handler(data['type'])
        handler(data['payload'])

    def disconnect(self, message, **kwargs):
        DeviceRelation.objects.filter(from_device_id=self.from_device_id).delete()
        DeviceSubscription.objects.filter(subscribed_to=self.from_device_id).delete()

    def update_nodes_handler(self, payload):
        self.refresh_device_relations(payload)
        self.notify_subscribers()
        self.send(text='"OK!"')

    @transaction.atomic
    def refresh_device_relations(self, data: 'List[dict]') -> 'List[dict]':
        DeviceRelation.objects.filter(from_device_id=self.from_device_id).delete()
        sr = DeviceRelationSerializer(data=data, many=True)
        sr.is_valid(raise_exception=True)
        sr.save()
        return sr.data

    def notify_subscribers(self):
        device_subscriptions = set(DeviceSubscription
                                   .objects
                                   .filter(subscribed_to=self.from_device_id))
        for subscription in device_subscriptions:
            self.send_go_to_path(
                subscription.subscriber,
                RequestedSearch.objects.filter(from_device=subscription.subscriber).last().to_device,
                subscription.subscriber,
            )

    def go_to_handler(self, searched_device):
        _, _ = RequestedSearch.objects.get_or_create(from_device=self.from_device_id, to_device=searched_device)

        path = algo(self.from_device_id, searched_device)
        DeviceSubscription.objects.bulk_create([
            DeviceSubscription(subscriber=self.from_device_id, subscribed_to=ele)
            for ele in flatter(path[1:])
        ])
        self.send_go_to_path(self.from_device_id, searched_device, self.from_device_id, path)

    def send_go_to_path(self, searched_from_device, searched_to_device, send_to_group, path=None):
        if not path:
            path = algo(searched_from_device, searched_to_device)

        new_path = []
        for ele in path:
            if type(ele) == set:
                new_path.append(list(ele))
            else:
                new_path.append(ele)

        Group(send_to_group).send({
            'text': json.dumps({
                'type': 'GO_TO_PATH',
                'payload': new_path
            })
        })

    def go_to_cancel_handler(self, payload):
        DeviceSubscription.objects.filter(subscriber=self.from_device_id).delete()
