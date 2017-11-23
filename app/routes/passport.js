module.exports = function(app, passport) {

    /* Login Page */
    app.get('/sign-in', function(req, res) {
        res.render('passport/signIn.ejs', { 
            message : req.flash('loginMessage'),
            title : "Login", 
        }); 
    });

    app.post('/sign-in', passport.authenticate('local-login', {
        successRedirect : '/',
        failureRedirect : '/sign-in',
        failureFlash : true
    }));

    /* Signup Page */
    app.get('/sign-up', function(req, res) {
        res.render('passport/signUp.ejs', { 
            title : "Sign Up",
            message: req.flash('signupMessage'), 
        });
    });

    app.post('/sign-up', passport.authenticate('local-signup', {
        successRedirect : '/',
        failureRedirect : '/sign-up',
        failureFlash : true,
    }));

    /* Logout */
    app.get('/sign-out', function(req, res) {
        req.logout();
        res.redirect('/');
    });

}; // end module export
