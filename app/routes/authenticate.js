var session      = require('express-session');

module.exports = function(app, passport) {

// =============================================================================
// AUTHENTICATE (FIRST LOGIN) ==================================================
// =============================================================================

	// locally --------------------------------
		// LOGIN ===============================
		// show the login form
		//app.get('/login', function(req, res) {
		//	res.render('login.ejs', { message: req.flash('loginMessage') });
		//});

		// process the login form
		app.post('/login', function(req, res, next){
			passport.authenticate('local-login', function(err, user, info) {
				if (err) { console.log(err); res.status(500); return res.send(); }
				if (!user) { console.log('found no user'); res.status(403); return res.send(); }
				req.logIn(user, function(err) {
				  if (err) { console.log(err); return next(err); }
				  return res.send(user);
				});
			})(req, res, next);
		});

		// SIGNUP =================================
		// show the signup form
		app.get('/signup', function(req, res) {
			res.render('signup.ejs', { message: req.flash('loginMessage') });
		});

		// process the signup form
		app.post('/signup', function(req, res, next){
			passport.authenticate('local-signup', function(err, user, info) {
				if (err) { console.log(err); res.status(500); return res.send(); }
				if (!user) { console.log('found no user'); res.status(403); return res.send(); }
				req.logIn(user, function(err) {
				  if (err) { console.log(err); return next(err); }
				  return res.send(user);
				});
			})(req, res, next);
		});

	// facebook -------------------------------
	app.get ('/auth/facebook', function authenticateFacebook (req, res, next) {
	   session.returnTo = '/#' + req.query.returnTo; 
	   next();
	},
	passport.authenticate ('facebook'))
	.get ('/auth/facebook/callback', function (req, res, next) {
	  var authenticator = passport.authenticate ('facebook', {
	    successRedirect: session.returnTo,
	    failureRedirect: '/login'
	   });
       
	 delete session.returnTo;
	 authenticator (req, res, next);
       })
       /*
		// send to facebook to do the authentication
		app.get('/auth/facebook', passport.authenticate('facebook', { scope : 'email' }));

		// handle the callback after facebook has authenticated the user
		app.get('/auth/facebook/callback', function(req, res, next){
			passport.authenticate('facebook', function(err, user, info) {
				if (err) { return next(err); }
				if (!user) { return res.status(404); }
				req.logIn(user, function(err) {
				  if (err) { return next(err); }
				  return res.send(user);
				});
			})(req, res, next);
		});
 */
	// twitter --------------------------------

		// send to twitter to do the authentication
		app.get('/auth/twitter', passport.authenticate('twitter', { scope : 'email' }));

		// handle the callback after twitter has authenticated the user
		app.get('/auth/twitter/callback', function(req, res, next){
			passport.authenticate('twitter', function(err, user, info) {
				if (err) { return next(err); }
				if (!user) { return res.status(404); }
				req.logIn(user, function(err) {
				  if (err) { return next(err); }
				  return res.send(user);
				});
			})(req, res, next);
		});


	// google ---------------------------------

		// send to google to do the authentication
		app.get('/auth/google', passport.authenticate('google', { scope : ['profile', 'email'] }));

		// the callback after google has authenticated the user
		app.get('/auth/google/callback', function(req, res, next){
			passport.authenticate('google', function(err, user, info) {
				if (err) { return next(err); }
				if (!user) { return res.status(404); }
				req.logIn(user, function(err) {
				  if (err) { return next(err); }
				  return res.send(user);
				});
			})(req, res, next);
		});

// =============================================================================
// AUTHORIZE (ALREADY LOGGED IN / CONNECTING OTHER SOCIAL ACCOUNT) =============
// =============================================================================

	// locally --------------------------------
		app.get('/connect/local', function(req, res) {
			res.render('connect-local.ejs', { message: req.flash('loginMessage') });
		});
		app.post('/connect/local', function(req, res, next){
			passport.authenticate('local-signup', function(err, user, info) {
				if (err) { return next(err); }
				if (!user) { return res.status(404); }
				req.logIn(user, function(err) {
				  if (err) { return next(err); }
				  return res.send(user);
				});
			})(req, res, next);
		});

	// facebook -------------------------------

		// send to facebook to do the authentication
		app.get('/connect/facebook', passport.authorize('facebook', { scope : 'email' }));

		// handle the callback after facebook has authorized the user
		app.get('/connect/facebook/callback', function(req, res, next){
			passport.authorize('facebook', function(err, user, info) {
				if (err) { return next(err); }
				if (!user) { return res.status(404); }
				req.logIn(user, function(err) {
				  if (err) { return next(err); }
				  return res.send(user);
				});
			})(req, res, next);
		});

	// twitter --------------------------------

		// send to twitter to do the authentication
		app.get('/connect/twitter', passport.authorize('twitter', { scope : 'email' }));

		// handle the callback after twitter has authorized the user
		app.get('/connect/twitter/callback', function(req, res, next){
			passport.authorize('twitter', function(err, user, info) {
				if (err) { return next(err); }
				if (!user) { return res.status(404); }
				req.logIn(user, function(err) {
				  if (err) { return next(err); }
				  return res.send(user);
				});
			})(req, res, next);
		});


	// google ---------------------------------

		// send to google to do the authentication
		app.get('/connect/google', passport.authorize('google', { scope : ['profile', 'email'] }));

		// the callback after google has authorized the user
		app.get('/connect/google/callback', function(req, res, next){
			passport.authorize('google', function(err, user, info) {
				if (err) { return next(err); }
				if (!user) { return res.status(404); }
				req.logIn(user, function(err) {
				  if (err) { return next(err); }
				  return res.send(user);
				});
			})(req, res, next);
		});

    // =============================================================================
    // UNLINK ACCOUNTS =============================================================
    // =============================================================================
    // used to unlink accounts. for social accounts, just remove the token
    // for local account, remove email and password
    // user account will stay active in case they want to reconnect in the future

	// local -----------------------------------
	app.get('/unlink/local', function(req, res) {
		var user            = req.user;
		user.local.email    = undefined;
		user.local.password = undefined;
		user.save(function(err) {
			res.send('unlinked local');
		});
	});

	// facebook -------------------------------
	app.get('/unlink/facebook', function(req, res) {
		var user            = req.user;
		user.facebook.token = undefined;
		user.save(function(err) {
			res.send('unlinked facebook');
		});
	});

	// twitter --------------------------------
	app.get('/unlink/twitter', function(req, res) {
		var user           = req.user;
		user.twitter.token = undefined;
		user.save(function(err) {
			res.send('unlinked twitter');
		});
	});

	// google ---------------------------------
	app.get('/unlink/google', function(req, res) {
		var user          = req.user;
		user.google.token = undefined;
		user.save(function(err) {
			res.send('unlinked google');
		});
	});

	//logout
	app.delete('/session', function(req, res) {
		console.log('deleting session');
		    // this destroys the current session (not really necessary because you get a new one
		    req.session.destroy(function(err) {
			console.log('error:');
			console.log(err);
			res.send();
		    });
		
	});
};

// route middleware to ensure user is logged in
function isLoggedIn(req, res, next) {
	if (req.isAuthenticated())
		return next();

	res.redirect('/login');
};