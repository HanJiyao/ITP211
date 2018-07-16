var models = require("../models");
var walletModel = models.Wallet;
// GET view page
exports.view = (req,res) => {
    var user = req.session.passport.user;
    // get cart num
    var cartNum = 0;
    models.sequelize.query('select count(*) cartNum from Carts where userID =' + user.id + '', {model: models.Cart}).then((data) => {cartNum = data[0].dataValues.cartNum});
    walletModel.findOrCreate({ where: { userID: user.id } }).then(function(wallet) {
        res.render("viewWallet", {
            title: "My Silicon Wallet",
            itemList: wallet,
            urlPath: req.protocol + "://" + req.get("host") + "/payment" + req.url,
            user: user,
            cartNum:cartNum,
            avatar: require('gravatar').url(user.email, { s: '100', r: 'x', d: 'retro' }, true)
        });
    })
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
    // get cart num
    var cartNum = 0;
    models.sequelize.query('select count(*) cartNum from Carts where userID =' + user.id + '', {
        model: models.Cart
    }).then((data) => {
        cartNum = data[0].dataValues.cartNum
    });
    walletModel.findAll({
        attributes: ["balance"]
    }, { where: { userID: user.id } }).then(function(wallet) {
        res.render("viewWallet", {
            title: "My Silicon Wallet",
            itemList: wallet,
            urlPath: req.protocol + "://" + req.get("host") + "/payment" + req.url,
            user: user,
            cartNum: cartNum,
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
// edit wallet balance
exports.edit = function(req, res) {
    var user = req.session.passport.user;
    // get cart num
    var cartNum = 0;
    models.sequelize.query('select count(*) cartNum from Carts where userID =' + user.id + '', {
        model: models.Cart
    }).then((data) => {
        cartNum = data[0].dataValues.cartNum
    });
    var balance_num = req.params.id;
    walletModel.findById(balance_num).then(function(updateBalance){
        res.render("topupWallet", {
            title: "Top Up My Wallet",
            item: wallet,
            hostPath: req.protocol + "://" + req.get("host"),
            user: user,
            cartNum: cartNum,
            avatar: require('gravatar').url(user.email, {s: '100', r: 'x', d: 'retro'}, true)
        });
    }).catch((err)=> {
        return res.status(400).send({
            message: err
        });
    });
}