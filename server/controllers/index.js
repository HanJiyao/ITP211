exports.show = function (req, res) {
    var user = (req.session.passport) ? req.session.passport.user : false;
    var avatar = require('gravatar').url(user.email, { s: '100', r: 'x', d: 'retro' }, true);
    res.render('index', {
        title: 'Silicon Zone',
        user : user,
        avatar : avatar
    });
};
