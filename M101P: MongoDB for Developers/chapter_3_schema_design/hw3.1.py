import pymongo
import sys

# establish a connection to the database
connection = pymongo.MongoClient("mongodb://localhost")
        
db = connection.school
students = db.students

doc = students.find().sort("_id", 1)
counter = 0

for student in doc:
	student_id = student['_id']
	scores = student['scores']
	lowest = 100


	for each in scores:
		if each['type'] == "homework" and each['score'] < lowest:
			lowest = each

	# Remove lowest score from the list
	scores.remove(lowest)

	if students.update({'_id':student_id}, {"$set": student}, upsert=False):
		counter += 1

print("Number of items updated", counter)