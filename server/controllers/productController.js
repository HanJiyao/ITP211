var productModel = require('../models/ProductModel');
var myDatabase = require("./database");
var SequelizeInstance = myDatabase.SequelizeInstance;

exports.insert = function(req, res){
    var productData ={
        productID: req.body.productID,
        productName: req.body.productName,
        type: req.body.type,
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
        attributes: ["productId", "productName", "type", "qty", "price"]
    }).then(function(products){
        res.render("products", {
            title: " View Products",
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
    productModel.findById(record_num).then(function(productRecord){
        res.render("editRecord", {
            title: "Edit Records",
            item: productRecord,
            hostPath: req.protocol + "://" + req.get("host") + req.url
        });
    }).catch((err)=> {
        return res.status(400).send({
            message: err
        });
    });
};

exports.update = function(req, res){
    var productData ={
        productId: req.body.productId,
        productName: req.body.productName,
        type: req.body.type,
        qty: req.body.qty,
        price: req.body.price,
    }
    productModel.update(updateData, {where: {id: record_num}}).then((updateRecord)=> {
        if (!updateRecord || updateRecord==0){
            return res.send(400, {
                message: "error"
            });   
        }
        res.status(200).send({message: "Updated student record: " + record_num});
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
        res.status(200).send({message: "Delete product record: " + record_num});
    });
}
