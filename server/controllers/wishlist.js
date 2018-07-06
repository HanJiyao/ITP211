var models = require("../models");
var WishlistModel = models.Wishlist;
exports.insert = function(req, res){
    var Wishlistdata={
        order_id:req.body.order_id,
        seller_name:req.body.seller_name,
        product_name:req.body.product_name,
        product_quantity:req.body.product_quantity,
        product_price:req.body.product_price,
        total_price:req.body.total_price,
        seller_name:req.body.seller_name,
        created:req.body.created,
    }
    WishlistModel.create(Wishlistdata).then((newWishlist,created)=>{
        if (!newWishlist){
            return res.send(400,{
                message:"error"
            });
        }
        res.redirect("/wishlist");
    })
};
   
    
exports.list = function(req, res){
    var user = req.session.passport.user;
    WishlistModel.findAll({where:{userID:user.id}})
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
    WishlistModel.findById(record_num).then(function(wishlistRecords){
        res.render("wishlist", {
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
    var Wishlistdata={
        order_id:req.body.order_id,
        seller_name:req.body.seller_name,
        product_name:req.body.product_name,
        product_quantity:req.body.product_quantity,
        product_price:req.body.product_price,
        total_price:req.body.total_price,
        seller_name:req.body.seller_name,
        created:req.body.created,
    }
    WishlistModel.update(updateData, {where: {id: record_num}}).then((updatedWishlist)=> {
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
    WishlistModel.destroy({where: { id: record_num}}).then((deleteRecord)=>{
        if (!deleteRecord){
            return res.send(400, {
                message: "error"
            });
        }
        res.status(200).send({message: "Delete Wishlist record: " + record_num});
    });
}
