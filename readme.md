# ppl
ppl allows users to create, save, and track different workout routines.

[ppl.fitness](http://ppl.fitness)

## About This Project
For about a year now, I've been working out using the Stronglifts app. I have been looking for a similar way to setup and track workouts in a more general and abstract sense, but haven't found one that fits my needs exactly. So I built this.

I started this project so I can

1) Learn more about a new workout routine

2) Build an app that tracks and graphs my lifts in the format that I want: [Stronglifts](http://stronglifts.com/apps/)-style.

3) Work on my NodeJS and MongoDB development skills


# Developers
Note: This will not run without the auth.js and secrets.js files, which I do not include in this repo for security reasons. If you'd like a copy of them stripped of their security info, please contact me.

## Install

```shell
git clone https://github.com/samjhill/ppl.git
npm install
sudo mongod
nodemon server.js
sudo ./setup.sh #this sets up the database with our initial admin user and some movements
```

## Run
```shell
nodemon server.js
```

You should see the following:
```
magic happens on localhost:8080
```

Now, just navigate to http://localhost:8080 to see if it's working! 


### Data models
The most basic object is called a *movement*, which looks like this:

```json
{
  "name": "incline barbell bench press",
  "video": "https://www.youtube.com/watch?v=11gY7Q5D5wo",
  "bodyParts": ["anterior deltoids", "pectoralis major", "anterior deltoids"]
}
```

We pack a bunch of these *movement*s together, along with *sets*, *reps*, *priority*, and *restTime*, to make a *workout*.

A *routine* contains one to many *workout*s, a *name* property, and a *description*.

```json
{
        "_id": "5648f17f4191d85ad0d60826",
        "description": "A great hypertrophy workout based on Coolcicada's famous forum post.",
        "name": "PPL",
        "__v": 0,
        "workouts": [
            {
                "name": "Push",
                "_id": "5648f17f4191d85ad0d60833",
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
                        "restTime": 180,
                        "_id": "5648f17f4191d85ad0d60839"
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
                        "restTime": 180,
                        "_id": "5648f17f4191d85ad0d60838"
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
                        "restTime": 180,
                        "_id": "5648f17f4191d85ad0d60837"
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
                        "restTime": 120,
                        "_id": "5648f17f4191d85ad0d60836"
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
                        "restTime": 120,
                        "_id": "5648f17f4191d85ad0d60835"
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
                        "restTime": 90,
                        "_id": "5648f17f4191d85ad0d60834"
                    }
                ]
            },
            {
                "name": "Pull",
                "_id": "5648f17f4191d85ad0d6082c",
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
                        "restTime": 180,
                        "_id": "5648f17f4191d85ad0d60832"
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
                        "restTime": 180,
                        "_id": "5648f17f4191d85ad0d60831"
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
                        "restTime": 180,
                        "_id": "5648f17f4191d85ad0d60830"
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
                        "restTime": 120,
                        "_id": "5648f17f4191d85ad0d6082f"
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
                        "restTime": 120,
                        "_id": "5648f17f4191d85ad0d6082e"
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
                        "restTime": 90,
                        "_id": "5648f17f4191d85ad0d6082d"
                    }
                ]
            },
            {
                "name": "Legs",
                "_id": "5648f17f4191d85ad0d60827",
                "movements": [
                    {
                        "movement": {
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
                        "restTime": 180,
                        "_id": "5648f17f4191d85ad0d6082b"
                    },
                    {
                        "movement": {
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
                        "restTime": 120,
                        "_id": "5648f17f4191d85ad0d6082a"
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
                        "restTime": 120,
                        "_id": "5648f17f4191d85ad0d60829"
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
                        "restTime": 120,
                        "_id": "5648f17f4191d85ad0d60828"
                    }
                ]
            }
        ]
}
```
When a user has completed a routine, we need to save it.

To save a *routine* to a user's workout history, we add a *date* property to the routine object, transform the *sets* and *reps* of each movement according to the amount the user completed, add a *weight* property to it so we can track movement weight progression, and post the whole routine object to `/api/user/id/:id/completedRoutine`.



## Public Routes
### Movements
 **GET /api/movements**
 
Gets the list of all movements.

 **GET /api/movement/name/:name**
 
Searches for movements by name. Returns an array of movements.

 **GET /api/movement/id/:id**
 
Searches for movements by id. Returns an array of movements.

### Routines

**GET /api/routine/name/:name**

Searches for routines by name. Returns an array of routines.

## Authorized Routes
Requires the user to be logged in to run.

**POST /api/routine**

Adds a routine to the database.
```json
name: String,
description: String,
workouts: [{ //array of workout objects
    name : String, // "leg day", "chest day, best day"
    movements : [
        {
            movement: Object, //a Movement object from the db
            sets: Number,
            reps: Number,
            priority: Number, // lower number = higher priority
            restTime: Number //amount of time between sets, in seconds
        }]
}]
```

## Admin Commands
The following commands require administrator priviledges to run.

**POST /api/movement**

Adds a movement to the database.

example:

`curl --data '{
  "name": "incline barbell bench press",
  "video": "https://www.youtube.com/watch?v=11gY7Q5D5wo",
  "bodyParts": ["anterior deltoids", "pectoralis major", "anterior deltoids"]
}' http://localhost:8080/movement`


**DELETE /api/movement/:id**

Removes a movement from the database.

example:

`curl -X DELETE "http://localhost:8080/movement/56442a15d93b38be286b82bb"`


## Future Work
* Swagger API documentation
* Add stretching exercises to the database
* Add common names to muscle groups, possibly image links
* Add landmine press
* Add front squats

## License

MIT © [Sam Hill](https://github.com/samjhill)
