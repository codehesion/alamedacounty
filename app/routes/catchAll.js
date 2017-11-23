/* Middleware */
const loginRequired = require('../middleware/loginRequired');
const adminRequired = require('../middleware/adminRequired');


module.exports = function(app) {

    // Is The User Logged In ?
	app.use(function (req, res, next) {
	    if (req.user) {
	        res.locals.user = req.user;
	        res.locals.isLoggedIn = true;
	    } else {
	        res.locals.user = null;
	        res.locals.isLoggedIn = false;
	    }
	    return next(); 
	});

}; // end module export
