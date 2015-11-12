module.exports = function(app){
  var async = require("async");
  var db = require("./db");
  
  app.get('/status', function(req, res) {
    res.type('application/json');
    res.status(200);
    res.send('running! GET /day to get a workout for today.');
  });
  
  app.get('/day/workoutType/:workoutType/mode/:mode', function(req, res) {
    var workout = {}; //initialize the workout object; we are returning this to the user later
    workout['type'] = req.params['workoutType'];
    workout['mode'] = req.params['mode'];
    workout['movements'] = []; // we'll store our movement objects here
    
    switch(workout['type']) {
      case 'push': {
        var movementNames = [
                             'flat barbell bench press',
                             'standing barbell overhead press',
                             'incline barbell bench press',
                             'dumbbell side lateral raise',
                             'rope pushdown',
                             'overhead dumbbell extension',
                             'dumbbell shrug'];
        //get all the movements from the db
        async.eachSeries(movementNames,
                   function(movement, callback){
                      console.log(movement);
                      db.collection('movements').findOne({name: movement}, function(err,doc){
                        workout['movements'].push(doc);
                        callback();
                      });
                    },
                   function(err){
                      res.send(workout);
                    });
        break;
      }
      case 'pull': {
        var movementNames = [
                             'barbell row',
                             'deadlift',
                             'lat pulldown',
                             'face-pull',
                             'barbell bicep curl',
                             'hammer curls'];
        //get all the movements from the db
        async.eachSeries(movementNames,
                   function(movement, callback){
                      console.log(movement);
                      db.collection('movements').findOne({name: movement}, function(err,doc){
                        workout['movements'].push(doc);
                        callback();
                      });
                    },
                   function(err){
                      res.send(workout);
                    });
        break;
      }
      case 'legs': {
        var movementNames = [
                             'barbell squat',
                             'leg extension',
                             'hamstring curl',
                             'standing calf raise'];
        //get all the movements from the db
        async.eachSeries(movementNames,
                   function(movement, callback){
                      console.log(movement);
                      db.collection('movements').findOne({name: movement}, function(err,doc){
                        workout['movements'].push(doc);
                        callback();
                      });
                    },
                   function(err){
                      res.send(workout);
                    });
        break;
      }
      default: {
        return 'Please pass in a workout type.';
      }
    }
  });
}
