from mongoengine.document import Document
from schemas.Note import Note
from flask import g
from bson.json_util import dumps

# route handler function for getting all notes
def get_notes():
    try:
        # return all notes and order by last modifed value in reverse, e.g. latest comes first
        notes = Note.objects(userID=g.user).order_by("-lastModified")
        
        notes_without_content = []

        for note in notes:
            note_without_content = note.to_mongo().to_dict()
            note_without_content.pop('content')
            notes_without_content.append(note_without_content)

        return dumps(notes_without_content)
    except Exception as e:
        return str(e), 400

# route handler function for creating a note
def create_note(data):
    try:
        # if title is not in the rquest body, return error
        if "title" not in data.keys():
            return "ERROR: title is required", 400

        # if content is not in the rquest body, return error
        if "content" not in data.keys():
            return "ERROR: content is required", 400

        # create new note
        note = Note(userID=g.user, title=data["title"], content=data["content"])

        if "image" in data.keys():
            note["image"] = data["image"]

        # save the note
        note.save()

        # return the newly created note
        return note.to_json(), 201
    except Exception as e:
        return str(e), 400

# route handler function for getting a single note
def get_note(note_id):
    try:
        # fetch all notes with given id
        notes = Note.objects(id=note_id, userID=g.user)

        # if there is one return it
        if len(notes) == 1:
            return notes[0].to_json()
        # otherwise there is none, so return error
        else:
            return "ERROR: Note not found", 404
    except Exception as e:
        return str(e), 400

# route handler function for updating a note
def update_note(note_id, data):
    try:
        # fetch all notes with given id
        notes = Note.objects(id=note_id, userID=g.user)

        # if there is none return error
        if len(notes) == 0:
            return "ERROR: Note not found", 404

        # call it note for simplicity
        note = notes[0]

        # if title is in request body, update title
        if "title" in data.keys():
            note["title"] = data["title"]

        # if content is in request body, update content
        if "content" in data.keys():
            note["content"] = data["content"]

        if "image" in data.keys():
            note["image"] = data["image"]

        # save note
        note.save()

        # return note
        return note.to_json()
    except Exception as e:
        return str(e), 400

def delete_note_image(note_id):
    try:
        # fetch all notes with given id
        notes = Note.objects(id=note_id, userID=g.user)

        # if there is none return error
        if len(notes) == 0:
            return "ERROR: Note not found", 404

        # call it note for simplicity
        note: Document = notes[0]
        
        note.update(unset__image=True)

        note.save()

        # return notes
        return note.to_json(), 200
    except Exception as e:
        return str(e), 400


# route handler for deleting a note
def delete_note(note_id):
    try:
        # fetch all notes with given id
        notes = Note.objects(id=note_id, userID=g.user)

        # if there is none return error
        if len(notes) == 0:
            return "ERROR: Note not found", 404

        # call it note for simplicity
        note = notes[0]

        # delete note
        note.delete()

        # return notes
        return get_notes() 
    except Exception as e:
        return str(e), 400
