module.exports = function (sequelize, Sequelize) {
    var OrderDetails = sequelize.define('OrderDetails', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            references: {
                model: 'Orders',
                key: 'id'
            }
        },
        productID: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            allowNull: false,
            references: {
                model: 'Products',
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
        },
        discount: {
            type: Sequelize.FLOAT(10, 2),
        },
    });
    OrderDetails.sync({
        force: true,
        logging: console.log
    }).then(() => {
        OrderDetails.upsert({
            id: 1,
            productID: 1,
            quantity: 1,
            price: 199.99,
        });
        console.log("OrderDetails table synced");
    });
    return OrderDetails;
}