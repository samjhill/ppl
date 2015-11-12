# start db
mongod

# start API
nodemon index.js

# add data
curl --data '{
  "name": "flat barbell bench press",
  "video": "https://www.youtube.com/watch?v=gRVjAtPip0Y",
  "bodyParts": ["pectoralis major", "triceps brachii", "anterior deltoids"],
  "sets": 3,
  "reps": 5,
  "restTime": 180,
  "priority": 0
}' http://localhost:4141/movement

curl --data '{
  "name": "standing barbell overhead press",
  "video": "https://www.youtube.com/watch?v=F3QY5vMz_6I",
  "bodyParts": ["biceps brachialis", "anterior deltoids", "teres minor", "teres major", "latissimus dorsi", "triceps brachii", "infraspinatus", "trapezius"],
  "sets": 3,
  "reps": 5,
  "restTime": 180,
  "priority": 0
}' http://localhost:4141/movement

curl --data '{
  "name": "incline barbell bench press",
  "video": "https://www.youtube.com/watch?v=11gY7Q5D5wo",
  "bodyParts": ["anterior deltoids", "pectoralis major", "anterior deltoids"],
  "sets": 3,
  "reps": 5,
  "restTime": 180,
  "priority": 1
}' http://localhost:4141/movement

curl --data '{
  "name": "dumbbell side lateral raise",
  "video": "https://www.youtube.com/watch?v=kDqklk1ZESo",
  "bodyParts": ["anterior deltoids", "trapezius", "anterior deltoids", "triceps medial head", "triceps long head", "teres minor", "teres major", "infraspinatus"],
  "sets": 3,
  "reps": 10,
  "restTime": 60,
  "priority": 2
}' http://localhost:4141/movement

curl --data '{
  "name": "rope pushdown",
  "video": "https://www.youtube.com/watch?v=vB5OHsJ3EME",
  "bodyParts": ["triceps medial head", "triceps long head"],
  "sets": 3,
  "reps": 12,
  "restTime": 60,
  "priority": 2
}' http://localhost:4141/movement

curl --data '{
  "name": "dumbbell shrug",
  "video": "https://www.youtube.com/watch?v=g6qbq4Lf1FI",
  "bodyParts": ["trapezius", "levator scapulae", "rhomboid minor", "rhomboid major"],
  "sets": 3,
  "reps": 12,
  "restTime": 60,
  "priority": 2
}' http://localhost:4141/movement

curl --data '{
  "name": "barbell row",
  "video": "https://www.youtube.com/watch?v=G8l_8chR5BE",
  "bodyParts": ["erector spinae", "trapezius", "teres major", "rear deltoid", "latissimus dorsi"],
  "sets": 3,
  "reps": 5,
  "restTime": 180,
  "priority": 0
}' http://localhost:4141/movement

curl --data '{
  "name": "lat pulldown",
  "video": "https://www.muscleandstrength.com/exercises/lat-pull-down.html",
  "bodyParts": ["latissimus dorsi", "scapular"],
  "sets": 3,
  "reps": 10,
  "restTime": 120,
  "priority": 1
}' http://localhost:4141/movement

curl --data '{
  "name": "deadlift",
  "video": "https://www.youtube.com/watch?v=-4qRntuXBSc",
  "bodyParts": ["butt", "upper thighs", "hamstrings", "lower back", "upper middle back", "traps"],
  "sets": 1,
  "reps": 5,
  "restTime": 180,
  "priority": 1
}' http://localhost:4141/movement

curl --data '{
  "name": "face-pull",
  "video": "https://www.youtube.com/watch?v=rep-qVOkqgk",
  "bodyParts": ["trapezius", "rear deltoids", "hamstrings"],
  "sets": 3,
  "reps": 10,
  "restTime": 180,
  "priority": 2
}' http://localhost:4141/movement

curl --data '{
  "name": "barbell bicep curl",
  "video": "https://www.youtube.com/watch?v=kwG2ipFRgfo",
  "bodyParts": ["biceps brachii", "brachialis"],
  "sets": 4,
  "reps": 12,
  "restTime": 180,
  "priority": 2
}' http://localhost:4141/movement

curl --data '{
  "name": "hammer curls",
  "video": "https://www.youtube.com/watch?v=TwD-YGVP4Bk",
  "bodyParts": ["biceps brachii", "brachialis"],
  "sets": 4,
  "reps": 12,
  "restTime": 180,
  "priority": 2
}' http://localhost:4141/movement

curl --data '{
  "name": "barbell squat",
  "video": "https://www.youtube.com/watch?v=1xMaFs0L3ao",
  "bodyParts": ["gluteus maximus", "gluteus medius", "adductors", "gracilis", "sartorius", "vastus medialis", "biceps fernoris", "tensor fascia lata", "rectus femoris", "vastus lateralis", "vastus intermedius"],
  "sets": 4,
  "reps": 5,
  "restTime": 180,
  "priority": 0
}' http://localhost:4141/movement

curl --data '{
  "name": "leg extension",
  "video": "https://www.youtube.com/watch?v=YyvSfVjQeL0",
  "bodyParts": ["vastus lateralis", "vastus intermedius", "vastus medialis"],
  "sets": 3,
  "reps": 12,
  "restTime": 120,
  "priority": 1
}' http://localhost:4141/movement

curl --data '{
  "name": "hamstring curl",
  "video": "https://www.youtube.com/watch?v=GaSHOocFTVg",
  "bodyParts": ["gastrocnemius", "lower back", "abdominals"],
  "sets": 5,
  "reps": 12,
  "restTime": 60,
  "priority": 2
}' http://localhost:4141/movement

curl --data '{
  "name": "standing calf raise",
  "video": "https://www.youtube.com/watch?v=-M4-G8p8fmc",
  "bodyParts": ["calves", "peroneus", "flexor hallucis longus", "flexor digitorum longus"],
  "sets": 5,
  "reps": 12,
  "restTime": 60,
  "priority": 2
}' http://localhost:4141/movement