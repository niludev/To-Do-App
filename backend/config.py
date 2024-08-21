from flask import Flask
from flask_cors import CORS

app = Flask(__name__)
CORS(app, origins=["http://localhost:3000"])

# initialize database
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:////mnt/c/Users/nilus/todo.db'

app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

app.config['JWT_SECRET_KEY'] = 'your_secret_key'
