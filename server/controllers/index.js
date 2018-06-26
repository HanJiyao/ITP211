var models = require("../models");
exports.show = function (req, res) {
    var user = (req.session.passport) ? req.session.passport.user : false;
    var avatar = require('gravatar').url(user.email, { s: '100', r: 'x', d: 'retro' }, true);
    models.sequelize.query('select p.id, p.productID, p.productName, p.productType, p.quantity, p.price, u.username AS userID from Products p join Users u on p.userID = u.id', { model: models.Products })
        .then(function (products) {
        res.render('index', {
                title: 'Silicon Zone',
                user : user,
                avatar : avatar,
                products: products,
            })
        })
};
