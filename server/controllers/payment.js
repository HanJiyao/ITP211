var models = require("../models");
var paymentModel = models.PaymentDetails;
exports.insert = function (req, res) {
    var paymentDetailsData = {
        cardHolderName: req.body.cardHolderName,
        cardNumber: req.body.cardNumber,
        securityCode: req.body.securityCode,
        expiryDate: req.body.expiryDate,
        userID:req.session.passport.user.id
    }
    paymentModel.create(paymentDetailsData).then((newPaymentDetails, created) => {
        if (!newPaymentDetails) {
            return res.send(400, {
                message: "error"
            });
        }
        res.redirect("/payment")
    })
};
exports.list = function(req, res) {
    var user = req.session.passport.user;
    paymentModel.findAll({
        attributes: ["id","paymentDetailsID","cardHolderName","cardNumber","securityCode","expiryDate"]
    }).then(function(payment) {
        res.render("createPaymentDetails", {
            title: "Create Payment Details",
            itemList: payment,
            urlPath: req.protocol + "://" + req.get("host") + "/payment" + req.url,
            user: user,
            avatar: require('gravatar').url(user.email, { s: '100', r: 'x', d: 'retro' }, true)
        });
    }).catch((err)=> {
        return res.status(400).send({
            message: err
        });
    });
};
// edit payment details
// update payment details
// delete payment details