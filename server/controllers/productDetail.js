var models = require("../models");
exports.show = function (req, res) {
    var user = (req.session.passport) ? req.session.passport.user : false;
    var avatar = require('gravatar').url(user.email, { s: '100', r: 'x', d: 'retro' }, true);
    var id = req.params.id
    // get cart num
    var cartNum = 0;
    if(user){models.sequelize.query('select count(*) cartNum from Carts where userID='+user.id, {model: models.Cart}).then((data) => {cartNum = data[0].dataValues.cartNum})}
    models.sequelize.query(
        'select p.productImage productImage, p.productName productName, p.quantity quantity, p.price price, p.id id, p.productType productType, u.username AS userID\
        from Products p\
        join Users u on p.userID = u.id\
        where p.id='+id, 
        { model: models.Products }).then((product)=>{
            models.sequelize.query(
            'select r.created reviewCreated, r.title title, r.content content, r.rating rating\
            from Reviews r\
            join Products p on p.id = r.productID\
            where p.id ='+id, 
            { model: models.Reviews }).then((review)=>{
                console.log(review)
                res.render('productDetail', {
                    title: "",
                    user: user,
                    cartNum: cartNum,
                    avatar: avatar,
                    product: product[0].dataValues,
                    review:review,
                    hostPath: req.protocol + "://" + req.get("host"),
            });
        })
    })
};