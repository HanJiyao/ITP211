module.exports = function (sequelize, Sequelize) {
    var Cart = sequelize.define('Cart',{
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        }, 
        productID: {
            type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: 'Products',
                    key: 'id'
                }
        },
        quantity:{
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        created: {
            type: Sequelize.DATE,
            defaultValue: Sequelize.NOW
        },
        checked:{
            type: Sequelize.BOOLEAN,
            defaultValue: false
        },
        userID: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
                model: 'Users',
                key: 'id'
            }
        },
    });
    Cart.sync({force: true,logging: console.log}).then(() => {
        console.log("Payment details table synced");
        Cart.upsert({
            //static test data
            id: 1,
            productID: 1,
            quantity: 1,
            userID: 1,
        });
    });
    return Cart;
}