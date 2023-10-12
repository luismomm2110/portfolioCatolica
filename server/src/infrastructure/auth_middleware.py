from functools import wraps
import jwt


def token_required(secret_key, request, get_user_by_id):
    def decorator(f):
        @wraps(f)
        def decorated(*args, **kwargs):
            token = None
            if "Authorization" in request.headers:
                token = request.headers["Authorization"].split(" ")[1]
            if not token:
                return {
                    "message": "Authentication Token is missing!",
                    "data": None,
                    "error": "Unauthorized"
                }, 401
            try:
                data = jwt.decode(token, secret_key, algorithms=["HS256"])
                current_user = get_user_by_id(data["user_id"])
                if current_user is None:
                    return {
                        "message": "Invalid Authentication token!",
                        "data": None,
                        "error": "Unauthorized"
                    }, 404
            except Exception as e:
                return {
                    "message": "Something went wrong",
                    "data": None,
                    "error": str(e)
                }, 500

            return f(current_user, *args, **kwargs)

        return decorated
    return decorator
