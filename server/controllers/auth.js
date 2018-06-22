var exports = module.exports = {}
var gravatar = require('gravatar');
var models = require("../models");
var usertModel = models.Users;

exports.signup = function (req, res) {
    var user = (req.session.passport) ? req.session.passport.user : false;
    (req.session.passport) ? res.redirect('/profile') : res.render('signup', { title: 'Signup Page', user:user, message: req.flash('signupMessage')});
   
}

exports.login = function (req, res) {
    var user = (req.session.passport) ? req.session.passport.user : false;
    (req.session.passport) ? res.redirect('/profile') : res.render('login', { title: 'Login Page', user: user, message: req.flash('loginMessage')});
}
var models = require("../models");
var userModel = models.Users;

exports.profile = function (req, res) {
    userModel.findById(req.session.passport.user.id).then(function (userData) {
        res.render("profile", {
            title: "Profile Page",
            user: userData,
            avatar: require('gravatar').url(userData.email, { s: '100', r: 'x', d: 'retro' }, true),
            urlPath: req.protocol + "://" + req.get("host") + "/profile"
        });
    }).catch((err) => {
        return res.status(400).send({
            message: err
        });
    });
}

exports.profileUpdate = function (req, res) {
    var id = req.session.passport.user.id;
    var updateData = {
        username: req.body.username,
        email: req.body.email,
        avatar: req.body.avatar,
        mobile: req.body.mobile,
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        gender: req.body.gender,
        birthday: req.body.birthday,
        address: req.body.address,
        postal_code: req.body.postal_code
    }
    userModel.update(updateData, { where: { id: id } }).then((updatedUser) => {
        if (!updatedUser || updatedUser == 0) {
            return res.send(400, {
                message: "error"
            });
        }
        res.redirect("/profile");
    })
};

exports.logout = function (req, res) {
    req.session.destroy(function (err) {
        res.redirect('/');
    });
}

exports.accountDelete = function(req, res) {
    var id = req.session.passport.user.id;
    console.log("deleting user " + id);
    req.session.destroy()
    userModel.destroy({ where: { id: id } }).then((deleteUser) => {
        if (!deleteUser) {
            return res.send(400, {
                message: "error"
            });
        };
        res.redirect('/');
    });
}
