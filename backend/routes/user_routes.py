import datetime
import os
import bcrypt
import jwt
from schemas.User import User
from flask import g

def get_profile_picture():
    user = User.objects(username=g.user)[0]

    if user["image"] is not None:
        return user["image"], 200

    return "No image found", 200

def update_profile_picture(data):
    try:
        if "image" not in data.keys():
            return "ERROR: image is missing", 400

        user = User.objects(username=g.user)[0]
        user["image"] = data["image"]
        user.save(hash_pass = False)

        return "OK", 200
        
    except Exception as e:
        return "ERROR", 400

# route handler for logging in a user
def login(data):
    try:
        # if username is not in request body, return error
        if "username" not in data.keys():
            return "Username is required", 400

        # if password is not in request body, return error
        if "password" not in data.keys():
            return "Password is required", 400

        # fetch all users with given username
        users = User.objects(username=data["username"])

        # if there is none, return error
        if len(users) == 0:
            return "User does not exist", 400
        
        # call it user for simplicity
        user = users[0]
        
        # if passwords do not match, return error
        if not bcrypt.checkpw(data["password"].encode("utf-8"), user["password"].encode("utf-8")):
            return "Incorrect password", 400

        payload = {
            "exp": datetime.datetime.utcnow() + datetime.timedelta(days=0, seconds=3600),  # 1hour
            "user": user["username"],
        }

        token = jwt.encode(payload, os.environ.get("JWT_SECRET"), algorithm="HS256")

        return token, 200
    except Exception as e:
        return str(e), 400

# route handler for registering a user
def register(data):
    try:
        # if username is not in request body, return error
        if "username" not in data.keys():
            return "Username is required", 400

        # if password is not in request body, return error
        if "password" not in data.keys():
            return "Password is required", 400

        # fetch all users with given username
        users = User.objects(username=data["username"])

        # if user with given username exists, return error
        if len(users) > 0:
            return "User already exists", 400

        # create new user
        user = User(username=data["username"], password=data["password"])

        if "image" in data.keys():
            user["image"] = data["image"]

        # save new user
        user.save()

        # return with success
        return "SUCCESS", 201
    except Exception as e:
        return str(e), 400

def verify_token(data):
    try:
        if "token" not in data.keys():
            return "INVALID", 200

        payload = jwt.decode(data["token"], str(os.environ.get("JWT_SECRET")), algorithms="HS256")

        if "exp" not in payload.keys():
            return "INVALID", 200

        if (
            datetime.datetime.fromtimestamp(payload["exp"])
            < datetime.datetime.utcnow()
        ):
            return "INVALID", 200

        if "user" not in payload.keys():
            return "INVALID", 200

        users = User.objects(username=payload["user"])

        if len(users) == 0:
            return "INVALID", 200

        return "VALID", 200

    except Exception as e:
        return "INVALID", 200
