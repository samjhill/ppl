// load the things we need
var mongoose = require('mongoose');

var routineSchema = mongoose.Schema({
    
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
    }],
    createdBy: String //user name
});

// create the model for routines and expose it to our app
module.exports = mongoose.model('routine', routineSchema);