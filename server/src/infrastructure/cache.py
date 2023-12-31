import redis
import functools
import pickle

from settings import get_redis_url

r = redis.Redis(host=get_redis_url(), port=6379, db=0)


def cached(key: str, expire=None):
    def decorator(func):
        @functools.wraps(func)
        def wrapper_cache(*args, **kwargs):
            cached_result = r.get(key)
            if cached_result is None:
                result = func(*args, **kwargs)
                r.set(key, pickle.dumps(result), ex=expire)
                return result

            return pickle.loads(cached_result)
        return wrapper_cache
    return decorator
