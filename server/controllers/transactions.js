var models = require("../models");
var transactionsModel = models.Transactions;

// exports.insert = function (req, res) {
//     var transactionsData = {
//         transactionDate: req.body.transactionDate,
//         paymentMadeTo: req.body.paymentMadeTo,
//         paymentReceivedFrom: req.body.paymentReceivedFrom,
//         description: req.body.description,
//         debit: req.body.debit,
//         credit: req.body.credit,
//         balance: req.body.balance,
//         userID: req.session.passport.user.id
//     }
//     transactionsModel.view(transactionsData).then((newTransactionsData) => {
//         if (!newTransactionsData) {
//             return res.send(400, {
//                 message: "error"
//             });
//         }
//         res.redirect("/transactions")
//     });
// };
exports.list = function (req, res) {
    var user = req.session.passport.user;
    //get cart num
    var cartNum = 0;
    models.sequelize.query('select count(*) cartNum from Carts where userID =' + user.id + '', {
        model: models.Cart
    }).then((data) => {
        cartNum = data[0].dataValues.cartNum
    });
    models.sequelize.query('SELECT *, u.username as paymentMadeTo, s.username as paymentReceivedFrom\
    FROM Transactions t \
    LEFT JOIN Users u ON t.paymentMadeTo = u.id \
    LEFT JOIN Users s ON t.paymentReceivedFrom = s.id \
    WHERE userID='+user.id+' ORDER BY transactionDate',{model: models.Transactions })
    .then((transactions)=> {
        res.render("viewTransactions", {
            title: "My Transaction History",
            itemList: transactions,
            urlPath: req.protocol + "://" + req.get("host") + "/transactions" + req.url,
            user: user,
            cartNum: cartNum,
            avatar: require('gravatar').url(user.email, { s: '100', r: 'x', d: 'retro' }, true),
            hostPath: req.protocol + "://" + req.get("host"),
        });
    }).catch((err)=> {
        return res.status(400).send({
            message: err
        });
    });
};
