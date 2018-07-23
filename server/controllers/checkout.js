var models = require("../models");
exports.show = (req, res) => {
    var user = req.session.passport.user;
    models.sequelize.query('select count(*) cartNum from Carts where userID =' + user.id + '', {
        model: models.Cart
    }).then((data) => {
        cartNum = data[0].dataValues.cartNum
    });
    models.sequelize.query(
        'select u.address address, u.postal_code postal_code,\
        w.balance balance,\
        c.id id, p.id productID, p.productImage productImage, p.productName productName, p.productType productType, p.price price, c.quantity quantity, p.quantity prodQuantity\
        from Carts c\
        join Products p on c.productID = p.id\
        join Wallets w on c.userID = w.userID\
        join Users u on c.userID = u.id\
        where c.checked=1 and c.userID='+user.id+' and w.userID='+user.id, {model: models.Cart}
    ).then((cartData) => {
        res.render("checkout", {
            title: "Check Out",
            cartData: cartData,
            user: user,
            cartNum: cartNum,
            avatar: require('gravatar').url(user.email, {
                s: '100',
                r: 'x',
                d: 'retro'
            }, true),
            hostPath: req.protocol + "://" + req.get("host"),
        });
    }).catch((err) => {
        return res.status(400).send({
            message: err
        });
    });
}