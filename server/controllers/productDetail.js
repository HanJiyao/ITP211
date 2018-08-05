var models = require("../models");
exports.show = function (req, res) {
    var user = (req.session.passport) ? req.session.passport.user : false;
    var avatar = require('gravatar').url(user.email, { s: '100', r: 'x', d: 'retro' }, true);
    var id = req.params.id
    var cartNum = 0;
    var wishlistData = false;
    if(user){
        models.sequelize.query('select count(*) cartNum from Carts where userID='+user.id, {model: models.Cart}).then((data) => {cartNum = data[0].dataValues.cartNum});
    }
    models.sequelize.query(
        'select productImage, productName, quantity, price, discount_percentage, p.id id, productType, productDesc, u.username AS userID, count(r.productID) reviewCount, round(avg(rating), 1) rating\
        from Products p\
        left outer join Reviews r on r.productID = p.id\
        join Users u on p.userID = u.id\
        where p.id='+id+'\
        group by productImage, productName, quantity, price, p.id, productType, productDesc, u.username',
        { model: models.Products }).then(async (product)=>{
            await models.Wishlist.find({where:{productID:product[0].dataValues.id,userID:user.id}}).then((wishlist)=>{
                console.log(wishlist)
                if(wishlist!=null){
                    wishlistData = wishlist.id
                }
            });
            await models.sequelize.query(
            "select r.created, user_id userID, title, content, rating, email, first_name, last_name\
            from Reviews r\
            join Products p on p.id = r.productID\
            join Users u on u.id = r.user_id\
            where p.id ="+id, 
            { model: models.Reviews }).then((reviews)=>{
                var reviewsAvatars = [];
                for (var i=0;i<reviews.length;i++){
                    reviewsAvatars.push(require('gravatar').url(reviews[i].dataValues.email, { s: '60', r: 'x', d: 'retro' }, true))
                }
                models.Cart.findAll({where:{userID:user.id}}).then((cartData)=>{
                res.render('productDetail', {
                    user: user,
                    cartNum: cartNum,
                    cartData: cartData,
                    avatar: avatar,
                    product: product[0].dataValues,
                    reviews:reviews,
                    reviewsAvatars: reviewsAvatars,
                    wishlist: wishlistData,
                    hostPath: req.protocol + "://" + req.get("host"),
                });
            })  
        })
    })
};