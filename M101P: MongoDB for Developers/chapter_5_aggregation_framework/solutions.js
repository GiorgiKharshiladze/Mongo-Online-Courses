// homework 5.1
db.posts.aggregate([
  {$project: {"_id": 0,
              "comments.author": 1
  }},
  {$unwind: "$comments"},
  {$group: {"_id": "$comments.author",
           sum: {"$sum": 1}
  }},
  {$sort: {"sum": -1}},
])

// homework 5.2
db.zips.aggregate([
{$match:{$or: [{"state":{$eq:"CA"}},{"state":{$eq:"NY"}}]}},
{$group:{_id:{"state":"$state","city":"$city"},sum:{$sum:"$pop"}}},
{$match:{"sum":{$gte:25000}}},
{$group:{_id:null,avgPop:{$avg:"$sum"}}}
])

// homework 5.3
db.grades.aggregate([
  {$unwind:"$scores"},
  {$match:{"scores.type":{"$ne": "quiz"}}},
  {$group:{"_id": {class_id: "$class_id",
            student_id: "$student_id"},
    avg_per_student: {"$avg": "$scores.score"}
  }},
  {$group:{
    "_id": "$_id.class_id",
    avg: {"$avg": "$avg_per_student"}
  }},
  {$sort: {"avg": -1}}
])

// homework 5.4
db.zips.aggregate([
{ $project: { _id: 0, city: 1, pop: 1 } },
{ $match: { city: /^(B|D|O|G|N|M).*/ } },
{ $group: { _id: null, pop: { $sum: "$pop" } } },
{ $sort: { city: 1} }
])
