var models = require("../models");
var paymentModel = models.Payments;
exports.insert = function (req, res) {
    var paymentDetailsData = {
        paymentDetailsID: req.body.paymentDetailsID,
        cardHolderName: req.body.cardHolderName,
        cardNumber: req.body.cardNumber,
        securityCode: req.body.securityCode,
        expiryDate: req.body.expiryDate,
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
    var user = (req.session.passport) ? req.session.passport.user : false;
    paymentModel.findAll({
        attributes: ["id","paymentDetailsID","cardHolderName","cardNumber","securityCode","expiryDate"]
    }).then(function(payment) {
        res.render("payment", {
            title: "Payment Details",
            itemList: payment,
            urlPath: req.protocol + "://" + req.get("host") + "/payment" + req.url,
            user: user
        });
    }).catch((err)=> {
        return res.status(400).send({
            message: err
        });
    });
};
