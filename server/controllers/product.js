var models = require("../models");
var productModel = models.Products;
var fs = require('fs');
var mime = require('mime');
var image_type = ['image/jpg','image/jpeg', 'image/png'];
exports.insert = function(req, res){
    var productData ={
        productID: req.body.productID,
        productImage: req.body.productImage,
        productName: req.body.productName,
        productType: req.body.productType,
        productDesc: req.body.productDesc,
        quantity: req.body.quantity,
        price: req.body.price,
        userID:req.session.passport.user.id
    }
    var src;
    var dest;
    var targetPath;
    var tempPath = req.file.path;
    console.log(req.file);
    var type = mime.lookup(req.file.mimetype);
    var extension = req.file.path.spilt(/[. ]+/).pop();
    if (image_type.indexOf(type)== -1){
        return res.status(415).send('supported image formats: jpeg, jpg, png,')
    }
    targetPath = '../../public/uploads' + req.file.originalname;
    src = fs.createReadStream(tempPath);
    dest = fs.createWriteStream(targetPath);
    src.pipe(dest);
    src.on('error', function (err){
        if (err){
            return res.status(500).send({
                message: error
            });
        }
    });
    src.on('end', function(){
        productModel.create(productData).then((newProduct, created)=> {
            if (!newProduct){
                return res.send(400, {
                    message: "error"
                });
            }
        })
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
        productImage: req.body.productImage,
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

exports.hasAuthorization = function (req, res, next) {
    if (req.isAuthenticated())
        return next();
    res.redirect('/login');
};  