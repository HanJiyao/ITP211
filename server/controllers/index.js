var models = require("../models");
exports.show = function (req, res) {
    var user = (req.session.passport) ? req.session.passport.user : false;
    var avatar = require('gravatar').url(user.email, { s: '100', r: 'x', d: 'retro' }, true);
    // get cart num
    var cartNum = 0;
    if (user){models.sequelize.query('select count(*) cartNum from Carts where userID=' + user.id, {model: models.Cart}).then((data) => {cartNum = data[0].dataValues.cartNum})}
    models.sequelize.query(
        'select p.id, productName, productType, productImage, p.price, discount_percentage, p.created, p.userID, reviewCount, p.rating, saleCount\
        from(select  p.id id, productName, productType, productImage, price, discount_percentage, p.created created, u.username userID, count(distinct r.id) reviewCount, round(avg(rating), 1) rating\
            from Products p \
            join Users u on p.userID = u.id \
            left join Reviews r on r.productID = p.id \
            group by p.id, p.productName, p.productType, p.productImage, p.price, u.username, r.productID) p \
        join(select p.id id, sum(o.quantity) saleCount\
            from Products p \
            left join OrderDetails o on o.productID = p.id \
            group by p.id, o.productID) s \
        on p.id = s.id \
        order by s.saleCount desc ', { model: models.Products })
        .then((products)=>{
            models.sequelize.query(
            'select p.id, productName, productType, productImage, p.price, discount_percentage, p.created, p.userID, reviewCount, p.rating, saleCount\
            from(select p.id id, productName, productType, productImage, price, discount_percentage, p.created created, u.username userID, count(distinct r.id) reviewCount, round(avg(rating), 1) rating\
                from Products p \
                join Users u on p.userID = u.id \
                left join Reviews r on r.productID = p.id \
                group by p.id, p.productName, p.productType, p.productImage, p.price, u.username, r.productID) p \
            join(select p.id id, sum(o.quantity) saleCount\
                from Products p \
                left join OrderDetails o on o.productID = p.id \
                group by p.id, o.productID) s \
            on p.id = s.id \
            order by p.rating desc ', { model: models.Products })
            .then((productsRating)=>{
                models.sequelize.query(
                'select p.id, productName, productType, productImage, p.price, discount_percentage, p.created, p.userID, reviewCount, p.rating, saleCount\
                from(select p.id id, productName, productType, productImage, price, discount_percentage, p.created created, u.username userID, count(distinct r.id) reviewCount, round(avg(rating), 1) rating\
                    from Products p \
                    join Users u on p.userID = u.id \
                    left join Reviews r on r.productID = p.id \
                    group by p.id, p.productName, p.productType, p.productImage, p.price, u.username, r.productID) p \
                join(select p.id id, sum(o.quantity) saleCount\
                    from Products p \
                    left join OrderDetails o on o.productID = p.id \
                    group by p.id, o.productID) s \
                on p.id = s.id \
                order by discount_percentage desc ', { model: models.Products })
                .then((productsSale)=>{
                    models.sequelize.query(
                    'select p.id, productName, productType, productImage, p.price, discount_percentage, p.created, p.userID, reviewCount, p.rating, saleCount\
                    from(select p.id id, productName, productType, productImage, price, discount_percentage, p.created created, u.username userID, count(distinct r.id) reviewCount, round(avg(rating), 1) rating\
                        from Products p \
                        join Users u on p.userID = u.id \
                        left join Reviews r on r.productID = p.id \
                        group by p.id, p.productName, p.productType, p.productImage, p.price, u.username, r.productID) p \
                    join(select p.id id, sum(o.quantity) saleCount\
                        from Products p \
                        left join OrderDetails o on o.productID = p.id \
                        group by p.id, o.productID) s \
                    on p.id = s.id \
                    order by p.created desc ', { model: models.Products })
                    .then((productsNew)=>{
                        res.render('index', {
                            title: 'Silicon Zone',
                            user : user,
                            cartNum: cartNum,
                            avatar : avatar,
                            products: products,
                            productsSale: productsSale,
                            productsRating: productsRating,
                            productsNew:productsNew,
                            hostPath: req.protocol + "://" + req.get("host"),
                    });
                });
            });
        });
    });
};
