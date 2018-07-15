var models = require("../models");
exports.show = function (req, res) {
    var user = (req.session.passport) ? req.session.passport.user : false;
    var avatar = require('gravatar').url(user.email, { s: '100', r: 'x', d: 'retro' }, true);
    // get cart num
    var cartNum = 0;
    models.sequelize.query('select count(*) cartNum from Carts where userID =' + user.id + '', {model: models.Cart}).then((data) => {cartNum = data[0].dataValues.cartNum});
    models.sequelize.query('select p.id, p.productName, p.productType, p.productImage, p.price, u.username as userID from Products p inner join Users u on p.userID = u.id', { model: models.Products })
    .then(function (products) {
    res.render('index', {
            title: 'Silicon Zone',
            user : user,
            cartNum: cartNum,
            avatar : avatar,
            products: products,
            hostPath: req.protocol + "://" + req.get("host"),
        })
    })
};
