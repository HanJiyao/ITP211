var models = require("../models");
exports.show = function (req, res) {
    var user = (req.session.passport) ? req.session.passport.user : false;
    var avatar = require('gravatar').url(user.email, { s: '100', r: 'x', d: 'retro' }, true);
    var id = req.params.id
    // get cart num
    var cartNum = 0;
    models.sequelize.query('select count(*) cartNum from Carts where userID =' + user.id + '', {
        model: models.Cart
    }).then((data) => {
        cartNum = data[0].dataValues.cartNum
    })
    models.sequelize.query(
        'select *, u.username AS userID\
        from Products p\
        join Users u\
        on p.userID = u.id\
        where p.id = '+id+'', 
        { model: models.Products }).then(function (product) {
        res.render('productDetail', {
            title: product[0].productName,
            user: user,
            cartNum: cartNum,
            avatar: avatar,
            product: product[0],
            hostPath: req.protocol + "://" + req.get("host"),
        });
    })
};