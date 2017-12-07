import os
import re
from flask import Flask, jsonify, render_template, request
import sys


# Configure application
app = Flask(__name__)

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/results")
def results():
    if request.method == "GET":
        return render_template("results.html")
    else:
        return render_template("index.html")
