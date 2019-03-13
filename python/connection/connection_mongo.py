import pymongo

def conection_admin_db():
    con = pymongo.MongoClient()
    collection = con.admin_db
    return collection

def conection_user_db():
    con = pymongo.MongoClient()
    collection = con.user_db
    return collection

def conection_agent_db():
    con = pymongo.MongoClient()
    collection = con.agent_db
    return collection