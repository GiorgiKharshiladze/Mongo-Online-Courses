import pymongo
import sys

# establish a connection to the database
connection = pymongo.MongoClient("mongodb://localhost")
        
db = connection.school
students = db.students

doc = students.find().sort("_id", 1)

for student in doc:
	student_id = student['_id']
	scores = student['scores']
	lowest = 100

	print(student_id)

	for each in scores:
		if each['type'] == "homework" and each['score'] < lowest:
			lowest = each['score']

	print scores
	print lowest
	print "============"