var authController = require('../controllers/auth.js');
module.exports = function (app, passport) {
    app.get('/signup', authController.signup)
    app.get('/login', authController.login);
    app.post('/signup', passport.authenticate('local-signup', {
            successRedirect: '/profile',
            failureRedirect: '/signup',
            failureFlash: true
        }
    ));
    app.get('/profile', isLoggedIn, authController.profile);
    app.get('/logout', authController.logout);
    app.post('/login', passport.authenticate('local-login', {
            successRedirect: '/',
            failureRedirect: '/login',
            failureFlash: true
        }
    ));
    function isLoggedIn(req, res, next) {
        if (req.isAuthenticated())
            return next();
        res.redirect('/login');
    }
}
