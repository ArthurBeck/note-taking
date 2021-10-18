import datetime
import functools
import os
from flask import request, g
import jwt
from schemas.User import User

def login_required(func):
    @functools.wraps(func)
    def wrapper(*args, **kwargs):
        try:
            auth_header = request.headers.get("Authorization")
            if auth_header is None:
                return "Authorization required", 401

            auth_token = auth_header.split(" ")[1]
            payload = jwt.decode(auth_token, str(os.environ.get("JWT_SECRET")), algorithms="HS256")

            if "exp" not in payload.keys():
                return "Invalid token", 401

            if (
                datetime.datetime.fromtimestamp(payload["exp"])
                < datetime.datetime.utcnow()
            ):
                return "Token has expired", 401

            if "user" not in payload.keys():
                return "Invalid token", 401

            users = User.objects(username=payload["user"])

            if len(users) == 0:
                return "Invalid token", 401

            g.user = payload["user"]

            return func(*args, **kwargs)
        except Exception as e:
            return str(e), 401

    return wrapper
