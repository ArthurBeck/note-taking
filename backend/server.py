import logging
import os

from gevent.pywsgi import WSGIServer
from flask import Flask, request, redirect
from flask_cors import CORS
from mongoengine import connect
from pymongo import ssl_support

from routes.note_routes import (create_note, delete_note, delete_note_image, get_note, get_notes,
                                update_note)
from routes.user_routes import login, register, verify_token, get_profile_picture, update_profile_picture
from utils.auth import login_required
from utils.settings import load_env_vars

# loading the environment variables
load_env_vars()

# connecting to the database
connect(host=os.environ.get("MONGO_URI"), ssl_cert_reqs=ssl_support.CERT_NONE)

# reducing flask messages to errors
log = logging.getLogger("werkzeug")
log.setLevel(logging.ERROR)

# creating a flask application
app = Flask(__name__, static_url_path="", static_folder="static")
CORS(app)

# route for single note related operations


@app.route("/api/notes/<note_id>/delete-image", methods=["PUT"])
@login_required
def delete_note_image_route(note_id):
    return delete_note_image(note_id)

# route for single note related operations


@app.route("/api/notes/<note_id>", methods=["GET", "PUT", "DELETE"])
@login_required
def note_route(note_id):
    # GET request -> get a single note with given id
    if request.method == "GET":
        return get_note(note_id)
    # PUT request -> update a single note with given id with request body
    elif request.method == "PUT":
        return update_note(note_id, request.get_json())
    # DELETE request -> delete a single note with given id
    else:
        return delete_note(note_id)


# route for operations related to all notes
@app.route("/api/notes", methods=["GET", "POST"])
@login_required
def notes_route():
    # GET request -> get all notes from db
    if request.method == "GET":
        return get_notes()
    # POST request -> create a note from request body
    else:
        return create_note(request.get_json())


# route for user login (not fully functional yet)
@app.route("/api/login", methods=["POST"])
def login_route():
    return login(request.get_json())


# route for user registration
@app.route("/api/register", methods=["POST"])
def register_route():
    return register(request.get_json())

# route for verifying token


@app.route("/api/verify_token", methods=["POST"])
def verify_token_route():
    return verify_token(request.get_json())

# route for getting profile picture


@app.route("/api/user/image", methods=["GET", "PUT"])
@login_required
def profile_picture_route():
    if request.method == "GET":
        return get_profile_picture()

    return update_profile_picture(request.get_json())


@app.route("/", methods=["GET"])
def index():
    if os.environ.get("NODE_ENV") == "development":
        return "OK", 200

    return app.send_static_file("index.html")


@app.errorhandler(404)
def handle_404(e):
    # handle all other routes here
    return redirect('/')

# start running the application


if os.environ.get("NODE_ENV") == "development":
    app.run()
else:
    http_server = WSGIServer(('', int(os.environ.get("PORT"))), app)
    http_server.serve_forever()
