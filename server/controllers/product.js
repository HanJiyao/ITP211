var models = require("../models");
var productModel = models.Products;
var fs = require('fs');
var mime = require('mime');
var image_type = ['image/jpg','image/jpeg', 'image/png'];
exports.insert = function(req, res){
    var productData ={
        productImage: req.file.originalname,
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
    if (image_type.indexOf(type)== -1){
        return res.status(415).send('supported image formats: jpeg, jpg, png,')
    }
    targetPath = './public/images/products/' + req.file.originalname;
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
        //remove from temp folder
        fs.unlink(tempPath, function(err){
            if(err){
                return res.status(500).send('Error happened during clear');
            }
            res.redirect('/productsmanager');
        });
    })
};
exports.list = function(req, res){
    var user = req.session.passport.user;
    // get cart num
    var cartNum = 0;
    var discount_price =0.0;
    models.sequelize.query('select price*discount  count(*) cartNum from Carts where userID =' + user.id + '', {
        model: models.Cart
    }).then((data) => {
        cartNum = data[0].dataValues.cartNum
    });
 
    productModel.findAll({where:{userID:user.id}})
    .then(function(products){
        res.render("products", {
            title: "View Products",
            itemList: products,
            urlPath: req.protocol + "://" + req.get("host") +"/productsmanager"+ req.url,
            user: user,
            cartNum: cartNum,
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
    // get cart num
    var cartNum = 0;
    models.sequelize.query('select count(*) cartNum from Carts where userID =' + user.id + '', {
        model: models.Cart
    }).then((data) => {
        cartNum = data[0].dataValues.cartNum
    });
    var record_num = req.params.id;
    productModel.findById(record_num).then(function(productRecords){
        res.render("editProduct", {
            title: "Edit Product",
            item: productRecords,
            hostPath: req.protocol + "://" + req.get("host"),
            user: user,
            cartNum: cartNum,
            avatar: require('gravatar').url(user.email, { s: '100', r: 'x', d: 'retro' }, true),
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
        productImage: req.file.originalname,
        productName: req.body.productName,
        productType: req.body.productType,
        productDesc: req.body.productDesc,
        quantity: req.body.quantity,
        price: req.body.price
    }
    var src;
    var dest;
    var targetPath;
    var tempPath = req.file.path;
    console.log(req.file);
    var type = mime.lookup(req.file.mimetype);
    if (image_type.indexOf(type)== -1){
        return res.status(415).send('supported image formats: jpeg, jpg, png,')
    }
    targetPath = './public/images/products/' + req.file.originalname;
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
        productModel.update(updateData, {where: {id: record_num}}).then((updatedProduct)=> {
            if (!updatedProduct){
                return res.status(400).send({
                    message: "error"
                });   
            }
        })
        //remove from temp folder
        fs.unlink(tempPath, function(err){
            if(err){
                return res.status(500).send('Error happened during clear');
            };
            res.redirect('/productsmanager');
        });
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