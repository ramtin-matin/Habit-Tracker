from slowapi import Limiter
from slowapi.util import get_remote_address


def _user_or_ip(request):
    user_id = request.headers.get("X-User-Id")
    if user_id:
        return user_id
    return get_remote_address(request)


limiter = Limiter(key_func=_user_or_ip)
