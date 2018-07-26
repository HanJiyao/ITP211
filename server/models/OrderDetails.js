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
        created: {
            type: Sequelize.DATE,
            defaultValue: Sequelize.NOW
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
        force: false,
        logging: console.log
    })
    return OrderDetails;
}