var models = require("../models");
var Cart = models.Cart;
exports.insert = (req, res)=>{
    var cartData = {
        productID: req.params.id,
        quantity: req.body.quantity,
        userID: req.user.id,
    }
    Cart.create(cartData).then((newData, created) => {
        if (!newData) {
            return res.send(400, {
                message: "error"
            });
        }
    });
};