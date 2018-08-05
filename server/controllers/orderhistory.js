var models = require("../models");
exports.list=function(req,res){
    var user=req.session.passport.user;
    // get cart num
    var cartNum = 0;
    models.sequelize.query('select count(*) cartNum from Carts where userID =' + user.id + '', {model: models.Cart}).then((data) => {cartNum = data[0].dataValues.cartNum});
    //list all orders and sort by date
    models.sequelize.query("select * from Orders where userID="+user.id, {model: models.Orders})
    .then((orderhistory)=>{
        console.log(orderhistory)
        res.render("orderhistory",{
            title:"Order History page",
            orderhistory:orderhistory,
            user:user,
            cartNum: cartNum,
            avatar: avatar = require('gravatar').url(user.email, {s: '100', r: 'x', d: 'retro'}, true),
            urlPath:req.protocol+"://" + req.get("host"),
            hostPath: req.protocol + "://" + req.get("host"),
        })
    }).catch((err)=>{
        return res.status(400).send({
            message:err
        });
    });
};
exports.listdetail=function(req,res){
    var user=req.session.passport.user;
    // get cart num
    var cartNum = 0;
    models.sequelize.query('select count(*) cartNum from Carts where userID ='+user.id, {model: models.Cart}).then((data) => {cartNum = data[0].dataValues.cartNum});
    var orderID = req.params.id;
    models.sequelize.query("select *,od.productID, od.quantity quantity from OrderDetails od inner join Products p on od.productID=p.id inner join Orders o on od.orderID=o.id where od.orderID="+orderID, {model: models.OrderDetails})
    .then((orderhistory)=>{
        console.log(orderhistory)
        res.render("orderdetails",{
            title:"Order Details page",
            orderhistory:orderhistory,
            user:user,
            cartNum: cartNum,
            avatar: avatar = require('gravatar').url(user.email, {s: '100', r: 'x', d: 'retro'}, true),
            urlPath:req.protocol+"://" + req.get("host"),
            hostPath: req.protocol + "://" + req.get("host"),
        })
    }).catch((err)=>{
        return res.status(400).send({
            message:err
        });
    });
};
exports.hasAuthorization=function(req,res,next){
    if (req.isAuthenticated())
        return next();
    res.redirect("/login");
};
   