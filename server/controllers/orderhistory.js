var models = require("../models");
var Orderhistory=models.sequelize;
exports.list=function(req,res){
    var user=req.session.passport;
    // get cart num
    var models = require("../models");
    var cartNum = 0;
    models.sequelize.query('select count(*) cartNum from Carts where userID =' + user.id + '', {
        model: models.Cart
    }).then((data) => {
        cartNum = data[0].dataValues.cartNum
    });
    //list all orders and sort by date
    sequelize.query("select o.id,o.created,o.seller_name,o.product_name,o.product_quantity,o.product_price,o.total_price,o.seller_name from Orderhistory o ",{model:Orderhistory})
    .then((orderhistory)=>{
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
exports.create=function (req,res){
    console.log("creating orderhistory")

    var orderhistoryData={
        id:req.body.id,
        seller_name:req.body.seller_name,
        product_name:req.body.product_name,
        product_quantity:req.body.product_quantity,
        product_price:req.body.product_price,
        total_price:req.body.total_price,
        seller_name:req.body.seller_name,
        created:req.body.created,
    }
    Orderhistory.create(orderhistoryData).then((newOrderhistory,created)=>{
        if (!newOrderhistory){
            return res.send(400,{
                message:"error"
            });
        }
        res.redirect("/orderhistory");
    })
};
exports.delete=function(req,res){
    var record_num=req.params.id;
    console.log('deleting Order History' +record_num);
    Orderhistory.destroy({where:{id:record_num}}).then((deletedOrderhistory)=>{
        if (!deletedOrderhistory){
            return res.send(400, {
                message: "error"
            });
        }
        res.status(200).send({message:"Deleted Order history :" + record_num });
    })
}
exports.hasAuthorization=function(req,res,next){
    if (req.isAuthenticated())
        return next();
    res.redirect("/login");
};

       
        