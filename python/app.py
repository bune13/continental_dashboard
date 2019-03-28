from flask import Flask, redirect, url_for, request, jsonify, make_response
import json
import uuid
import pymongo
import datetime
from flask_mail import Mail, Message
from flask_cors import CORS
from flask import Response
from flask import render_template,send_file
from bson.json_util import dumps
from bson.objectid import ObjectId
from bson.son import SON
from flask import Flask, Response,session                                                      #importing all the modules
from flask import Flask, Response,request                                                      #importing all the modules
from flask import Flask, render_template                                                       #importing all the modules
import yaml            #importing the format of the file used to store data
import requests
from flask import send_file 
import json
import ast
import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from flask_jwt_extended import (JWTManager, create_access_token,
                                create_refresh_token, jwt_required,
                                jwt_refresh_token_required, get_jwt_identity,
                                get_raw_jwt)
from connection.connection_mongo import conection_admin_db,conection_user_db,conection_agent_db, conection_ssdi_data_db

app = Flask(__name__)
CORS(app)
# -------------- MAIL CONFIGURATION --------------
app.config['MAIL_SERVER'] = 'smtp.mail.yahoo.com'
app.config['MAIL_PORT'] = 587
app.config['MAIL_USERNAME'] = 'test.dash@yahoo.com'
app.config['MAIL_PASSWORD'] = 'exponentia'
app.config['MAIL_USE_TLS'] = True
app.config['MAIL_USE_SSL'] = False
mail = Mail(app)

# -------------- JWT Secret Key --------------
app.config['JWT_SECRET_KEY'] = 'a37e1644f392640ce05cc29fc1c0859ddd56badba6a68d84fa809e14f518b26af13'
# app.config['JWT_ACCESS_TOKEN_EXPIRES'] = datetime.timedelta(minutes=60)
# app.config['JWT_HEADER_NAME'] = 'Meow'
jwt = JWTManager(app)
# print (jwt)

app.secret_key = "secret key"

def session_id():
    return request.values.get('CallSid') or request.values['MessageSid']

# -------------- TO CHECK IF USERID EXISTS --------------
def checkusername(value):
    collection = conection_admin_db()
    d = str(uuid.uuid4())[:8]
    if (collection.regform.find_one({'username': value})):
        checkusername(d)
    else:
        print (d)
        return d

# -------------- FOR REGISTRATION SIGNUP --------------
print ("**************** On Pre Email Validation ****************")
@app.route('/register', methods=["GET", "POST"])
def register():
#    print dir(request)
    if request.method == 'POST':
        print ("-------------- On Register --------------")
        print (request.data)
        d = json.loads(request.data)
        username = str(uuid.uuid4())[:8]
        
        print ('*********')
        print (username)
        print ('*********')
        cleanusername = checkusername(username)
        d['username'] = cleanusername
        d['password'] = "123"
        d['role'] = 'admin'
        d['db_name'] = d['business_name'].replace(' ','')

        # -------------- GENERATING RANDOM PASSWORD --------------
        userpass = str(uuid.uuid4())[:8]
        # -------------- ^^^^^^ NOT SAVING PASSWORD --------------
        UUID_STRIN = uuid.uuid4()
        d['UUID'] = UUID_STRIN
        d['createdAt'] = datetime.datetime.now()
        con = conection_admin_db()
        con.regform.insert_one(d)
        msg = Message('Welcome', sender = 'test.dash@yahoo.com', recipients = [d['email']])
        print (d)
        
        # confirm_url = "http://localhost:4200/"+UUID_STRIN
        # msg.html=render_template('confirm.html', confirm_url=confirm_url)
        # #msg.body = html
        # print(msg,type(msg.body))
        # mail.send(msg)

        return jsonify({'success':True}), 200
    else:
        return jsonify({'success':False}), 404

# -------------- VALIDATED EMAIL ASYNC --------------

# @app.route('/', methods=["POST"])
# def confirm(UUID_string):
    
@app.route('/emailvalidation', methods=["POST"])
def prelogin():
    print(request, 2*"#")
    print("############# On Pre Email Validation #############")
    print(type(request.data))
    d = str(request.data, 'utf-8')
    print (type(d))
    collection = conection_admin_db()
    cursor = collection.regform
    f = cursor.find_one({'email': d})
    if f:
        return "1"
    else:
        return "0"

