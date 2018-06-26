var models = require("../models");
var productModel = models.Products;
exports.insert = function(req, res){
    var productData ={
        productID: req.body.productID,
        productName: req.body.productName,
        productType: req.body.productType,
        productDesc: req.body.productDesc,
        quantity: req.body.quantity,
        price: req.body.price,
        userID:req.session.passport.user.id
    }
    productModel.create(productData).then((newProduct, created)=> {
        if (!newProduct){
            return res.send(400, {
                message: "error"
            });
        }
        res.redirect("/productsmanager")
    })
};
exports.list = function(req, res){
    var user = req.session.passport.user;
    productModel.findAll({where:{userID:user.id}})
    .then(function(products){
        res.render("products", {
            title: "View Products",
            itemList: products,
            urlPath: req.protocol + "://" + req.get("host") +"/productsmanager"+ req.url,
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
    productModel.findById(record_num).then(function(productRecords){
        res.render("editProduct", {
            title: "Edit Product",
            item: productRecords,
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
    var updateData ={
        productID: req.body.productID,
        productName: req.body.productName,
        productType: req.body.productType,
        productDesc: req.body.productDesc,
        quantity: req.body.quantity,
        price: req.body.price
    }
    productModel.update(updateData, {where: {id: record_num}}).then((updatedProduct)=> {
        if (!updatedProduct || updatedProduct==0){
            return res.send(400, {
                message: "error"
            });   
        }
        res.status(200).send({message: "Updated Product Record: " + record_num});
    })
};
exports.delete = function(req, res){
    var record_num = req.params.id;
    console.log("deleting" + record_num);
    productModel.destroy({where: { id: record_num}}).then((deleteRecord)=>{
        if (!deleteRecord){
            return res.send(400, {
                message: "error"
            });
        }
        res.status(200).send({message: "Delete Product record: " + record_num});
    });
}
