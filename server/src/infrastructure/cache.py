import redis
import functools
import json

r = redis.Redis(host='localhost', port=6379, db=0)


def cache_results(func):
    @functools.wraps(func)
    def wrapper_cache(*args, **kwargs):
        key = f"{func.__name__}:{json.dumps(args)}:{json.dumps(kwargs)}"

        cached_result = r.get(key)
        if cached_result is None:
            result = func(*args, **kwargs)
            r.set(key, result)
            return result

        return cached_result
    return wrapper_cache
