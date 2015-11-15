// load up the movement model
var Movement       = require('../models/movement');

module.exports = function(app, passport) {

app.get('/api/movements', function(req, res) {
  process.nextTick(function() {
    Movement.find(function (err, docs) {
      res.status(200);
      res.send(docs);
    });
  });
});

app.get('/api/movement/name/:name', function(req, res) {
  process.nextTick(function() {
    Movement.find({ name: req.params['name']}, function (err, movement) {
      res.status(200);
      res.send(JSON.stringify(movement));
    });
  });
});

app.get('/api/movement/id/:id', function(req, res) {
  process.nextTick(function() {
    Movement.findOne({ _id: req.params['id']}, function (err, movement) {
      res.status(200);
      res.send(JSON.stringify(movement));
    });
  });
});

app.post('/api/movement', isAdministrator, function(req, res, done) {
  process.nextTick(function() {
    var movement = new Movement();
    
    movement.name = req.body.name;
    movement.video = req.body.video;
    movement.bodyParts = req.body.bodyParts;
    
    movement.save(function(err) {
                        if (err)
                            throw err;

                        res.status(204);
                        res.send();
                    });
    });
  });
  
app.delete('/api/movement/id/:id', isAdministrator, function(req, res){
    process.nextTick(function() {
      Movement.remove({ _id: req.params['id']},function(err, result){
          if ( err ) {
            console.log(err);
            res.status(500);
            res.send();
          }
          else {
            console.log("movement deleted");
            res.status(204);
            res.send('movement deleted');
          }
        });
      });
    });
};

var isAdministrator = function(req, res, next){
    if(req.user &&
       req.user['permissions'] &&
       req.user['permissions']['administrator'] === true)
        return next();
    
    res.status(403);
    res.send();
}