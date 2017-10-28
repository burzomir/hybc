from channels.routing import include


channel_routing = [
    include('app.routing.channel_routing', path=r'^/app/'),
]
