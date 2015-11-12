module.exports = function(app){
var async = require("async");
var db = require("./db");

app.use(function(req, res, next) {
  next();
});

app.get('/movements', function(req, res) {
  db.collection('movements').find(function (err, docs) {
    res.status(200);
    res.send(docs);
  });
});

app.post('/movement', function(req, res) {
  db.collection('movements').save({
                       name: req.body.name,
                       video: req.body.video,
                       bodyParts: req.body.bodyParts,
                       sets: req.body.sets,
                       reps: req.body.reps,
                       restTime: req.body.restTime,
                       priority: req.body.priority
                    }, function(err, saved) {
      if( err || !saved ) {
        console.log(err);
        res.status(500);
        res.send();
      }
      else {
        console.log("movement saved");
        res.status(204);
        res.send('movement saved');
      }
    });
  });
  
app.delete('/movement/:id', function(req, res){
  console.log('delete');
  db.collection('movements').remove({ _id: db.ObjectId(req.params['id'])},function(err, result){
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
}
