exports.show = function (req, res) {
    var user = (req.session.passport) ? req.session.passport.user : false
    res.render('index', {
        title: 'ITP211 Multimedia Application',
        user : user,
    });
};
