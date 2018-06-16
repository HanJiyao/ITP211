var exports = module.exports = {}
var gravatar = require('gravatar');
exports.signup = function (req, res) {
    var user = (req.session.passport) ? req.session.passport.user : false;
    (req.session.passport) ? res.redirect('/profile'):res.render('signup', { title: 'Signup Page', user:user, message: req.flash('signupMessage')});
   
}

exports.login = function (req, res) {
    var user = (req.session.passport) ? req.session.passport.user : false;
    (req.session.passport) ? res.redirect('/profile') : res.render('login', { title: 'Login Page', user: user, message: req.flash('loginMessage')});
}

exports.profile = function (req, res) {
    res.render('profile', {title: 'Profile Page', user: req.user, avatar: gravatar.url(req.user.email ,  {s: '100', r: 'x', d: 'retro'}, true)});
}

exports.logout = function (req, res) {
    req.session.destroy(function (err) {
        res.redirect('/');
    });
}
