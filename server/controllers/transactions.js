var models = require("../models");
var transactionsModel = models.Transactions;

exports.insert = function (req, res) {
    var transactionsData = {
        transactionDate: req.body.transactionDate,
        paymentMadeTo: req.body.paymentMadeTo,
        paymentReceivedFrom: req.body.paymentReceivedFrom,
        description: req.body.description,
        debit: req.body.debit,
        credit: req.body.credit,
        balance: req.body.balance,
        userID: req.session.passport.user.id
    }
    transactionsModel.view(transactionsData).then((newTransactionsData) => {
        if (!newTransactionsData) {
            return res.send(400, {
                message: "error"
            });
        }
        res.redirect("/transactions")
    });
};
exports.list = function (req, res) {
    var user = req.session.passport.user;
    //get cart num
    var cartNum = 0;
    models.sequelize.query('select count(*) cartNum from Carts where userID =' + user.id + '', {
        model: models.Cart
    }).then((data) => {
        cartNum = data[0].dataValues.cartNum
    });
    transactionsModel.findAll(
        { where: { userID: user.id } }).then(function(transactions) {
        res.render("viewTransactions", {
            title: "My Transaction History",
            itemList: transactions,
            urlPath: req.protocol + "://" + req.get("host") + "/transactions" + req.url,
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
// update transaction
exports.update = function (req, res) {
    var user = req.session.passport.user;
    var balance_num = req.body.balance;
    var currBalance = 0;
    var newBalance = 0;
    models.sequelize.query('SELECT balance FROM Wallets WHERE userID =' + user.id + '', {model: models.Transactions}).then((currBalanceData)=>{
        currBalance = currBalanceData[0].dataValues.balance;
        newBalance = currBalance + balance_num;
            
        var updateTransaction = {
            description: "Top Up",
            credit: balance_num,
            balance: newBalance
        }
        console.log(newBalance, balance_num);
        transactionsModel.update(updateTransaction, {where: {id: user.id}}).then((updateTransaction)=> {
            if (!updateTransaction || updateTransaction==0) {
                return res.send(400, {
                    message: "error"
                });
            }
            res.status(200).send({message: "Updated Transactions"});
        })
    });
};