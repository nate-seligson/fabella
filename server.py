from flask import Flask, Response
from flask_cors import CORS
# Initialize Flask app
app = Flask(__name__)
CORS(app)

story = open("stories/test.txt", "r").read()
# Define a route for GET requests
@app.route('/', methods=['GET'])
def home():
    return Response(f"<pre>{story}</pre>", content_type='text/html')

# Run the app
if __name__ == '__main__':
    app.run(debug=True)
