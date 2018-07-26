var models = require("../models");
var Orderhistory=models.sequelize;
exports.list=function(req,res){
    var user=req.session.passport.user;
    // get cart num
    var models = require("../models");
    var cartNum = 0;
    models.sequelize.query('select count(*) cartNum from Carts where userID =' + user.id + '', {
        model: models.Cart
    }).then((data) => {
        cartNum = data[0].dataValues.cartNum
    });
    //list all orders and sort by date
    models.sequelize.query("select * from orderdetails od inner join products p on od.productID=p.id inner join orders o on p.userID=o.userID",{model: models.OrderDetails})
    .then((orderhistory)=>{console.log(orderhistory)
        res.render("orderhistory",{
            title:"Order History page",
            orderhistory:orderhistory,
            user:user,
            cartNum: cartNum,
            avatar: avatar = require('gravatar').url(user.email, {s: '100', r: 'x', d: 'retro'}, true),
            urlPath:req.protocol+"://" + req.get("host")+req.url,
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

       
        