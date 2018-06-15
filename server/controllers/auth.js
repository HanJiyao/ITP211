var exports = module.exports = {}
exports.signup = function (req, res) {
    res.render('signup', { title: 'Signup Page', message: req.flash('signupMessage') });
}

exports.login = function (req, res) {
    res.render('login', { title: 'Login Page', message: req.flash('loginMessage') });
}

exports.profile = function (req, res) {
    res.render('profile', {title: 'Profile Page',user: req.user});
}

exports.logout = function (req, res) {
    req.session.destroy(function (err) {
        res.redirect('/');
    });
}
