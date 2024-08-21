from sqlalchemy.exc import IntegrityError
from config import app
from models import Task, db, User
from flask import request, jsonify
from werkzeug.security import generate_password_hash, check_password_hash
from sqlalchemy_serializer import serialize_collection
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity



@app.route('/', methods=['GET'])
def home():
    return jsonify(message="Welcome to the To-Do App")

@app.route('/register', methods=['POST'])
def register():
    data = request.get_json()

    if 'username' not in data or 'password' not in data or 'email' not in data:
        return jsonify({"error": "Invalid input"}), 400

    # check kon bebin aya user ba username va email ghablan tu database bude ya na
    # tamum

    hashed_password = generate_password_hash(data['password'])

    new_user = User()
    new_user.username = data['username']
    new_user.password = hashed_password
    new_user.email = data['email']

    try:
        db.session.add(new_user)
        db.session.commit()
        return jsonify(message="User registered successfully"), 201

    except IntegrityError:
        db.session.rollback()
        return jsonify({"message": "User already exists"}), 400


jwt = JWTManager(app)
# It is used to create and send the token to the user.
@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    user = User.query.filter_by(username=data['username']).first()
    if user and check_password_hash(user.password, data['password']):
        access_token = create_access_token(identity=data['username'], expires_delta=False )
        return jsonify(access_token=access_token), 200
    return jsonify({"message": "Invalid username or password"}), 400


# It is used to provide protected resources and only users with valid token can access it.
@app.route('/todos', methods=['GET'])
@jwt_required()
def get_user_todos():
    username = get_jwt_identity()
    current_user = User.query.filter_by(username=username).first()
    result = Task.query.filter_by(user_id=current_user.id).all()
    return serialize_collection(result)


# Route to create a new todo
@app.route('/todos', methods=['POST'])
@jwt_required()
def create_todo():
    username = get_jwt_identity()
    current_user = User.query.filter_by(username=username).first()

    data = request.get_json()
    new_todo = Task()
    new_todo.title = data['title']
    new_todo.description = data['description']
    new_todo.done = False
    new_todo.user_id = current_user.id

    db.session.add(new_todo)
    db.session.commit()

    return jsonify(new_todo.to_dict()), 201


# Route to update an existing todo
@app.route('/todos/<int:todo_id>', methods=['PUT'])
@jwt_required()
def update_todo(todo_id):
    current_user = get_jwt_identity()
    user = User.query.filter_by(username=current_user).first()
    if user is None:
        return jsonify({'error': 'User not found'}), 404

    current_user_id = user.id


    todo = Task.query.filter_by(id=todo_id, user_id=current_user_id).first()
    if not todo:
        return jsonify({'error': 'todo not found or not authorized'}), 400

    data = request.get_json()
    todo.title = data['title']
    todo.description = data['description']
    todo.done = data['done']

    db.session.add(todo)
    db.session.commit()

    return jsonify(todo.to_dict()), 200



# Route to delete an existing todo
@app.route('/todos/<int:todo_id>', methods=['DELETE'])
@jwt_required()
def delete_todo(todo_id):
    username = get_jwt_identity()
    current_user = User.query.filter_by(username=username).first()
    current_user_id = current_user.id

    todo = Task.query.filter_by(id=todo_id, user_id=current_user_id).first()
    if not todo:
        return jsonify({'error': 'todo not found or not authorized'}), 400

    db.session.delete(todo)
    db.session.commit()

    return jsonify({'message': 'Task deleted successfully'}), 200


@app.route('/token-validate', methods=['POST'])
@jwt_required()
def token_validate():
    return jsonify(is_valid=True), 200
