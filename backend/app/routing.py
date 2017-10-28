from channels import route_class

from app.views import UserLookUpConsumer

channel_routing = [
    route_class(UserLookUpConsumer, path=r'users$'),
]