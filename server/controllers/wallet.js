var models = require("../models");
var walletModel = models.Wallet;
// GET view page
exports.view = (req,res) => {
    var user = req.session.passport.user;
    // get cart num
    var cartNum = 0;
    var paymentData = 0;//declare 0 as false
    //check the paymentdetails table (whether it is empty)
    models.PaymentDetails.findAll({where: {userID:user.id}}).then((data) => {
        console.log(data)
        if (data!="") {//if any data exists inside table
            paymentData = 1;//declare 1 as true
        }
    });
    models.sequelize.query('select count(*) cartNum from Carts where userID =' + user.id + '', {model: models.Cart}).then((data) => {cartNum = data[0].dataValues.cartNum});
    walletModel.findOrCreate({ where: { userID: user.id } }).then(function(wallet) {
        res.render("viewWallet", {
            title: "My Silicon Wallet",
            itemList: wallet,
            paymentData: paymentData,
            urlPath: req.protocol + "://" + req.get("host") + "/payment" + req.url,
            user: user,
            cartNum: cartNum,
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
    var user = req.session.passport.user;
    var balance_num = req.body.balance;
    var currBalance = 0;
    var newBalance = 0;
    models.sequelize.query('SELECT balance FROM Wallets WHERE userID =' + user.id + '', {model: models.Wallet}).then((currBalanceData)=>{
        currBalance = currBalanceData[0].dataValues.balance
        newBalance = currBalance + balance_num;
            
        var updateBalance = {
            balance: newBalance
        }
        console.log(newBalance,currBalance, balance_num);
        walletModel.update(updateBalance, {where: {id: user.id}}).then((updatedBalance)=> {
            if (!updateBalance || updateBalance==0) {
                return res.send(400, {
                    message: "error"
                });
            }
            res.status(200).send({message: "Updated Balance: " + balance_num});
        })
    });
};
// edit wallet balance
exports.edit = function(req, res) {
    var user = req.session.passport.user;
    // get cart num
    var cartNum = 0;
    models.sequelize.query('select count(*) cartNum from Carts where userID =' + user.id + '', {model: models.Cart}).then((data) => { cartNum = data[0].dataValues.cartNum});
    var balance_num = req.params.id;
    models.sequelize.query('select * from Wallets where userID =' + user.id + '', {model: models.Wallet}).then(function (wallet) {
        // console.log(wallet)
        res.render("topupWallet", {
            title: "Top Up My Wallet",
            item: wallet[0].dataValues,
            hostPath: req.protocol + "://" + req.get("host"),
            user: user,
            cartNum: cartNum,
            avatar: require('gravatar').url(user.email, {s: '100', r: 'x', d: 'retro'}, true)
        });
    })
}