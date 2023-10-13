from functools import wraps
from http import HTTPStatus

import jwt
from flask import abort


def create_token(secret_key, user_id):
    try:
        user = {"token": jwt.encode(
            {"user_id": str(user_id)},
            secret_key,
            algorithm="HS256"
        )}
        return {
            "message": "Successfully fetched auth token",
            "data": user
        }
    except Exception:
        abort(HTTPStatus.UNAUTHORIZED, description='erro')


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
                }, HTTPStatus.UNAUTHORIZED
            try:
                data = jwt.decode(token, secret_key, algorithms=["HS256"])
                current_user = get_user_by_id(data["user_id"])
                if current_user is None:
                    return {
                        "message": "Invalid Authentication token!",
                        "data": None,
                        "error": "Unauthorized"
                    }, HTTPStatus.NOT_FOUND
            except Exception as e:
                return {
                    "message": "Something went wrong",
                    "data": None,
                    "error": str(e)
                }, HTTPStatus.INTERNAL_SERVER_ERROR

            return f(current_user, *args, **kwargs)

        return decorated
    return decorator
