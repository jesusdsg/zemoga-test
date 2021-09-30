from flask import Flask, request, jsonify
from flask_pymongo import PyMongo, ObjectId
from flask_cors import CORS

# Connecting to local databse in mongoDB with Python
app = Flask(__name__)
app.config['MONGO_URI'] = 'mongodb://localhost/zemogadb'
mongo = PyMongo(app)  # connection

CORS(app)  # interacting between servers

# the main colection
db = mongo.db.people

# creating routes

# Adding new people


@app.route('/people', methods=['POST'])
def createPeople():
    id = db.insert({
        'name': request.json['name'],
        'description': request.json['description'],
        'category': request.json['category'],
        'picture': request.json['picture'],
        'lastUpdated': request.json['lastUpdated'],
        'votes':
            {
                'positive': request.json['votes']['positive'],
                'negative': request.json['votes']['negative'],
        }
    })
    return jsonify(str(ObjectId(id)))

# Get People list


@app.route('/people', methods=['GET'])
def getPeople():
    people = []
    for doc in db.find():
        people.append({
            '_id': str(ObjectId(doc['_id'])),
            'name': doc['name'],
            'description': doc['description'],
            'category': doc['category'],
            'picture': doc['picture'],
            'lastUpdated': doc['lastUpdated'],
            'votes': doc['votes'],
        })

    return jsonify(people)


# Get Person
@app.route('/people/<id>', methods=['GET'])
def getPerson(id):
    person = db.find_one({'_id': ObjectId(id)})
    return jsonify({
        '_id': str(ObjectId(person['_id'])),
        'name': person['name'],
        'description': person['description'],
        'category': person['category'],
        'picture': person['picture'],
        'lastUpdated': person['lastUpdated'],
        'votes': person['votes'],
    })


# Updating people votes
@app.route('/people/<id>', methods=['PUT'])
def updateVotes(id):
    db.update_one({'_id': ObjectId(id)}, {'$set': {
        'votes':
            {
                'positive': request.json['votes']['positive'],
                'negative': request.json['votes']['negative'],
            }
    }})
    return jsonify({'msg': 'Updated'})

# Delete


@app.route('/people/<id>', methods=['DELETE'])
def deletePeople(id):
    db.delete_one({'_id': ObjectId(id)})
    return jsonify({'msg': 'Deleted'})


if __name__ == "__main__":
    app.run(debug=True)
