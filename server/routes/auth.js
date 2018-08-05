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
    app.post('/login', passport.authenticate('local-login', {
            successRedirect: '/',
            failureRedirect: '/login',
            failureFlash: true
        }
    ));
    app.get('/profile', isLoggedIn, authController.profile);
    app.post('/profile', isLoggedIn, authController.profileUpdate);
    app.get('/logout', authController.logout);
    app.post("/profile/delete", isLoggedIn, authController.accountDelete);
    app.get("/admin", isLoggedIn, authController.adminListAccount);
    app.post("/admin", isLoggedIn, authController.adminValidAccount);
    app.post("/admin/:id", isLoggedIn, authController.adminEditAccount);
    app.delete("/admin/:id", isLoggedIn, authController.adminDeleteAccount);
    function isLoggedIn(req, res, next) {
        if (req.isAuthenticated())
            return next();
        res.redirect('/login');
    }
}
