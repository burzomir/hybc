from channels import route_class

from app.views import UserLookUpConsumer

channel_routing = [
    route_class(UserLookUpConsumer, path=r'users$'),
    route_class(UserLookUpConsumer, path=r'device/(?P<from_device_id>[a-zA-Z0-9]+)$'),
]