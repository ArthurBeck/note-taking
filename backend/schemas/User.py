import bcrypt
from mongoengine.document import Document
from mongoengine.fields import StringField

# schema for storing a user instance
class User(Document):
    # username of user
    username = StringField(required=True)
    # password of user (stored as string but its actually hashed)
    password = StringField(required=True)
    # image of user
    image = StringField(required=False)

    # overriding default save function to alway hash the password before saving
    def save(self, hash_pass = True, *args, **kwargs):
        if hash_pass:
            # converting password to utf-8
            pwd = self.password.encode("utf-8")

            # generate random salt
            salt = bcrypt.gensalt()

            # hash the password with the salt
            self.password = bcrypt.hashpw(pwd, salt).decode("utf-8")

        return super(User, self).save(*args, **kwargs)