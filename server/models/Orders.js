module.exports = function (sequelize, Sequelize) {
    var Orders = sequelize.define('Orders', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        orderDate: {
            type: Sequelize.DATE,
            defaultValue: Sequelize.NOW
        },
        sellerID:{
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
                model: 'Users',
                key: 'id'
            }
        },
        customerID: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
                model: 'Users',
                key: 'id'
            }
        },
    });
    Orders.sync({
        force: false,
        logging: console.log
    }).then(() => {
        Orders.upsert({
            id: 1,
            orderDate:"2018-07-16",
            sellerID: 1,
            customerID: 1,
        });
        console.log("Orders table synced");
    });
    return Orders;
}