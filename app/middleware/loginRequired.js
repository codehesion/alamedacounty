module.exports = function(req, res, next) {
    /* Make Sure User Is Logged In */
    /* If User Is Authenticated In Session */
    if (req.isAuthenticated()){
        /* Continue */
        return next();
    } else {
        /* Return Flash Message */
        req.flash('loginMessage', 'Please Sign In');

        /* If Not Authenticated, Redirect To Login Page */
        res.redirect('/sign-in'); 
    }  	
};