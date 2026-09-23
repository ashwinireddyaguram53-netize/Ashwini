import os
from pymongo import MongoClient
from dotenv import load_dotenv


# Load environment variables
load_dotenv()


# Get MongoDB URL from environment
MONGO_URI = os.getenv("MONGO_URI")


# Connect MongoDB
client = MongoClient(MONGO_URI)


# Create database
db = client["Breakfast_System"]


# Create collection
feedback_collection = db["feedback"]