var models=require("../models");
var wishlistsmodel=models.wishlists;
exports.insert=function(req,res){
    var wishlistsdata={
        productID:req.body.productID,
        productName: req.body.productName,
        productType: req.body.productType,
        qty: req.body.qty,
        price: req.body.price,
    }
    wishlistsmodel.create(wishlistsdata).then((newProduct,created)=>{
        if(!newProduct){
            return res.send(400,{
                message:"error"
            });
        }
        res.render("/products")
    })
};
exports.list=function(req,res){
    var user=(req.session.passport) ? req.session.passport.user :false;
    wishlistsmodel.findAll({
        attributes:["id","productID","productName","productType","qty","price"]
    }).then(function(products){
        res.render("wishlist",{
            title:"Wishlist Page",
            itemList:products,
            urlPath:req.protocol + "://" + req.get("host") +"/products"+req.url,
            user:user
        });
    }).catch((err)=>{
        return res.status(400).send({
            message:err
        });
    });
};
exports.editWishlists=function(req,res){
    var user=(req.session.passport)? req.session.passport.user : false;
    var wishlists_num=req.params.id;
    wishlistsmodel.findById(wishlists_num).then(function(wishlistsRecords){
        res.render("wishlist",{
            title:"Edit Wishlist",
            item:wishlistsRecords,
            hostPath:req.protocol + "://" + req.get("host"),
            user:user
        });
    }).catch((err)=>{
        return res.status(400).send({
            message:err
        });
    });
};
exports.update=function(req,res){
    var wishlists_num=req.params.id;
    var updateData={
        productID:req.body.productID,
        productName:req.body.productName,
        productType:req.body.productType,
        qty:req.body.qty,
        price:req.body.price
    }
    wishlistsmodel.update(updateData,{where:{id:wishlists_num}}).then((updatedWishlist)=>{
        if (!updatedWishlist || updatedWishlist==0){
            return res.send(400,{
                message:"error"
            });
        }
        res.status(200).send({message:"Updated Wishlist Record:"+ wishlists_num});
    })

};
exports.delete=function(req,res){
    var wishlists_num=req.params.id;
    console.log("deleting" + wishlists_num);
    wishlistsmodel.destroy({where:{ id:wishlists_num}}).then((deletewishlist)=>{
        if (!deletewishlist){
            returnres.send(400,{
                message:"error"
            });
        }
        res.status(200).send({message:"Delete Wishlist Record:" + wishlists_num});
    });
}