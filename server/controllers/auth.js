var exports = module.exports = {}
var models = require("../models");
var userModel = models.Users;
exports.signup = function (req, res) {
    (req.session.passport) ? res.redirect('/profile') : res.render('signup', { title: 'Signup Page', message: req.flash('signupMessage')});
}
exports.login = function (req, res) {
    (req.session.passport) ? res.redirect('/profile') : res.render('login', { title: 'Login Page', message: req.flash('loginMessage')});
}
var models = require("../models");
var userModel = models.Users;
exports.profile = function (req, res) {
    var user = req.session.passport.user;
    // get cart num
    var cartNum = 0;
    models.sequelize.query('select count(*) cartNum from Carts where userID =' + user.id + '', {
        model: models.Cart
    }).then((data) => {
        cartNum = data[0].dataValues.cartNum
    });
    userModel.findById(user.id).then(function (userData) {
        res.render("profile", {
            title: "Profile Page",
            user: userData,
            cartNum: cartNum,
            avatar: require('gravatar').url(userData.email, { s: '100', r: 'x', d: 'retro' }, true),
            hostPath: req.protocol + "://" + req.get("host"),
            urlPath: req.protocol + "://" + req.get("host") + "/profile"
        });
    }).catch((err) => {
        return res.status(400).send({
            message: err
        });
    });
}
exports.profileUpdate = function (req, res) {
    var id = req.session.passport.user.id;
    var mobile = (req.body.mobile == "") ? null : parseInt(req.body.mobile);
    console.log(req.body.birthday)
    var updateData = {
        username: req.body.username,
        email: req.body.email,
        avatar: req.body.avatar,
        mobile: mobile,
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        gender: req.body.gender,
        birthday: req.body.birthday,
        address: req.body.address,
        postal_code: req.body.postal_code
    }
    userModel.update(updateData, { where: { id: id } }).then((updatedUser) => {
        if (!updatedUser) {
            return res.send(400, {
                message: "error"
            });
        };
        res.redirect("/profile");
    })
};
exports.logout = function (req, res) {
    req.session.destroy(function (err) {
        res.redirect('/');
    });
}
exports.accountDelete = function(req, res) {
    var id = req.session.passport.user.id;
    console.log("deleting user " + id);
    req.session.destroy()
    models.Transactions.destroy({ where: { userID: id } }).then(async()=>{
        await models.Transactions.destroy({ where: { paymentMadeTo: id } }).then(async()=>{
            await models.Transactions.destroy({ where: { paymentReceivedFrom: id } }).then(async()=>{
                await models.PaymentDetails.destroy({ where: { userID: id } }).then(async()=>{
                    await models.Orders.findAll({ where: { userID: id } }).then(async(orderData)=>{
                        await models.Products.findAll({ where: { userID: id } }).then(async(productData)=>{
                            for (var i=0;i<orderData.length;i++){
                                await models.OrderDetails.destroy({ where: { orderID: orderData[i].id} }).then(async (orderdetailsData)=>{
                                    await models.Orders.destroy({ where: { id: orderdetailsData.orderID } })
                                })
                            }
                            for (var j = 0; j < productData.length; j++) {
                                await models.OrderDetails.destroy({ where: { productID:productData[j].id } }).then(async (orderdetailsData)=>{
                                    await models.Orders.destroy({ where: { id: orderdetailsData.orderID } })
                                })
                            }
                            await models.Orders.destroy({ where: { userID: id } }).then(async()=>{
                                await models.Wallet.destroy({ where: { userID: id } }).then(async()=>{
                                    await models.Reviews.destroy({ where: { user_id: id } }).then(async()=>{
                                        await models.Wishlist.destroy({ where: { userID: id } }).then(async()=>{
                                            await models.Cart.destroy({ where: { userID: id } }).then(async()=>{
                                                await models.Products.destroy({ where: { userID: id } }).then(async()=>{
                                                    await userModel.destroy({ where: { id: id } }).then((deleteUser) => {
                                                        if (!deleteUser) {
                                                            return res.send(400, {
                                                                message: "error"
                                                            });
                                                        };
                                                    })
                                                })
                                            })
                                        })
                                    })
                                })
                            })
                        })
                    })
                })
            })
        })
    })
    res.redirect('/'); 
}
exports.adminValidAccount = (req, res)=>{
    if (req.body.password == "Admin"){
        res.status(200).send({ valid: true });
    } else {
        res.status(200).send({ valid: false });
    }
}
exports.adminListAccount = function (req, res) {
    var user = req.session.passport.user;
    // get cart num
    var cartNum = 0;
    models.sequelize.query('select count(*) cartNum from Carts where userID =' + user.id + '', {
        model: models.Cart
    }).then((data) => {
        cartNum = data[0].dataValues.cartNum
    });
    userModel.findAll({ 
        attributes: ["id", "email", "username", "password", "last_login","createdAt", "mobile"] 
    }).then(function (userData) {
        res.render("auth", {
            title: "Admin Console",
            userData: userData,
            user: user,
            cartNum: cartNum,
            avatar: require('gravatar').url(user.email, { s: '100', r: 'x', d: 'retro' }, true),
            urlPath: req.protocol + "://" + req.get("host") + "/admin",
            hostPath: req.protocol + "://" + req.get("host"),
        });
    })
}
exports.adminEditAccount = function (req, res) {
    var id = req.params.id;
    var updateData = {
        username: req.body.username,
        email: req.body.email,
        mobile: req.body.mobile,
    }
    userModel.update(updateData, { where: { id: id } }).then((updatedUser) => {
        if (!updatedUser || updatedUser == 0) {
            return res.send(400, {
                message: "error"
            });
        }
        res.redirect("/admin");
    })
}
exports.adminDeleteAccount = function (req, res) {
    var id = req.params.id;
    models.Transactions.destroy({ where: { userID: id } }).then(async()=>{
        await models.Transactions.destroy({ where: { paymentMadeTo: id } }).then(async()=>{
            await models.Transactions.destroy({ where: { paymentReceivedFrom: id } }).then(async()=>{
                await models.PaymentDetails.destroy({ where: { userID: id } }).then(async()=>{
                    await models.Orders.findAll({ where: { userID: id } }).then(async(orderData)=>{
                        await models.Products.findAll({ where: { userID: id } }).then(async(productData)=>{
                            for (var i=0;i<orderData.length;i++){
                                await models.OrderDetails.destroy({ where: { orderID: orderData[i].id} }).then(async (orderdetailsData)=>{
                                    await models.Orders.destroy({ where: { id: orderdetailsData.orderID } })
                                })
                            }
                            for (var j = 0; j < productData.length; j++) {
                                await models.OrderDetails.destroy({ where: { productID:productData[j].id } }).then(async (orderdetailsData)=>{
                                    await models.Orders.destroy({ where: { id: orderdetailsData.orderID } })
                                })
                            }
                            await models.Orders.destroy({ where: { userID: id } }).then(async()=>{
                                await models.Wallet.destroy({ where: { userID: id } }).then(async()=>{
                                    await models.Reviews.destroy({ where: { user_id: id } }).then(async()=>{
                                        await models.Wishlist.destroy({ where: { userID: id } }).then(async()=>{
                                            await models.Cart.destroy({ where: { userID: id } }).then(async()=>{
                                                await models.Products.destroy({ where: { userID: id } }).then(async()=>{
                                                    await userModel.destroy({ where: { id: id } }).then((deleteUser) => {
                                                        if (!deleteUser) {
                                                            return res.send(400, {
                                                                message: "error"
                                                            });
                                                        };
                                                        res.status(200).send({ message: "Delete User Account: " + id });
                                                    })
                                                })
                                            })
                                        })
                                    })
                                })
                            })
                        })
                    })
                })
            })
        })
    })
}