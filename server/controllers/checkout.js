var models = require("../models");
exports.show = (req, res) => {
    var user = req.session.passport.user;
    models.sequelize.query('select count(*) cartNum from Carts where userID =' + user.id + '', {model: models.Cart}).then((data) => {cartNum = data[0].dataValues.cartNum});
    models.sequelize.query(
        'select u.address address, u.postal_code postal_code,\
        c.id id, p.id productID, p.productImage productImage, p.productName productName, p.productType productType, p.price price, c.quantity quantity, p.quantity prodQuantity\
        from Carts c\
        join Products p on c.productID = p.id\
        join Users u on c.userID = u.id\
        where c.checked=1 and c.userID='+user.id, {model: models.Cart}
    ).then((cartData) => {
        models.Wallet.findOrCreate({ where: { userID: user.id } }).then((wallet)=>{
            res.render("checkout", {
                title: "Check Out",
                cartData: cartData,
                wallet:wallet,
                user: user,
                cartNum: cartNum,
                avatar: require('gravatar').url(user.email, {s: '100',r: 'x',d: 'retro'}, true),
                hostPath: req.protocol + "://" + req.get("host"),
            });
        });
    })
};
exports.checkout = (req,res) => {
    var user = req.session.passport.user;
    models.sequelize.query(
        'select c.id id, p.id productID, p.price price, c.quantity quantity, p.quantity prodQuantity, p.userID sellerID, address,mobile postal_code\
        from Carts c\
        join Products p on c.productID = p.id\
        join Users u on c.userID = u.id\
        where c.checked=1 and c.userID='+user.id, {model: models.Cart}
    ).then(async (cartData) => {
        let totalPrice = 0;
        for (var i=0;i<cartData.length; i++){
            let productPrice = parseFloat(cartData[i].dataValues.price * cartData[i].dataValues.quantity);
            totalPrice += productPrice;
        }
        await models.Orders.create({
            userID:user.id, totalPrice: totalPrice,
            shippingName: user.first_name + ' ' + user.last_name,
            shippingContact:user.mobile,
            shippingAddress: cartData[0].dataValues.address ,
            shippingPostalCode:cartData[0].dataValues.postal_code
        }).then(async (orderData)=>{
            for (var i = 0; i < cartData.length; i++) {
                let quantity = cartData[i].dataValues.prodQuantity
                quantity -= cartData[i].dataValues.quantity;
                let sellerID = cartData[i].dataValues.sellerID;
                let newSellerBalance = 0;
                let newUserBalance = 0;
                let productID = cartData[i].dataValues.productID;
                let orderQuantity = cartData[i].dataValues.quantity;
                let productPrice = parseFloat(cartData[i].dataValues.price * cartData[i].dataValues.quantity);
                await models.Products.findById(productID).then(async (product)=>{
                    await models.Wallet.find({ where: { userID: user.id } }).then(async (userWallet)=>{
                        newUserBalance = parseFloat(userWallet.balance) - productPrice;
                        await models.Wallet.update({balance:newUserBalance},{ where: { userID: user.id }}).then(async()=>{
                            await models.Transactions.create({
                                paymentMadeTo: product.userID,
                                description:"Buy "+product.productName,
                                debit:productPrice,
                                userID:user.id,
                                balance:newUserBalance
                            });
                        });
                    });
                    await models.Wallet.find({ where: { userID: sellerID } }).then(async (sellerWallet)=>{
                        newSellerBalance = parseFloat(sellerWallet.balance) + productPrice
                        await models.Wallet.update({balance:newSellerBalance}, { where: { userID:sellerID }}).then( async ()=>{
                            models.Products.update({ quantity:quantity }, { where: { id: productID }});
                            await models.Transactions.create({
                                userID: product.userID,
                                description:"Sell "+product.productName,
                                credit:productPrice,
                                paymentReceivedFrom: user.id,
                                balance:newSellerBalance
                            });
                        })
                    });
                    await models.OrderDetails.create({
                        orderID:orderData.id,
                        productID:productID,
                        quantity:orderQuantity,
                        price:productPrice,
                        sellerID:product.userID
                    });
                });
                models.Cart.destroy({where:{id:cartData[i].dataValues.id}});
            };
            res.status(200).send({message: "Check Out Successful on Order : ", orderID:orderData.id});
        });
    });
};
exports.success = (req, res) => {
    var user = req.session.passport.user;
    models.sequelize.query('select count(*) cartNum from Carts where userID =' + user.id + '', {model: models.Cart}).then((data) => {cartNum = data[0].dataValues.cartNum});
    models.Orders.findById(req.params.id)
    .then((orderData) => {
        models.Users.findById(user.id)
        .then((userData)=>{
            res.status(200).render("checkOutSuccess", {
                title: "Check Out Success",
                orderData: orderData,
                userData: userData,
                user: user,
                cartNum: cartNum,
                avatar: require('gravatar').url(user.email, {s: '100', r: 'x', d: 'retro'}, true),
                hostPath: req.protocol + "://" + req.get("host"),
            });
        })
    })
};