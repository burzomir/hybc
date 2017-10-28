from django.conf.urls import url
from django.contrib import admin

from app.views import obtain_auth_token


urlpatterns = [
    url(r'^admin/', admin.site.urls),
    url(r'^login$', obtain_auth_token),
]

