var models = require("../models");
exports.show = function (req, res) {
    var user = (req.session.passport) ? req.session.passport.user : false;
    var avatar = require('gravatar').url(user.email, { s: '100', r: 'x', d: 'retro' }, true);
    var id = req.params.id
    // get cart num
    var cartNum = 0;
    if(user){models.sequelize.query('select count(*) cartNum from Carts where userID='+user.id, {model: models.Cart}).then((data) => {cartNum = data[0].dataValues.cartNum})}
    models.sequelize.query(
        'select productImage, productName, quantity, price, p.id id, productType, productDesc, u.username AS userID, count(r.productID) reviewCount, round(avg(rating),0) rating\
        from Products p\
        left outer join Reviews r on r.productID = p.id\
        join Users u on p.userID = u.id\
        where p.id='+id+'\
        group by productImage, productName, quantity, price, p.id, productType, productDesc, u.username',
        { model: models.Products }).then((product)=>{
            models.sequelize.query(
            'select r.created reviewCreated, r.title title, r.content content, r.rating rating\
            from Reviews r\
            join Products p on p.id = r.productID\
            where p.id ='+id, 
            { model: models.Reviews }).then((review)=>{
                models.Cart.findAll({where:{userID:user.id}}).then((cartData)=>{
                res.render('productDetail', {
                    user: user,
                    cartNum: cartNum,
                    cartData: cartData,
                    avatar: avatar,
                    product: product[0].dataValues,
                    review:review,
                    hostPath: req.protocol + "://" + req.get("host"),
                });
            })  
        })
    })
};