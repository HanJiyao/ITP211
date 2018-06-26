module.exports = function (sequelize, Sequelize) {
    var Products = sequelize.define('Products', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        productID: {
            type: Sequelize.INTEGER,
            allowNull: false,
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
        qty: {
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
    Products.sync({ force: true, logging: console.log })
    .then(() => {
        Products.upsert({
            id: 1,
            productID: 1001,
            productName: "Seagate 1TB 7200RPM (Blue)",
            productType: "Hard Disk",
            qty: 100,
            price: 199.99,
            userID: 1,
        });
        return console.log("Products table synced");
    });
    return Products;
}
