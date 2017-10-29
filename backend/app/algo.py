from app.models import DeviceRelation


def flatter(ls):
    output = []
    for element in ls:
        if type(element) in (set, list, tuple):
            for sub_element in element:
                output.append(sub_element)
        else:
            output.append(element)
    return output


def remove_redundant_intersection(intersection, ls):
    output = set()
    f_ls = flatter(ls)
    if type(intersection) in (set, list, tuple):
        for ele in intersection:
            if ele not in f_ls:
                output.add(ele)
    else:
        output.add(intersection)

    return output


def algo(from_device, to_device, steps=None, visited=None):
    if visited is None:
        visited = set()
    if from_device in visited:
        return []
    visited.add(from_device)
    if from_device == to_device:
        return []
    print(f'from_device: {from_device}, to_device: {to_device}, steps: {steps}.')
    if steps is None:
        steps = [from_device]
    else:
        if steps and steps[-1] == to_device:
            return []

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
        isect = remove_redundant_intersection(X, steps)
        isect = isect.difference(to_device)
        if len(isect) == 1:
            steps += [isect.pop()]
        elif isect:
            steps += [[isect]]
        steps += [to_device]
        if steps[-1] == steps[-2]:
            steps = steps[:-1]
        return steps

    C_list = set(DeviceRelation
                 .objects
                 .filter(to_device_id__in=DeviceRelation.objects.filter(from_device_id=from_device).values_list('to_device_id', flat=True))
                 .values_list('from_device_id', flat=True))

    C_list = C_list.difference({from_device})
    C_list = remove_redundant_intersection(C_list, steps)

    for c in C_list:
        C = set(DeviceRelation
                .objects
                .filter(from_device_id=c)
                .values_list('to_device_id', flat=True))
        A_i_C = A.intersection(C)
        if A_i_C:
            result = algo(c, to_device, None, visited)
            if result:
                isect = remove_redundant_intersection(A_i_C, steps)
                isect =isect.difference(to_device)
                if len(isect) == 1:
                    steps += isect.pop()
                elif isect:
                    steps += [isect]
                steps += result
                break

    if steps:
        if steps[-1] != to_device:
            return []
    return steps
