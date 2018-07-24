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
        c.id id, p.id productID, p.productImage productImage, p.productName productName, p.productType productType, p.price price, c.quantity quantity, p.quantity prodQuantity\
        from Carts c\
        join Products p on c.productID = p.id\
        join Users u on c.userID = u.id\
        where c.checked=1 and c.userID='+user.id, {model: models.Cart}
    ).then((cartData) => {
        models.Wallet.findOrCreate({ where: { userID: user.id } }).then((wallet)=>{
            res.render("checkout", {
                title: "Check Out",
                cartData: cartData,
                wallet:wallet,
                user: user,
                cartNum: cartNum,
                avatar: require('gravatar').url(user.email, {
                    s: '100',
                    r: 'x',
                    d: 'retro'
                }, true),
                hostPath: req.protocol + "://" + req.get("host"),
            });
        });
    })
};
exports.checkout = (req,res) => {
    var user = req.session.passport.user;
    models.sequelize.query(
        'select c.id id, p.id productID, p.price price, c.quantity quantity, p.quantity prodQuantity, p.userID sellerID\
        from Carts c\
        join Products p on c.productID = p.id\
        where c.checked=1 and c.userID='+user.id, {model: models.Cart}
    ).then((cartData) => {
        let totalPrice = 0;
        for (var i=0;i<cartData.length; i++){
            let quantity = cartData[i].dataValues.prodQuantity
            quantity -= cartData[i].dataValues.quantity;
            let sellerID = cartData[i].dataValues.sellerID;
            let productPrice = parseFloat(cartData[i].dataValues.price * cartData[i].dataValues.quantity);
            var newSellerBalance = 0;
            models.Wallet.findById(sellerID).then((sellerWallet)=>{
                newSellerBalance = parseFloat(sellerWallet.balance)+productPrice
            })
            models.Products.update({ quantity:quantity }, { where: { id: cartData[i].dataValues.productID }}).then(() => {
                models.Wallet.update({balance:newSellerBalance},{ where: { userID:sellerID }})
            });
            totalPrice += productPrice;
        }
        var newUserBalance = 0;
        models.Wallet.find({ where: { userID: user.id } }).then((userWallet)=>{
            newUserBalance = userWallet.balance-totalPrice;
            models.Wallet.update({balance:newUserBalance},{ where: { userID: user.id }});
        })
        models.Orders.create({userID:user.id, totalPrice: totalPrice});
    })
}