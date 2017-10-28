import json

from channels.generic.websockets import WebsocketConsumer
from django.contrib.auth import get_user_model
from django.db.models import Q
from django.db.models.functions import Length
from rest_framework import parsers, renderers
from rest_framework.authtoken.models import Token
from rest_framework.response import Response
from rest_framework.views import APIView

from app.serializers import AuthTokenSerializer, UserSerializer

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
