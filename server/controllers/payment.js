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
exports.edit = function(req, res) {
    var user = req.session.passport.user;
    var detail_num = req.params.id;
    paymentModel.findById(detail_num).then(function(paymentDetails){
        res.render("editPaymentDetails", {
            title: "Edit Payment Details",
            item: paymentDetails,
            hostPath: req.protocol + "://" + req.get("host"),
            user: user,
            avatar: require('gravatar').url(user.email, {s: '100', r: 'x', d: 'retro'}, true)
        });
    }).catch((err)=> {
        return res.status(400).send({
            message: err
        });
    });
}
// update payment details
exports.update = function(req, res) {
    var detail_num = req.params.id;
    var updateDetails = {
        cardHolderName: req.body.cardHolderName,
        cardNumber: req.body.cardNumber,
        securityCode: req.body.securityCode,
        expiryDate: req.body.expiryDate
    }
    paymentModel.update(updateDetails, {where: {id: detail_num}}).then((updatedDetails)=> {
        if (!updatedDetails || updatedDetails==0) {
            return res.send(400, {
                message: "error"
            });
        }
        res.status(200).send({message: "Updated Payment Details: " + detail_num});
    })
};
// delete payment details
exports.delete = function(req, res) {
    var detail_num = req.params.id;
    console.log("Deleting" + detail_num);
    paymentModel.destroy({where: {id: detail_num}}).then((deleteDetail)=> {
        if (!deleteDetail){
            return res.send(400, {
                message: "error"
            });
        }
        res.status(200).send({message: "Delete Payment Detail: " + detail_num});
    });
}