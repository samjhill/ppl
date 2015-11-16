# add new user
curl -H "Content-Type: application/json" -X POST -d '{
  "email": "admin@admin.com",
  "password": "ppl"
}' http://localhost:8080/signup

# promote to admin
curl -H "Content-Type: application/json" -X PUT -d '{"permissions":{"administrator": true}}' http://localhost/api/user/email/admin%40admin.com/permissions

# add data
curl -H "Content-Type: application/json" -X POST -d '{
  "name": "flat barbell bench press",
  "video": "https://www.youtube.com/watch?v=gRVjAtPip0Y",
  "bodyParts": ["pectoralis major", "triceps brachii", "anterior deltoids"]
}' http://localhost:8080/api/movement

curl -H "Content-Type: application/json" -X POST -d '{
  "name": "standing barbell overhead press",
  "video": "https://www.youtube.com/watch?v=F3QY5vMz_6I",
  "bodyParts": ["biceps brachialis", "anterior deltoids", "teres minor", "teres major", "latissimus dorsi", "triceps brachii", "infraspinatus", "trapezius"]
}' http://localhost:8080/api/movement

curl -H "Content-Type: application/json" -X POST -d '{
  "name": "incline barbell bench press",
  "video": "https://www.youtube.com/watch?v=11gY7Q5D5wo",
  "bodyParts": ["anterior deltoids", "pectoralis major", "anterior deltoids"]
}' http://localhost:8080/api/movement

curl -H "Content-Type: application/json" -X POST -d '{
  "name": "dumbbell side lateral raise",
  "video": "https://www.youtube.com/watch?v=kDqklk1ZESo",
  "bodyParts": ["anterior deltoids", "trapezius", "anterior deltoids", "triceps medial head", "triceps long head", "teres minor", "teres major", "infraspinatus"]
}' http://localhost:8080/api/movement

curl -H "Content-Type: application/json" -X POST -d '{
  "name": "rope pushdown",
  "video": "https://www.youtube.com/watch?v=vB5OHsJ3EME",
  "bodyParts": ["triceps medial head", "triceps long head"]
}' http://localhost:8080/api/movement

curl -H "Content-Type: application/json" -X POST -d '{
  "name": "dumbbell shrug",
  "video": "https://www.youtube.com/watch?v=g6qbq4Lf1FI",
  "bodyParts": ["trapezius", "levator scapulae", "rhomboid minor", "rhomboid major"]
}' http://localhost:8080/api/movement

curl -H "Content-Type: application/json" -X POST -d '{
  "name": "barbell row",
  "video": "https://www.youtube.com/watch?v=G8l_8chR5BE",
  "bodyParts": ["erector spinae", "trapezius", "teres major", "rear deltoid", "latissimus dorsi"]
}' http://localhost:8080/api/movement

curl -H "Content-Type: application/json" -X POST -d '{
  "name": "lat pulldown",
  "video": "https://www.muscleandstrength.com/exercises/lat-pull-down.html",
  "bodyParts": ["latissimus dorsi", "scapular"]
}' http://localhost:8080/api/movement

curl -H "Content-Type: application/json" -X POST -d '{
  "name": "deadlift",
  "video": "https://www.youtube.com/watch?v=-4qRntuXBSc",
  "bodyParts": ["butt", "upper thighs", "hamstrings", "lower back", "upper middle back", "traps"]
}' http://localhost:8080/api/movement

curl -H "Content-Type: application/json" -X POST -d '{
  "name": "face-pull",
  "video": "https://www.youtube.com/watch?v=rep-qVOkqgk",
  "bodyParts": ["trapezius", "rear deltoids", "hamstrings"]
}' http://localhost:8080/api/movement

curl -H "Content-Type: application/json" -X POST -d '{
  "name": "barbell bicep curl",
  "video": "https://www.youtube.com/watch?v=kwG2ipFRgfo",
  "bodyParts": ["biceps brachii", "brachialis"]
}' http://localhost:8080/api/movement

curl -H "Content-Type: application/json" -X POST -d '{
  "name": "hammer curls",
  "video": "https://www.youtube.com/watch?v=TwD-YGVP4Bk",
  "bodyParts": ["biceps brachii", "brachialis"]
}' http://localhost:8080/api/movement

curl -H "Content-Type: application/json" -X POST -d '{
  "name": "barbell squat",
  "video": "https://www.youtube.com/watch?v=1xMaFs0L3ao",
  "bodyParts": ["gluteus maximus", "gluteus medius", "adductors", "gracilis", "sartorius", "vastus medialis", "biceps fernoris", "tensor fascia lata", "rectus femoris", "vastus lateralis", "vastus intermedius"]
}' http://localhost:8080/api/movement