# -------------- FOR LOGIN PAGE --------------
@app.route('/login', methods=["POST"])
def onlogin():
#    print (dir(request)   )
    print ("############# On User Login #############"        )
    print (request.data)
    d = json.loads(request.data)
    print (d["password"])
    print (d["username"])
    psw = d["password"] 
    uname = d["username"]

    access_token = create_access_token(identity=d['username'])
    refresh_token = create_refresh_token(identity=d['username'])

    con = conection_admin_db()
    c = con.regform.find_one({'username':uname,'password':psw})
    print (c)
    if c:
        return jsonify({'Found':True, 'access_token': access_token,'refresh_token': refresh_token}), 200
    else:
        return jsonify({'Found':False}), 404

# -------------- AUTH ADMIN --------------
@app.route('/checkprotected', methods=['POST'])
@jwt_required
def protected():
    print ("########### CHECK PROTECTED ")
    print (get_jwt_identity())
    ret = {
        'current_identity': get_jwt_identity(),  # test
    }
    return jsonify(ret), 200 


# -------------- FOR Forget Password --------------
@app.route('/forgetpassword', methods=["POST"])
def onforgetPassword():
#    print (dir(request)   )
    print ("############# On Forget Password #############")
    print (request.data)
    d = json.loads(request.data)
    print (d["email"])
    email = d["email"]
    con = conection_admin_db()
    c =con.regform.find_one({'email':email})
    if c:
        msg = Message('Your New Password', sender = 'test.dash@yahoo.com', recipients = [d['email']])
        print (d)
        msg.body = "Hello,"
        msg.html = "<br>Your new password is ..... generate new password"
        print (msg,type(msg))
        mail.send(msg)
        return jsonify({'Found':True}), 200
    else:
        return jsonify({'Found':False}), 404

# -------------------------------------------------
#                 get doughnut rimtype data
# -------------------------------------------------
@app.route('/onDoughnutRimtype', methods=["GET"])
def onDoughnutRimtypeClick():
    print ("-~-~-~-~-~-~-~ On rimtype click -~-~-~-~-~-~-~-~")
    rims = []
    total = []
    collection = conection_ssdi_data_db()
    cursor = collection.tread_depth
    # c = cursor.find({}).limit(50)
    rims = cursor.distinct("rimtype")
    for i in rims:
        total.append({
            "rimtype":i,
            "number":cursor.count_documents({"rimtype":i})
        })
    print(total)
    # return jsonify(dumps(c)), 200
    return dumps(total), 200

# -------------------------------------------------
#                 get barchart reasons data
# -------------------------------------------------
@app.route('/onBarReasons', methods=["GET"])
def onBarReasonsClick():
    print ("-~-~-~-~-~-~-~ On reasons click -~-~-~-~-~-~-~-~")
    rims = []
    total = []
    collection = conection_ssdi_data_db()
    cursor = collection.tread_depth
    # c = cursor.find({}).limit(50)
    rims = cursor.distinct("reason")
    for i in rims:
        total.append({
            "reason":i,
            "number":cursor.count_documents({"reason":i})
        })
    print(total)
    # return jsonify(dumps(c)), 200
    return dumps(total), 200

# -------------------------------------------------
#                 get dates and count
# -------------------------------------------------
@app.route('/onCountAndDates', methods=["GET"])
def onCountAndDates():
    print ("-~-~-~-~-~-~-~ onCountAndDates -~-~-~-~-~-~-~-~")
    total = []
    collection = conection_ssdi_data_db()
    cursor = collection.tread_depth
    pipeline = [
        {"$group" : 
            {
                "_id" : { "year": { "$year": "$date" } },           
                "count": { "$sum": 1 }
            }
        },
        {"$sort": SON([("count", -1)]) }
    ]
    rims = cursor.aggregate(pipeline)
    for i in rims:
        total.append({
            "year":i['_id']['year'],
            "count":i['count']
        })
    print(total)
    # return jsonify(dumps(c)), 200
    return dumps(total), 200


if __name__ == '__main__':
    app.run(debug = True,host='0.0.0.0')