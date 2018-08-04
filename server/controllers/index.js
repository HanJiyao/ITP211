var models = require("../models");
exports.show = function (req, res) {
    var user = (req.session.passport) ? req.session.passport.user : false;
    var avatar = require('gravatar').url(user.email, { s: '100', r: 'x', d: 'retro' }, true);
    // get cart num
    var cartNum = 0;
    if (user){models.sequelize.query('select count(*) cartNum from Carts where userID=' + user.id, {model: models.Cart}).then((data) => {cartNum = data[0].dataValues.cartNum})}
    models.sequelize.query(
        'select *, p.id, u.username as userID, count(r.productID) reviewCount, round(avg(rating), 1) rating, count(o.quantity) saleCount\
        from Products p \
        join Users u on p.userID = u.id\
        left join Reviews r on r.productID = p.id\
        left join OrderDetails o on p.id = o.productID\
        group by p.id, p.productName, p.productType, p.productImage, p.price, u.username'
        , { model: models.Products })
    .then((products)=>{
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
