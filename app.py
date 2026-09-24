from flask import Flask, render_template, request, jsonify
from pymongo import MongoClient
from flask_cors import CORS
from datetime import datetime
import os


# -----------------------------
# Flask Application
# -----------------------------

app = Flask(__name__)

CORS(app)



# -----------------------------
# MongoDB Connection
# -----------------------------

from pymongo import MongoClient


MONGO_URI = "mongodb+srv://ashwinireddyaguram53_db_user:5jSafGXjZWDv01ml@cluster0.51ateow.mongodb.net/Breakfast_System"


client = MongoClient(MONGO_URI)


database = client["Breakfast_System"]


feedback_collection = database["feedback"]





# -----------------------------
# Open Website
# -----------------------------

@app.route("/")
def home():
    return render_template("feedback.html")

@app.route("/dashboard")
def dashboard():
    return render_template("dashboard.html")




# -----------------------------
# Receive Feedback
# -----------------------------

@app.route("/submit", methods=["POST"])
def submit_feedback():


    try:

        data = request.json


        feedback_data = {


            "date": data["date"],


            "name": data["name"],


            "items": data["items"],


            "rating": data.get("rating",""),


            "suggestion": data.get("suggestion",""),


            "submitted_time": datetime.now()

        }



        feedback_collection.insert_one(feedback_data)



        return jsonify({

            "status":"success",

            "message":"Feedback submitted successfully"

        })



    except Exception as e:


        return jsonify({

            "status":"error",

            "message":str(e)

        })







# -----------------------------
# Kitchen Daily Report
# -----------------------------

@app.route("/report/<date>")
def kitchen_report(date):


    records = feedback_collection.find(
        {
            "date":date
        },
        {
            "_id":0
        }
    )


    total = {}



    students = []



    for record in records:


        students.append(record)



        for item in record["items"]:


            food = item["food"]


            quantity = item["quantity"]


            unit = item["unit"]




            if food not in total:


                total[food] = {

                    "quantity":0,

                    "unit":unit

                }



            total[food]["quantity"] += quantity





    return jsonify({


        "date":date,


        "student_consumption":students,


        "daily_total":total


    })







# -----------------------------
# Test MongoDB Connection
# -----------------------------

@app.route("/test")
def test():

    return jsonify({

        "message":"Backend is running"

    })






# -----------------------------
# Run Server
# -----------------------------

if __name__ == "__main__":
    app.run(debug=True, use_reloader=False)
