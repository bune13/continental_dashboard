import pymongo

def conection_admin_db():

    con = pymongo.MongoClient()
    collection = con.admin_db
    return collection

def conection_user_db(db):
    print "22222"*10,db
    dbs = db
    con = pymongo.MongoClient()
    collection = con[dbs]
    return collection