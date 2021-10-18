import datetime

from mongoengine.document import Document
from mongoengine.fields import DateField, StringField

# schema for storing a note instance
class Note(Document):
    # date of when the user was last modified
    lastModified = DateField(required=True)
    # id of user who owns the note
    userID = StringField(required=True)
    # title of note
    title = StringField(required=True)
    # content of note
    content = StringField(required=True)
    # image for note
    image = StringField(required=False)

    # overriding default save function to update lastModified when the note gets saved, e.g. modified
    def save(self, *args, **kwargs):
        self.lastModified = datetime.datetime.now()
        return super(Note, self).save(*args, **kwargs)
