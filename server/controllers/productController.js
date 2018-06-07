var productModel = require('../models/ProductModel');
var myDatabase = require("../controllers/database")
var SequelizeInstance = myDatabase.SequelizeInstance;

exports.insert = function(req, res){
    var productData ={
        productId: req.body.productId,
        productName: req.body.productName,
        productType: req.body.productType,
        qty: req.body.qty,
        price: req.body.price,
    }
    productModel.create(productData).then((newProduct, created)=> {
        if (!newProduct){
            return res.send(400, {
                message: "error"
            });
            
        }
        res.redirect("/products")
    })
};

exports.list = function(req, res){
    productModel.findAll({
        attributes: ["id","productId", "productName", "productType", "qty","price"]
    }).then(function(products){
        res.render("products", {
            title: "View Products",
            itemList: products,
            urlPath: req.protocol + "://" + req.get("host") + req.url
        });
    }).catch((err)=> {
        return res.status(400).send({
            message: err
        });
    });
};
exports.editRecord = function(req, res){
    var record_num = req.params.id;
    productModel.findById(record_num).then(function(productRecords){
        res.render("editProduct", {
            title: "Edit Product",
            item: productRecords,
            hostPath: req.protocol + "://" + req.get("host")
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
        productId: req.body.productId,
        productName: req.body.productName,
        productType: req.body.productType,
        qty: req.body.qty,
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
