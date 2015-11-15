module.exports = function(app, passport) {
	app.get('/', function(req, res) {
		res.render('index.ejs');
	});
	
	// ROUTINES LIST VIEW =======================
	app.get('/routines', isLoggedIn, function(req, res) {
		res.render('routines.ejs', {
			user : req.user
		});
	});
	
	// ROUTINE DETAIL VIEW =======================
	app.get('/routine', isLoggedIn, function(req, res) {
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