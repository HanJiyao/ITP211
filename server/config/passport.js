//load bcrypt
var bCrypt = require('bcrypt-nodejs');
module.exports = function (passport, user) {
    var User = user;
    var LocalStrategy = require('passport-local').Strategy;
    passport.serializeUser(function (user, done) {
        done(null, user.id, user.username, user.email);
    });
    // used to deserialize the user
    passport.deserializeUser(function (id, done) {
        User.findById(id).then(function (user) {
            if (user) {
                done(null, user.get());
            }
            else {
                done(user.errors, null);
            }
        });
    });
    passport.use('local-signup', new LocalStrategy(
        {
            usernameField: 'email',
            passwordField: 'password',
            passReqToCallback: true // allows us to pass back the entire request to the callback
        },
        function (req, email, password, done) {
            var generateHash = function (password) {
                return bCrypt.hashSync(password, bCrypt.genSaltSync(8), null);
            };
            User.findOne({ where: { email: email } }).then(function (user) {
                if (user) {
                    return done(null, false, req.flash('signupMessage', 'That email has been taken, try another one'));
                }
                else {
                    var userPassword = generateHash(password);
                    var data = {
                        username: req.body.username,
                        email: email,
                        password: userPassword
                    };
                    User.create(data).then(function (newUser, created) {
                        if (!newUser) {
                            return done(null, false);
                        }
                        if (newUser) {
                            return done(null, newUser);
                        }
                    });
                }
            }).catch(function (err) {
                console.log("Error:", err);
                return done(null, false, req.flash('signupMessage', 'Something went wrong with your Signup'));
            });
        }
    ));
    //LOCAL LOGIN
    passport.use('local-login', new LocalStrategy(
        {
            // by default, local strategy uses username and password, we will override with email
            usernameField: 'email',
            passwordField: 'password',
            passReqToCallback: true // allows us to pass back the entire request to the callback
        },
        function (req, email, password, done) {
            var User = user;
            var isValidPassword = function (userpass, password) {
                return bCrypt.compareSync(password, userpass);
            }
            User.findOne({ where: { email: email } }).then(function (user) {
                if (!user) {
                    return done(null, false, req.flash('loginMessage', 'Email does not exist'), req.session.save());
                }
                if (!isValidPassword(user.password, password)) {
                    return done(null, false, req.flash('loginMessage', 'Incorrect password'), req.session.save());
                }
                var userinfo = user.get();
                return done(null, userinfo);
            }).catch(function (err) {
                console.log("Error:", err);
                return done(null, false, req.flash('loginMessage', 'Something went wrong with your Login' ));
            });
        }
    ));
}
