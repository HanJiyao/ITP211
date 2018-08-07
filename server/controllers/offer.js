var models = require("../models");
var Offer = models.Offer;
exports.insert = (req, res) => {
        var offerData = {
            productID: req.params.id,
            offerPrice: req.body.offerPrice,
            userID: req.session.passport.user.id,
        }
        Offer.create(offerData);
        res.status(200).send({
            message: "Make offer successful"
    });
};
exports.show = (req, res) => {
    var user = req.session.passport.user;
    models.sequelize.query('select count(*) cartNum from Carts where userID =' + user.id + '',{model: models.Cart}).then((data)=>{cartNum = data[0].dataValues.cartNum});
    var productID = req.params.id;
    models.sequelize.query(
        'select *, u.id userID, u.username username from Offers o join Users u on o.userID = u.id join Products p on o.productID = p.id where productID = '+productID, {model: models.Offer}).then((offerData)=>{
        console.log(offerData)
            res.render("offer", {
            title: "Offer Status",
            offerData: offerData,
            user: user,
            cartNum: cartNum,
            avatar: require('gravatar').url(user.email, { s: '100', r: 'x', d: 'retro' }, true),
            hostPath: req.protocol + "://" + req.get("host"),
        });
    });
};
exports.edit = (req, res) => {
    var user = req.session.passport.user;
    var productID = req.params.id;
    var updatetime = new Date();
    var offerPrice = {offerPrice: req.body.offerPrice,accepted:null,updated:updatetime};
    console.log(offerPrice)
    Offer.update(offerPrice, {where: {userID: user.id, productID:productID}}).then((offerPriceData) => {
        if (!offerPriceData) {
            return res.send(400, {
                message: "You enter the same price"
            });
        }
        res.status(200).send({
            message: "Updated Offer from "+user.id+" for "+productID
        });
    })
};
exports.check = (req,res) => {
    var userID = req.body.userID;
    var productID = req.params.id;
    var accepted = {accepted: req.body.accepted};
    console.log(accepted)
    Offer.update(accepted, {where: {userID: userID, productID:productID}}).then((offerData) => {
        if (!offerData) {
            return res.send(400, {
                message: "You enter the same price"
            });
        }
        res.status(200).send({
            message: "Updated Offer from " + userID + " for " + productID
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
};