curl -H "Content-Type: application/json" -X POST -d '{
  "name": "leg extension",
  "video": "https://www.youtube.com/watch?v=YyvSfVjQeL0",
  "bodyParts": ["vastus lateralis", "vastus intermedius", "vastus medialis"]
}' http://localhost:8080/api/movement

curl -H "Content-Type: application/json" -X POST -d '{
  "name": "hamstring curl",
  "video": "https://www.youtube.com/watch?v=GaSHOocFTVg",
  "bodyParts": ["gastrocnemius", "lower back", "abdominals"]
}' http://localhost:8080/api/movement

curl -H "Content-Type: application/json" -X POST -d '{
  "name": "standing calf raise",
  "video": "https://www.youtube.com/watch?v=-M4-G8p8fmc",
  "bodyParts": ["calves", "peroneus", "flexor hallucis longus", "flexor digitorum longus"]
}' http://localhost:8080/api/movement

curl -H "Content-Type: application/json" -X POST -d '{
    "name": "PPL",
    "description": "A great hypertrophy workout based on the famous forum post, modified to include Deadlifts. http://forum.bodybuilding.com/showthread.php?t=149807833",
    "workouts": [
        {
            "name": "Push",
            "movements": [
                {
                    "movement": {
                        "_id": "5648e01af4b27f31babc2e32",
                        "video": "https://www.youtube.com/watch?v=gRVjAtPip0Y",
                        "name": "flat barbell bench press",
                        "__v": 0,
                        "bodyParts": [
                            "pectoralis major",
                            "triceps brachii",
                            "anterior deltoids"
                        ]
                    },
                    "sets": 3,
                    "reps": 5,
                    "priority": 0,
                    "restTime": 180
                },
                {
                    "movement": {
                        "_id": "5648e01af4b27f31babc2e33",
                        "video": "https://www.youtube.com/watch?v=F3QY5vMz_6I",
                        "name": "standing barbell overhead press",
                        "__v": 0,
                        "bodyParts": [
                            "biceps brachialis",
                            "anterior deltoids",
                            "teres minor",
                            "teres major",
                            "latissimus dorsi",
                            "triceps brachii",
                            "infraspinatus",
                            "trapezius"
                        ]
                    },
                    "sets": 3,
                    "reps": 5,
                    "priority": 0,
                    "restTime": 180
                },
                {
                    "movement": {
                        "_id": "5648e01af4b27f31babc2e34",
                        "video": "https://www.youtube.com/watch?v=11gY7Q5D5wo",
                        "name": "incline barbell bench press",
                        "__v": 0,
                        "bodyParts": [
                            "anterior deltoids",
                            "pectoralis major",
                            "anterior deltoids"
                        ]
                    },
                    "sets": 3,
                    "reps": 5,
                    "priority": 1,
                    "restTime": 180
                },
                {
                    "movement": {
                        "_id": "5648e01af4b27f31babc2e35",
                        "video": "https://www.youtube.com/watch?v=kDqklk1ZESo",
                        "name": "dumbbell side lateral raise",
                        "__v": 0,
                        "bodyParts": [
                            "anterior deltoids",
                            "trapezius",
                            "anterior deltoids",
                            "triceps medial head",
                            "triceps long head",
                            "teres minor",
                            "teres major",
                            "infraspinatus"
                        ]
                    },
                    "sets": 3,
                    "reps": 12,
                    "priority": 1,
                    "restTime": 120
                },
                {
                    "movement": {
                        "_id": "5648e01af4b27f31babc2e36",
                        "video": "https://www.youtube.com/watch?v=vB5OHsJ3EME",
                        "name": "rope pushdown",
                        "__v": 0,
                        "bodyParts": [
                            "triceps medial head",
                            "triceps long head"
                        ]
                    },
                    "sets": 3,
                    "reps": 12,
                    "priority": 2,
                    "restTime": 120
                },
                {
                    "movement": {
                        "_id": "5648e01af4b27f31babc2e37",
                        "video": "https://www.youtube.com/watch?v=g6qbq4Lf1FI",
                        "name": "dumbbell shrug",
                        "__v": 0,
                        "bodyParts": [
                            "trapezius",
                            "levator scapulae",
                            "rhomboid minor",
                            "rhomboid major"
                        ]
                    },
                    "sets": 3,
                    "reps": 12,
                    "priority": 3,
                    "restTime": 90
                }
            ]
        },
        {
            "name": "Pull",
            "movements": [
                {
                    "movement": {
                        "_id": "5648e01af4b27f31babc2e38",
                        "video": "https://www.youtube.com/watch?v=G8l_8chR5BE",
                        "name": "barbell row",
                        "__v": 0,
                        "bodyParts": [
                            "erector spinae",
                            "trapezius",
                            "teres major",
                            "rear deltoid",
                            "latissimus dorsi"
                        ]
                    },
                    "sets": 3,
                    "reps": 5,
                    "priority": 0,
                    "restTime": 180
                },
                {
                    "movement": {
                        "_id": "5648e01af4b27f31babc2e3a",
                        "video": "https://www.youtube.com/watch?v=-4qRntuXBSc",
                        "name": "deadlift",
                        "__v": 0,
                        "bodyParts": [
                            "butt",
                            "upper thighs",
                            "hamstrings",
                            "lower back",
                            "upper middle back",
                            "traps"
                        ]
                    },
                    "sets": 3,
                    "reps": 5,
                    "priority": 0,
                    "restTime": 180
                },
                {
                    "movement": {
                        "_id": "5648e01af4b27f31babc2e39",
                        "video": "https://www.muscleandstrength.com/exercises/lat-pull-down.html",
                        "name": "lat pulldown",
                        "__v": 0,
                        "bodyParts": [
                            "latissimus dorsi",
                            "scapular"
                        ]
                    },
                    "sets": 3,
                    "reps": 10,
                    "priority": 1,
                    "restTime": 180
                },
                {
                    "movement": {
                        "_id": "5648e01af4b27f31babc2e3b",
                        "video": "https://www.youtube.com/watch?v=rep-qVOkqgk",
                        "name": "face-pull",
                        "__v": 0,
                        "bodyParts": [
                            "trapezius",
                            "rear deltoids",
                            "hamstrings"
                        ]
                    },
                    "sets": 3,
                    "reps": 12,
                    "priority": 1,
                    "restTime": 120
                },
                {
                    "movement": {
                        "_id": "5648e01af4b27f31babc2e3c",
                        "video": "https://www.youtube.com/watch?v=kwG2ipFRgfo",
                        "name": "barbell bicep curl",
                        "__v": 0,
                        "bodyParts": [
                            "biceps brachii",
                            "brachialis"
                        ]
                    },
                    "sets": 4,
                    "reps": 12,
                    "priority": 2,
                    "restTime": 120
                },
                {
                    "movement": {
                        "_id": "5648e01af4b27f31babc2e3d",
                        "video": "https://www.youtube.com/watch?v=TwD-YGVP4Bk",
                        "name": "hammer curls",
                        "__v": 0,
                        "bodyParts": [
                            "biceps brachii",
                            "brachialis"
                        ]
                    },
                    "sets": 3,
                    "reps": 12,
                    "priority": 3,
                    "restTime": 90
                }
            ]
        },
        {
            "name": "Legs",
            "movements": [
                {
                    "movement":  {
                        "_id": "5648e01af4b27f31babc2e3e",
                        "video": "https://www.youtube.com/watch?v=1xMaFs0L3ao",
                        "name": "barbell squat",
                        "__v": 0,
                        "bodyParts": [
                            "gluteus maximus",
                            "gluteus medius",
                            "adductors",
                            "gracilis",
                            "sartorius",
                            "vastus medialis",
                            "biceps fernoris",
                            "tensor fascia lata",
                            "rectus femoris",
                            "vastus lateralis",
                            "vastus intermedius"
                        ]
                    },
                    "sets": 3,
                    "reps": 5,
                    "priority": 0,
                    "restTime": 180
                },
                {
                    "movement":  {
                        "_id": "5648e01af4b27f31babc2e3f",
                        "video": "https://www.youtube.com/watch?v=YyvSfVjQeL0",
                        "name": "leg extension",
                        "__v": 0,
                        "bodyParts": [
                            "vastus lateralis",
                            "vastus intermedius",
                            "vastus medialis"
                        ]
                    },
                    "sets": 3,
                    "reps": 10,
                    "priority": 1,
                    "restTime": 120
                },
                {
                    "movement": {
                        "_id": "5648e01af4b27f31babc2e40",
                        "video": "https://www.youtube.com/watch?v=GaSHOocFTVg",
                        "name": "hamstring curl",
                        "__v": 0,
                        "bodyParts": [
                            "gastrocnemius",
                            "lower back",
                            "abdominals"
                        ]
                    },
                    "sets": 3,
                    "reps": 10,
                    "priority": 2,
                    "restTime": 120
                },
                {
                    "movement": {
                        "_id": "5648e01af4b27f31babc2e41",
                        "video": "https://www.youtube.com/watch?v=-M4-G8p8fmc",
                        "name": "standing calf raise",
                        "__v": 0,
                        "bodyParts": [
                            "calves",
                            "peroneus",
                            "flexor hallucis longus",
                            "flexor digitorum longus"
                        ]
                    },
                    "sets": 5,
                    "reps": 12,
                    "priority": 1,
                    "restTime": 120
                }
            ]
        }
    ]
}' http://localhost:8080/api/routines