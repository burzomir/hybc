from django.contrib import admin

from django.contrib import admin

# Register your models here.
from app.algo import algo
from app.models import DeviceRelation


@admin.register(DeviceRelation)
class DeviceRelationAdmin(admin.ModelAdmin):
    list_display = ['from_device_id', 'to_device_id', 'distance']
    actions = ['get_graph']

    def get_graph(self, request, queryset):
        from_device, to_device = queryset.values_list('from_device_id', flat=True).order_by('id')
        final_graph = algo(from_device, to_device)
        self.message_user(request,
                          str(final_graph))
    get_graph.short_description = "Get graph"