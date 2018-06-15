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
        },
        productType: {
            type: Sequelize.STRING,
            trim: true,
        },
        qty: {
            type: Sequelize.INTEGER,
        },
        price: {
            type: Sequelize.FLOAT(10, 2)
        }
    });
    Products.sync({ force: true, logging: console.log }).then(() => {
        console.log("Products table synced");
        return Products.upsert({
            id: 0,
            productID: 1,
            productName: "Seagate 1TB 7200RPM (Blue)",
            productType: "Hard Disk",
            qty: 100,
            price: 199.99
        });
    });
    return Products;
}
