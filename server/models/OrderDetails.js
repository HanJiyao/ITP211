module.exports = function (sequelize, Sequelize) {
    var OrderDetails = sequelize.define('OrderDetails', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        orderID: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
                model: 'Orders',
                key: 'id'
            }
        },
        productID: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
                model: 'Products',
                key: 'id'
            }
        },
        sellerID:{
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
                model: 'Users',
                key: 'id'
            }
        },
        quantity: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        price: {
            type: Sequelize.FLOAT(10, 2),
            allowNull: false,
        }
    });
    OrderDetails.sync({force: false,logging: console.log}).then(()=>{
        OrderDetails.upsert({
            //static test data
            id: 1,
            orderID: 1,
            productID: 1,
            sellerID:1,
            quantity:5,
            price:999.95,
        });
        OrderDetails.upsert({
            //static test data
            id: 2,
            orderID: 1,
            productID: 4,
            sellerID:1,
            quantity:2,
            price:486,
        });
    })
    return OrderDetails;
}

