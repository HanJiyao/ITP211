var models = require("../models");
exports.insert = function(req, res){
    var Wishlistdata={
        userID:req.session.passport.user.id,
        productID:req.params.id
    }
    models.Wishlist.create(Wishlistdata).then((newWishlist)=>{
        if (!newWishlist){
            return res.send(400,{
                message:"error"
            });
        }
        res.status(200).send({message:"add wishlist success"})
    })
};
exports.list = function(req, res){
    var user = req.session.passport.user;
    var cartNum = 0;
    models.sequelize.query('select count(*) cartNum from Carts where userID =' + user.id + '', {model: models.Cart}).then((data) => {cartNum = data[0].dataValues.cartNum});
    models.sequelize.query('select * from Products p join Wishlists w on p.id = w.productID', {model: models.Products})
    .then((products)=>{
        res.render("wishlist", {
            title: "View Wishlist",
            products: products,
            hostPath: req.protocol + "://" + req.get("host"),
            user: user,
            cartNum: cartNum,
            avatar: require('gravatar').url(user.email, { s: '100', r: 'x', d: 'retro' }, true)
        });
    }).catch((err) => {
        return res.status(400).send({
            message: err
        });
    });
};
exports.delete = function(req, res){
    var record_num = req.params.id;
    console.log("deleting" + record_num);
    models.Wishlist.destroy({where: { id: record_num}}).then((deleteRecord)=>{
        if (!deleteRecord){
            return res.send(400, {
                message: "error"
            });
        }
        res.status(200).send({message: "Delete Wishlist record: " + record_num});
    });
}
