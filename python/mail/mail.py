from flask import Flask, redirect, url_for, request
import json
import uuid
import pymongo
import datetime
from flask_mail import Mail, Message
from flask_cors import CORS
from flask import Response
#from Crypto.Hash import SHA256
# from flask.ext.api import status
# from flask_restful import Resource, Api
# from flask_restful  import Api
# from flask_jwt import JWT, jwt_required, current_identity
from flask_jwt_extended import JWTManager, create_access_token, create_refresh_token, jwt_required, jwt_refresh_token_required, get_jwt_identity, get_raw_jwt

from connection.connection_mongo import conection_admin_db,conection_user_db
con = pymongo.MongoClient()
collection = con.test
app = Flask(__name__)
CORS(app)

# app.config['Secret Key'] = 'thisisasecretkey'

app.config['JWT_SECRET_KEY'] = 'jwt-secret-string'
jwt = JWTManager(app)

print jwt

@app.route('/unprotected')
def unprotected():
    return ''

@app.route('/protected')
def protected():
    return ''


@app.route('/login', methods=["POST"])
def onlogin():  
    print "############# On User Login #############"        
    print request.data
    d = json.loads(request.data)
    psw = d["password"]
    uname = d["username"]
      
    access_token = create_access_token(identity = d['username'])
    refresh_token = create_refresh_token(identity = d['username'])

    con = conection_admin_db()
    c =con.regform.find_one({'username':uname,'password':psw})
    print c
    if c:        
        return json.dumps({'Found':True, 'access_token': access_token,'refresh_token': refresh_token}), 200, {'ContentType':'application/json'}


if __name__ == '__main__':
   app.run(debug = True)