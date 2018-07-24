var models = require("../models");
var Cart = models.Cart;
exports.insert = (req, res) => {
    var cartData = {
        productID: req.params.id,
        quantity: req.body.quantity,
        userID: req.user.id,
    }
    models.Cart.find({where:{productID:req.params.id}}).then((existData)=>{
        if(existData){
            Cart.update({quantity:existData.quantity+parseFloat(req.body.quantity)},{where:{id:existData.id}})
        }else{
            Cart.create(cartData)
        }
    });
};
exports.show = (req, res) => {
    var user = req.session.passport.user;
    models.sequelize.query('select count(*) cartNum from Carts where userID =' + user.id + '',{model: models.Cart}).then((data)=>{cartNum = data[0].dataValues.cartNum});
    models.sequelize.query(
        'select c.id id, p.id productID, p.productImage productImage, p.productName productName, p.productType productType, p.price price, c.quantity quantity, p.quantity prodQuantity\
        from Carts c\
        join Products p on c.productID = p.id\
        where c.userID =' + user.id, {model: models.Cart}).then((cartData)=>{
        res.render("cart", {
            title: "Silicon Zone Cart",
            cartData: cartData,
            user: user,
            cartNum: cartNum,
            avatar: require('gravatar').url(user.email, { s: '100', r: 'x', d: 'retro' }, true),
            hostPath: req.protocol + "://" + req.get("host"),
        });
    })
}
exports.check = (req,res) => {
    var cartID = req.body.id;
    var updateCart = {
        checked: req.body.checked
    };
    Cart.update(updateCart, {
        where: {
            id: cartID
        }
    }).then((updateCart) => {
        if (!updateCart) {
            return res.send(400, {
                message: "error"
            });
        }
        res.status(200).send({
            message: "Updated Cart id: " + cartID
        });
    })
}
exports.edit = (req, res) => {
    var cartID = req.params.id;
    var updateCart = {
        quantity: req.body.quantity
    };
    Cart.update(updateCart, {
        where: {
            id: cartID
        }
    }).then((updateCart) => {
        if (!updateCart) {
            return res.send(400, {
                message: "error"
            });
        }
        res.status(200).send({
            message: "Updated Cart id: " + cartID
        });
    })
};
exports.delete = function (req, res) {
    var cartNum = req.params.id;
    console.log("deleting" + cartNum);
    Cart.destroy({
        where: {
            id: cartNum
        }
    }).then((deleteRecord) => {
        if (!deleteRecord) {
            return res.send(400, {
                message: "error"
            });
        }
        res.status(200).send({
            message: "Delete Cart record: " + cartNum
        });
    });
}