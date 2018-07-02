var models = require("../models");
var Orderhistory=models.sequelize;
exports.show=function(req,res){
    var user=req.session.passport;
    //list all orders and sort by date
    sequelize.query("select o.order_id,o.seller_name,o.product_id,o.product_name,o.product_quantity,o.product_price,o.total_price,Orderhistory o ",{model:Orderhistory})
    .then((Orderhistory)=>{
        res.render("orderhistory",{
            title:"Order History",
            Orderhistory:Orderhistory,
            
            urlPath:req.protocol+"://" + req.get("host")+req.url,
       
            
        })
    }).catch((err)=>{
        return res.status(400).send({
            message:err
        });
    });
};
        })
    })
}