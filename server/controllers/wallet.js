var models = require("../models");
var walletModel = models.Wallet;
// GET view page
exports.view = (req,res) => {
    var user = req.session.passport.user;
    walletModel.findAll({ where: { userID: user.id } }).then(function(wallet) {
        console.log(wallet);
        res.render("viewWallet", {
            title: "My Silicon Wallet",
            itemList: wallet,
            urlPath: req.protocol + "://" + req.get("host") + "/payment" + req.url,
            user: user,
            avatar: require('gravatar').url(user.email, { s: '100', r: 'x', d: 'retro' }, true)
        });
    }).catch((err)=> {
        return res.status(400).send({
            message: "error"
        });
    });
}
// POST view page
exports.insert = function (req,res) {
    var walletData = {
        balance: req.body.balance,
        userID: req.session.passport.user.id
    }
    walletModel.view(walletData).then((newWalletData) => {
        if (!newWalletData) {
            return res.send(400, {
                message: "error"
            });
        }
        res.redirect("/Wallet")
    });
};
exports.list = function (req,res) {
    var user = req.session.passport.user;
    walletModel.findAll({
        attributes: ["balance"]
    }, { where: { userID: user.id } }).then(function(wallet) {
        res.render("viewWallet", {
            title: "My Silicon Wallet",
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
// update wallet
exports.update = function (req,res) {
    var balance_num = req.params.id;
    var updateBalance = {
        balance: req.body.balance
    }
    walletModel.update(updateBalance, {where: {id: balance_num}}).then((updatedBalance)=> {
        if (!updatedBalance || updatedBalance==0) {
            return res.send(400, {
                message: "error"
            });
        }
        res.status(200).send({message: "Updated Balance: " + balance_num});
    })
};