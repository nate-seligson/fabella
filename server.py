from flask import Flask, Response
from flask_cors import CORS
from random import choice
import os
import datetime
import time
# Initialize Flask app
app = Flask(__name__)
CORS(app)

story = open("./stories/" + choice(os.listdir("./stories")), "r").read() #c
# Define a route for GET requests
@app.route('/', methods=['GET'])
def home():
    return Response(f"<pre>{story}</pre>", content_type='text/html')

# Run the app
if __name__ == '__main__':
    app.run(debug=True)

while True:
    now = datetime.datetime.now()
    midnight = now.replace(hour=0, minute=0, second=0, microsecond=0) + datetime.timedelta(days=1)
    time_to_wait = (midnight - now).total_seconds()

    if time_to_wait > 0:
        time.sleep(time_to_wait)
    story = open("./stories/" + choice(os.listdir("./stories")), "r").read() 

    
