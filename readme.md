# ppl
ppl generates a workout routine based on [Coolcicada's PPL routine](http://forum.bodybuilding.com/showthread.php?t=149807833).

## About This Project
I started this project so I can

1) Learn more about a new workout routine

2) Build an app that tracks and graphs my lifts in the format that I want: [Stronglifts](http://stronglifts.com/apps/)-style.

3) Work on my NodeJS and MongoDB development skills


## First Install

```shell
git clone https://github.com/samjhill/ppl.git
npm install
sudo ./setup.sh #this sets up the database and starts the server
```
## Run
```shell
nodemon index.js
```

You should see the following:
```
listening on port 4141
```

Now, just navigate to http://localhost:4141/status to see if it's working! 
The default username and password is admin:admin, which you should change in data/users.htpasswd.

### Data models
The main object is called a movement, which looks like this:

```json
{
  "name": "incline barbell bench press",
  "video": "https://www.youtube.com/watch?v=11gY7Q5D5wo",
  "bodyParts": ["anterior deltoids", "pectoralis major", "anterior deltoids"],
  "sets": 3,
  "reps": 5,
  "restTime": 180,
  "priority": 1
}
```

## API

## public calls

### /day/workoutType/:workoutType/mode/:mode
Gets a workout for the day.

example:

`curl http://localhost:4141/day/workoutType/legs/mode/a`

```json
{
    "type": "legs",
    "mode": "a",
    "movements": [
        {
            "_id": "5644328fc0f4463a34545c67",
            "name": "barbell squat",
            "video": "https://www.youtube.com/watch?v=1xMaFs0L3ao",
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
            ],
            "sets": 4,
            "reps": 5,
            "restTime": 180,
            "priority": 0
        },
        {
            "_id": "56443296c0f4463a34545c68",
            "name": "leg extension",
            "video": "https://www.youtube.com/watch?v=YyvSfVjQeL0",
            "bodyParts": [
                "vastus lateralis",
                "vastus intermedius",
                "vastus medialis"
            ],
            "sets": 3,
            "reps": 12,
            "restTime": 120,
            "priority": 1
        },
        {
            "_id": "5644329ec0f4463a34545c69",
            "name": "hamstring curl",
            "video": "https://www.youtube.com/watch?v=GaSHOocFTVg",
            "bodyParts": [
                "gastrocnemius",
                "lower back",
                "abdominals"
            ],
            "sets": 5,
            "reps": 12,
            "restTime": 60,
            "priority": 2
        },
        {
            "_id": "5644332dc0f4463a34545c6a",
            "name": "standing calf raise",
            "video": "https://www.youtube.com/watch?v=-M4-G8p8fmc",
            "bodyParts": [
                "calves",
                "peroneus",
                "flexor hallucis longus",
                "flexor digitorum longus"
            ],
            "sets": 5,
            "reps": 12,
            "restTime": 60,
            "priority": 2
        }
    ]
}
```

## admin calls

### GET /movements
Gets the list of all movements.

### POST /movement
Adds a movement to the database.

example:

`curl --data '{
  "name": "incline barbell bench press",
  "video": "https://www.youtube.com/watch?v=11gY7Q5D5wo",
  "bodyParts": ["anterior deltoids", "pectoralis major", "anterior deltoids"],
  "sets": 3,
  "reps": 5,
  "restTime": 180,
  "priority": 1
}' http://localhost:4141/movement`

response:

```
movement added
```

### DELETE /movement/:id
Removes a movement from the database.

example:

`curl -X DELETE "http://localhost:4141/movement/56442a15d93b38be286b82bb"`

response:

204 if successfully deleted


## Future Work
* Add stretching exercises to the database
* I am considering changing the data model for the movement object and move sets, reps, restTime, and priority into a higher-level model, so it's easier to customize the workout.


## License

MIT © [Sam Hill](https://github.com/samjhill)
