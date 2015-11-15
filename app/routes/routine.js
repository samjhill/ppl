// load up the movement model
var Routine       = require('../models/routine');

module.exports = function(app, passport) {
    app.get('/api/routines', function(req, res, done) {
            process.nextTick(function() {
                Routine.find(function (err, routine) {
                     res.status(200);
                     res.send(routine);
                 });
            })
    });
      
    app.get('/api/routine/name/:name', function(req, res, done) {
            process.nextTick(function() {
                Routine.find({ name: req.params['name']}, function (err, user) {
                    res.send(user);
                });
            })
    });
    
    app.post('/api/routine', isLoggedIn, function(req, res, done) {
        process.nextTick(function() {
          var routine = new Routine();
          console.log(req);
          
          if(req.body.name){
            routine.name = req.body.name;
          }
          else {
            res.status(400);
            res.send('please include a name for your routine!');
            return;
          }
          
          if (req.body.description) {
            routine.description = req.body.description;
          }
          else {
            res.status(400);
            res.send('please include a description for your routine!');
            return;
          }
          
          if (req.body.workouts) {
            routine.workouts = req.body.workouts;
          }
          else {
            res.status(400);
            res.send('please include workouts for your routine!');
            return;
          }
          
          if (routine.name && routine.description && routine.workouts) {
            routine.save(function(err) {
                              if (err)
                                  throw err;
      
                              res.status(204);
                              res.send();
                          });
          }
          });
    });
    
//    app.get('/api/user/id/:id', isAdministrator, function(req, res, done) {
//      process.nextTick(function() {
//       User.findOne({ _id: req.params['id']}, function (err, user) {
//            res.status(200);
//            res.send(user);
//        });
//       })
//    });
//    
//    app.put('/api/user/id/:id/permissions', isAdministrator, function(req, res, done) {
//      process.nextTick(function() {
//       User.findOne({ _id: req.params['id']}, function (err, user) {
//            if (req.body.permissions) {
//                user.permissions = req.body.permissions;
//                user.save(function(err) {
//		    res.status(200);
//                    res.send('successfully set user permissions');
//		});
//            }
//            else {
//                res.status(400);
//                res.send('please remember to send permissions in the body! {"permissions":{"permissionType": boolean}}');
//            }
//            
//        });
//       })
//    });
};

function isLoggedIn(req, res, next) {
	if (req.isAuthenticated())
		return next();

	res.redirect('/');
}

var isAdministrator = function(req, res, next){
    if(req.user &&
       req.user['permissions'] &&
       req.user['permissions']['administrator'] === true)
        return next();
    
    res.status(403);
    res.send();
}