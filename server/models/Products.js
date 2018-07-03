module.exports = function (sequelize, Sequelize) {
    var Products = sequelize.define('Products', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        productID: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        productImage:{
            type: Sequelize.STRING,
        },
        productName: {
            type: Sequelize.STRING,
            allowNull: false,
            trim: true,
        },
        productType: {
            type: Sequelize.STRING,
            trim: true,
        },
        productDesc:{
            type: Sequelize.STRING,
            trim: true,
        },
        quantity: {
            type: Sequelize.INTEGER,
        },
        price: {
            type: Sequelize.FLOAT(10, 2)
        },
        userID: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
                model: 'Users',
                key: 'id'
            }
        }
    });
    Products.sync({ force: false, logging: console.log })
    .then(() => {
        Products.upsert({
            id: 1,
            productID: 0001,
            productName: "Test",
            productType: "Test",
            quantity: 1,
            price: 9.99,
            userID: 1,
        });Products.upsert({
            id: 2,
            productID: 002,
            productName: "Test2",
            productType: "Test2",
            quantity: 1,
            price: 9.99,
            userID: 1,
        }); Products.upsert({
            id: 3,
            productID: 003,
            productName: "Test3",
            productType: "Test3",
            quantity: 1,
            price: 9.99,
            userID: 1,
        }); Products.upsert({
            id: 4,
            productID: 004,
            productName: "Test4",
            productType: "Test4",
            quantity: 1,
            price: 9.99,
            userID: 1,
        }); 
        return console.log("Products table synced");
    });
    return Products;
}
