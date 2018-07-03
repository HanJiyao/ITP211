var models = require("../models");
exports.show = function (req, res) {
    var user = (req.session.passport) ? req.session.passport.user : false;
    var avatar = require('gravatar').url(user.email, { s: '100', r: 'x', d: 'retro' }, true);
    var id = req.params.id
    models.sequelize.query(
        'select p.id, p.productID, p.productName, p.productType, p.quantity, p.price, p.productDesc, u.username AS userID\
        from Products p\
        join Users u\
        on p.userID = u.id\
        where p.id = '+id+'', 
        { model: models.Products }).then(function (product) {
        res.render('productDetail', {
            title: product[0].productName,
            user: user,
            avatar: avatar,
            product: product[0],
        });
    })
};