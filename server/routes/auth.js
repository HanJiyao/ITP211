var authController = require('../controllers/auth.js');
module.exports = function (app, passport) {
    app.get('/signup', authController.signup);
    app.get('/login', authController.login);
    app.post('/signup', passport.authenticate('local-signup', {
            successRedirect: '/profile',
            failureRedirect: '/signup'
        }
    ));
    app.get('/profile', isLoggedIn, authController.profile);
    app.get('/logout', authController.logout);
    app.post('/login', passport.authenticate('local-login', {
            successRedirect: '/profile',
            failureRedirect: '/login'
        }
    ));
    function isLoggedIn(req, res, next) {
        if (req.isAuthenticated())
            return next();
        res.redirect('/login');
    }
}
