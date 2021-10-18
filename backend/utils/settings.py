import os
from os.path import dirname, join

from dotenv import load_dotenv

# utility function to load environment variables
def load_env_vars():
    dotenv_path = join(dirname(__file__), "..", ".env")
    load_dotenv(dotenv_path)
