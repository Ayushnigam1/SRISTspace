import pymongo as pg
import re
import json
from bson import json_util
from bson.objectid import ObjectId
import mongoDatabase.articles
import mongoDatabase.event
from werkzeug.security import check_password_hash

path = "mongodb+srv://ayush27nigam02:Programmer27@todoclustor0.2cpskkr.mongodb.net/sristspacedb?retryWrites=true&w=majority"
database = "sristspacedb"

client = pg.MongoClient(path)




users = "users"
notes = "notes"


# get database
def getRoots():
    return client.get_database(database)


# getters

def getUsers():
    return client.get_database(database).get_collection(users)


def getNotes():
    return client.get_database(database).get_collection(notes)


def get_single_user(uname,type):
    users = getUsers()
    response = None
    if type == 0:
     response = users.find({'email': uname}, {'password': 0})
    elif type == 1 :
        response = users.find({'email': uname})
    data = None
    for i in response:
        val = json.loads(json_util.dumps(i['_id']))
        i['_id'] = val['$oid']
        data = i
    return data


def login_user(uname, pwd):
    if checkExistance(uname):
        user = get_single_user(uname,1)
        print(user)
        if check_password_hash(user['password'], pwd):
            return True
        else:
            return False
    else:
        return False


# add new sign in...
def addUsers(name,email, password, semester, stream, branch):
    json = {
        'name':name,
        'email': email,
        'password': password,
        'semester': semester,
        'stream': stream,
        'branch': branch
    }

    data = getUsers().find_one({'email': email}, {'_id': 0})
    if data is not None:
        return 'user exists'
    else:
        getUsers().insert_one(json)
        return 'submit'


def checkExistance(email):
    users = getUsers()
    data = users.find_one({'email': email}, {'_id': 0})
    if data is not None:
        return True
    else:
        return False


# login ...
def getUserDetail(email, password):
    users = getUsers()
    respones = login_user(email, password)
    return respones
    # return 'user does not exists'


if __name__ == '__main__':
    print(get_single_user('tester@gmail.com',1))


# notes init
def addNotes(topic, link, uploadDate, subject, semester, stream):
    json = {
        'topic': topic,
        'link': link,
        'upload': uploadDate,
        'subject': subject,
        'semester': semester,
        'stream': stream
    }
    data = getNotes().find_one({'link': link}, {'_id': 0})
    if data is not None:
        return 'notes exist'
    else:
        getNotes().insert_one(json)
        return "submit"


def fetchNotes(semester, stream):  # via drop downs
    notes = getNotes()
    cols = getNotes().aggregate([
        {"$match": {"semester": semester, "stream": stream}},
        {"$group": {"_id": {"subject": "$subject", "code": "$code"}}},
        {"$project": {"_id": 0, "subject": "$_id.subject", "code": "$_id.code"}}
    ])
    data = []
    for i in cols:
        # val = json.loads(json_util.dumps(i['_id']))
        # i['_id'] = val['$oid']
        data.append(i)

    js = {
        'data': data
    }
    print(data)
    return js


def getLinks(subject):
    links = getNotes().aggregate([
        {"$match": {"code": subject}},
        {"$project": {"_id": 0}}
    ])
    data = []
    for i in links:
        data.append(i)
    res = {'data': data}
    print(res);
    return res


def searchNotes(keyword):
    # notes = getNotes()
    # data = getNotes().find({} , {'topic':1 , '_id': 1})
    cols = getNotes().find({'topic': {'$regex': re.compile(keyword, re.IGNORECASE)}}, {'_id': 0})
    colsa = mongoDatabase.articles.getArticles().find({'title': {'$regex': re.compile(keyword, re.IGNORECASE)}})
    colse = mongoDatabase.event.getEvents().find({'eventname': {'$regex': re.compile(keyword, re.IGNORECASE)}},
                                                 {'_id': 0})

    notes = []
    articles = []
    events = []

    for i in cols:
        notes.append(i)

    for i in colsa:
        val = json.loads(json_util.dumps(i['_id']))
        i['_id'] = val['$oid']
        articles.append(i)

    for i in colse:
        events.append(i)

    data = {
        'notes': notes,
        'events': events,
        'articles': articles
    }

    return data


def dropNotes(topic, link):
    notes = getNotes()
    notes.delete_one({'topic': topic, 'link': link})
    return "success"
