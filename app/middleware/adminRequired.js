module.exports = function(req, res, next) {
    /* Make Sure User Is Admin */
    /* If User Is Authenticated In Session & Admin*/
    if (req.user.isAdmin){
        /* Continue */
        return next();
    } else {
        /* Return Flash Message */
        req.flash('loginMessage', 'Please Sign In As Admin');

        /* If Not Authenticated & Admin, Redirect To Login Page */
        res.redirect('/sign-in'); 
    } 	
};