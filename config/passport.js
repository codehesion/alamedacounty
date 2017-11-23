// Require Environment Variables if they don't exist 
if (!process.env.DB_URI){
    require('./env.js');
}

// Require Local Strategy Module
const LocalStrategy   = require('passport-local').Strategy;

// Require User Model
const User            = require('../app/models/user');

// Export To Our Application
module.exports = function(passport) {

    // =========================================================================
    // passport session setup ==================================================
    // =========================================================================
    // required for persistent login sessions
    // passport needs ability to serialize and unserialize users out of session

    // used to serialize the user for the session
    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    // used to deserialize the user
    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            done(err, user);
        });
    });

    // =========================================================================
    // LOCAL SIGNUP ============================================================
    // =========================================================================
    // we are using named strategies since we have one for login and one for signup
    // by default, if there was no name, it would just be called 'local'

    passport.use('local-signup', new LocalStrategy({
        // by default, local strategy uses username and password, we will override with email
        usernameField : 'username',
        passwordField : 'password',
        passReqToCallback : true // allows us to pass back the entire request to the callback
    },
    function(req, username, password, done) {

        process.nextTick(function() {

            // By Default User Is Not Admin
            let isAdmin = false;

            // Count Users & If There Are None, Make The First User An Admin
            User.find({}, (err, users) => {
                if(err){ console.log(err); }
                if(users.length === 0){ isAdmin = true ; }
            });

            // Look For An Existing User
            User.findOne({ 'local.username' :  username }, function(err, userName) {
                
                // If Error, Return Error
                if (err) { return done(err); }
                    
                // If Record Already Exists With Requested Username
                if (userName) {
                    return done(null, false, req.flash('signupMessage', 'That username is already taken.'));
                } else {

                    // No Existing User, Create New User
                    let newUser = new User();

                    // Set User Credentials
                    newUser.isAdmin = isAdmin;
                    newUser.local.createdAt = String(new Date());
                    newUser.local.username = username;
                    newUser.local.password = newUser.generateHash(password);
                    newUser.local.email = "";
                    newUser.local.phoneNumber = "";
                    newUser.local.profileImageUrl = "/images/default-profile-image.png";

                    // Save New User
                    newUser.save(function(err) {
                        if (err)
                            throw err;
                        return done(null, newUser);
                    });
                }

            });    

        });

    }));

    // =========================================================================
    // LOCAL LOGIN =============================================================
    // =========================================================================
    // we are using named strategies since we have one for login and one for signup
    // by default, if there was no name, it would just be called 'local'

    passport.use('local-login', new LocalStrategy({
        // by default, local strategy uses username and password
        usernameField : 'username',
        passwordField : 'password',
        passReqToCallback : true // allows us to pass back the entire request to the callback
    },
    function(req, username, password, done) { // callback with username and password from our form

        // find a user whose username is the same as the forms username field
        // we are checking to see if the user trying to login already exists
        User.findOne({ 'local.username' :  username }, function(err, user) {
            // if there are any errors, return the error before anything else
            if (err)
                return done(err);

            // if no user is found, return the message
            if (!user)
                return done(null, false, req.flash('loginMessage', 'No user found.')); // req.flash is the way to set flashdata using connect-flash

            // if the user is found but the password is wrong
            if (!user.validPassword(password))
                return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.')); // create the loginMessage and save it to session as flashdata

            // all is well, return successful user
            return done(null, user);
        });

    }));

};