module.exports = function(app, passport, express) {
	app.use('/', express.static('public/index.html'));
	
	// ROUTINES LIST VIEW =======================
	app.get('/routines', isLoggedIn, function(req, res) {
		res.render('../../public/routines.html', {
			user : req.user
		});
	});
	
	// ROUTINE DETAIL VIEW =======================
	app.get('/routines', isLoggedIn, function(req, res) {
		res.render('routine.ejs', {
			user : req.user
		});
	});
	
	// PROFILE SECTION =========================
	app.get('/profile', isLoggedIn, function(req, res) {
		res.render('profile.ejs', {
			user : req.user
		});
	});

	// LOGOUT ==============================
	app.get('/logout', function(req, res) {
		req.logout();
		res.redirect('/');
	});
}

// route middleware to ensure user is logged in
function isLoggedIn(req, res, next) {
	if (req.isAuthenticated())
		return next();

	res.redirect('/');
}