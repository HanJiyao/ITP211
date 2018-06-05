var productModel = require('../models/ProductModel');
var myDatabase = require("./sqlDatabase");
var SequelizeInstance = myDatabase.SequelizeInstance;

exports.insert = function(req, res){
    var productData ={
        productID: req.body.productID,
        productName: req.body.productName,
        type: req.body.type,
        qty: req.body.qty,
        price: req.body.price,
    }
    productModel.create(productData).then((newRecord, created)=> {
        if (!newRecord){
            return res.send(400, {
                message: "error"
            });
            
        }
        res.redirect("/")
    })
};

exports.list = function(req, res){
    productModel.findAll({
        attributes: ["id","productId", "productName", "type", "qty", "price"]
    }).then(function(products){
        res.render("index", {
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
    studentModel.findById(record_num).then(function(studentRecord){
        res.render("editRecord", {
            title: "Edit  Records",
            item: studentRecord,
            hostPath: req.protocol + "://" + req.get("host") + req.url
        });
    }).catch((err)=> {
        return res.status(400).send({
            message: err
        });
    });
};

exports.update = function(req, res){
    var studentData ={
        studentId: req.body.studentId,
        name: req.body.name,
        group: req.body.group,
        hobby: req.body.hobby,
    }
    studentModel.update(updateData, {where: {id: record_num}}).then((updateRecord)=> {
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
    studentModel.destroy({where: { id: record_num}}).then((deleteRecord)=>{
        if (!deleteRecord){
            return res.send(400, {
                message: "error"
            });
        }
        res.status(200).send({message: "Delete Student Record: " + record_num});
    });
}
