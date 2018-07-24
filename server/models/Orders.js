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
        userID: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
                model: 'Users',
                key: 'id'
            }
        },
        totalPrice:{
            type: Sequelize.INTEGER,
            allowNull: false,
        }
    });
    Orders.sync({
        force: false,
        logging: console.log
    }).then(()=>{
        Orders.upsert({
            //static test data
            id: 1,
            userID: 1,
            totalPrice: 0,
        });
    })
    return Orders;
}