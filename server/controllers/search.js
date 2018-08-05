var models = require("../models");
exports.default = function (req, res) {
    var user = (req.session.passport) ? req.session.passport.user : false;
    var avatar = require('gravatar').url(user.email, { s: '100', r: 'x', d: 'retro' }, true);
    var cartNum = 0;
    if (user){models.sequelize.query('select count(*) cartNum from Carts where userID=' + user.id, {model: models.Cart}).then((data) => {cartNum = data[0].dataValues.cartNum})};
    var category = (req.params.category == "all") ? "is not null " : " = '" + req.params.category+"'";
    var keyword = (req.params.keyword == "all") ? "" : "and ( productName like '%" + req.params.keyword + "%') or (productType like '%" + req.params.keyword + "%')";
    var min = (req.params.min == "min") ? "0" : req.params.min;
    var max = (req.params.max == "max") ? "99999999" : req.params.max;
    var sort;
    switch(req.params.sort){
        case "popularity":
            sort = "s.saleCount";
            break;
        case "ratings":
            sort = "p.rating";
            break;
        case "price":
            sort = "p.price";
            break;
        case "discount":
            sort = "discount_percentage";
            break;
    };
    var order = req.params.order;
    console.log(category)
    console.log(keyword)
    console.log(sort)
    console.log(order)
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
        where p.price between ' + min + ' and ' + max + ' and  productType ' + category + keyword + ' \
        order by '+sort+' '+order
        , {
            model: models.Products
        })
    .then((products) => {
        res.status(200).render('search', {
            title: 'Search '+ req.params.keyword+' in '+req.params.category,
            user: user,
            cartNum: cartNum,
            avatar: avatar,
            products: products,
            hostPath: req.protocol + "://" + req.get("host"),
            category: req.params.category,
            keywordDisplay: (req.params.keyword == "all") ? "all" : '"'+req.params.keyword+'"',
            keyword: (req.params.keyword == "all") ? "" : req.params.keyword ,
            sort: req.params.sort,
            order: req.params.order,
            min: (req.params.min == "min") ? "" : req.params.min,
            max: (req.params.max == "max") ? "" : req.params.max
        });
    });
}