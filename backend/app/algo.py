from app.models import DeviceRelation


def algo(from_device, to_device, steps=None):
    if steps is None:
        steps = [from_device]

    A = set(DeviceRelation
         .objects
         .filter(from_device_id=from_device)
         .values_list('to_device_id', flat=True))
    A.add(from_device)

    B = set(DeviceRelation
         .objects
         .filter(from_device_id=to_device)
         .values_list('to_device_id', flat=True))
    B.add(to_device)

    X = A.intersection(B)
    if X:
        steps += [X]
        steps += to_device
        return steps

    C_list = set(DeviceRelation
                 .objects
                 .filter(to_device_id__in=DeviceRelation.objects.filter(from_device_id=from_device).values_list('to_device_id', flat=True))
                 .values_list('from_device_id', flat=True))

    C_list = C_list.difference({from_device})

    for c in C_list:
        C = set(DeviceRelation
                .objects
                .filter(from_device_id=c)
                .values_list('to_device_id', flat=True))
        A_i_C = A.intersection(C)
        if A_i_C:
            result = algo(c, to_device, None)
            if result:
                steps += [A_i_C]
                steps += result
                break

    return steps
