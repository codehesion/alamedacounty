/* Middleware */
const loginRequired = require('../middleware/loginRequired');
const adminRequired = require('../middleware/adminRequired');


module.exports = function(app) {

    // Home Page
    app.get('/', function(req, res) {
        res.render('static/home.ejs', {
            title : "Home",
        });
    });

}; // end module export
