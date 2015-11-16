// load up the movement model
var User       = require('../models/user');

module.exports = function(app, passport) {
    app.get('/api/users', isAdministrator, function(req, res, done) {
        console.log(req.user);
            process.nextTick(function() {
                User.find(function (err, users) {
                     res.status(200);
                     res.send(users);
                 });
            })
    });
      
    app.get('/api/user/id/:id', isAdministrator, function(req, res, done) {
      process.nextTick(function() {
       User.findOne({ _id: req.params['id']}, function (err, user) {
            res.status(200);
            res.send(user);
        });
       })
    });
    
    app.put('/api/user/id/:id/permissions', isAdministrator, function(req, res, done) {
      process.nextTick(function() {
       User.findOne({ _id: req.params['id']}, function (err, user) {
            if (req.body.permissions) {
                user.permissions = req.body.permissions;
                user.save(function(err) {
		    res.status(200);
                    res.send('successfully set user permissions');
		});
            }
            else {
                res.status(400);
                res.send('please remember to send permissions in the body! {"permissions":{"permissionType": boolean}}');
            }
            
        });
       })
    });
    
    /*
     * add a routine to a user's data.myRoutine array of routine objects
     */
    app.put('/api/user/id/:id/routines', isLoggedIn, function(req, res, done) {
      process.nextTick(function() {
       User.findOne({ _id: req.params['id']}, function (err, user) {
            if (req.body) {
                user.data.myRoutines.push(req.body);
                user.save(function(err) {
		    res.status(200);
                    res.send('successfully added the routine to the user');
		});
            }
            else {
                res.status(400);
                res.send('please remember to send the routine in the body!');
            }
            
        });
       })
    });
    
    /*
     * add a routine to a user's data.completedRoutines array of routine objects
     */
    app.post('/api/user/id/:id/completedRoutine', isLoggedIn, function(req, res, done) {
      process.nextTick(function() {
       User.findOne({ _id: req.params['id']}, function (err, user) {
            if (req.body) {
                user.data.completedRoutines.push(req.body);
                user.save(function(err) {
		    res.status(200);
                    res.send('successfully added the routine to the user');
		});
            }
            else {
                res.status(400);
                res.send('please remember to send the routine in the body!');
            }
            
        });
       })
    });
    
    //seed the first admin user
    //used only for db setup
    app.put('/api/user/email/:email/permissions', function(req, res, done) {
        if (req.params['email'] === 'admin@admin.com' || isAdministrator){
            process.nextTick(function() {
               User.findOne({ 'local.email': req.params['email']}, function (err, user) {
                    if (err) {
                        console.log(err);
                    }
                    if (req.body.permissions) {
                        user.permissions = req.body.permissions;
                        user.save(function(err) {
                            res.status(200);
                            res.send('successfully set user permissions');
                        });
                    }
                    else {
                        res.status(400);
                        res.send('please remember to send permissions in the body! {"permissions":{"permissionType": boolean}}');
                    }
                    
                });
            })
        }
        else {
            res.status(403);
            res.send();
        }
      
    });
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