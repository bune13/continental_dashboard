import pymongo

con = pymongo.MongoClient("mongodb://localhost:27017/")

def conection_admin_db():
    collection = con.admin_db
    return collection

def conection_ssdi_data_db():
    collection = con.ssdi
    return collection

def conection_user_db():
    collection = con.user_db
    return collection

def conection_agent_db():
    collection = con.agent_db
    return collection