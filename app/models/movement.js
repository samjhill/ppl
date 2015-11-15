// load the things we need
var mongoose = require('mongoose');

var movementSchema = mongoose.Schema({

    name : String,
    video: String,
    bodyParts : [String]

});

// create the model for movements and expose it to our app
module.exports = mongoose.model('Movement', movementSchema);