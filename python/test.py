import pymongo

# con = pymongo.MongoClient()
con = pymongo.MongoClient("mongodb://localhost:27017/")
collection = con.ssdi
cursor = collection.tread_depth

# rec = { 
#     "title": 'MongoDB and Python',  
#     "description": 'MongoDB is no SQL database',  
#     "tags": ['mongodb', 'database', 'NoSQL'],  
#     "viewers": 104 
# }

# print(cursor.insert_one(rec))

print(cursor.count_documents({"finding":"test finished"}))