var models = require("../models");
var wishlistModel = models.Wishlist;
exports.insert = function(req, res){
    var Wishlistdata={
        seller_name:req.body.seller_name,
        product_name:req.body.product_name,
        product_quantity:req.body.product_quantity,
        product_price:req.body.product_price,
        total_price:req.body.total_price,
        seller_name:req.body.seller_name,
        created:req.body.created,
        userID:req.session.passport.user.id,
        product_id:req.body.product_id
    }
    wishlistModel.create(Wishlistdata).then((newWishlist,created)=>{
        if (!newWishlist){
            return res.send(400,{
                message:"error"
            });
        }
        res.redirect("/wishlistmanager");
    })
};
   
    
exports.list = function(req, res){
    var user = req.session.passport.user;
    wishlistModel.findAll({where:{userID:user.id}})
    .then(function(wishlist){
        res.render("wishlist", {
            title: "View Wishlist",
            itemList: wishlist,
            urlPath: req.protocol + "://" + req.get("host") +"/wishlistmanager"+ req.url,
            user: user,
            avatar: require('gravatar').url(user.email, { s: '100', r: 'x', d: 'retro' }, true)
        });
    }).catch((err)=> {
        return res.status(400).send({
            message: err
        });
    });
};
exports.editRecord = function(req, res){
    var user = req.session.passport.user;
    var record_num = req.params.id;
    wishlistModel.findById(record_num).then(function(wishlistRecords){
        res.render("editWishlist", {
            title: "Edit Wishlist",
            item: wishlistRecords,
            hostPath: req.protocol + "://" + req.get("host"),
            user: user,
            avatar: require('gravatar').url(user.email, { s: '100', r: 'x', d: 'retro' }, true)
        });
    }).catch((err)=> {
        return res.status(400).send({
            message: err
        });
    });
};  
exports.update = function(req, res){
    var record_num = req.params.id; 
    var Updatedata={
        id:req.body.id,
        seller_name:req.body.seller_name,
        product_name:req.body.product_name,
        product_quantity:req.body.product_quantity,
        product_price:req.body.product_price,
        total_price:req.body.total_price,
        seller_name:req.body.seller_name,
        created:req.body.created,
    }
    wishlistModel.update(UpdateData, {where: {id: record_num}}).then((updatedWishlist)=> {
        if (!updatedWishlist || updatedWishlist==0){
            return res.send(400, {
                message: "error"
            });   
        }
        res.status(200).send({message: "Updated Wishlist Record: " + record_num});
    })
};
exports.delete = function(req, res){
    var record_num = req.params.id;
    console.log("deleting" + record_num);
    wishlistModel.destroy({where: { id: record_num}}).then((deleteRecord)=>{
        if (!deleteRecord){
            return res.send(400, {
                message: "error"
            });
        }
        res.status(200).send({message: "Delete Wishlist record: " + record_num});
    });
}
