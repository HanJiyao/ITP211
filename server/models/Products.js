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
        qty: {
            type: Sequelize.INTEGER,
        },
        price: {
            type: Sequelize.FLOAT(10, 2)
        },
        userID: {
            type: Sequelize.INTEGER,
        },
    });
    Products.sync({ force: true, logging: console.log })
    .then(() => {
        console.log("Products table synced");
        return Products.upsert({
            id: 0,
            productID: 1001,
            productName: "Seagate 1TB 7200RPM (Blue)",
            productType: "Hard Disk",
            qty: 100,
            price: 199.99,
            userID: 1,

            id: 1,
            productID: 1002,
            productName: "G.Skill RipJaws DDR3",
            productType: "RAM",
            qty: 100,
            price: 99.00,
            userID: 1,

            id: 2,
            productID: 1003,
            productName: "Palit Jetstream GeForce 2GB",
            productType: "Graphics Card",
            qty: 100,
            price: 150.00,
            userID: 1,

            id: 3,
            productID: 1003,
            productName: "MSI H270 Gaming M3",
            productType: "Motherboard",
            qty: 50,
            price: 100.00,
            userID: 1,

            id: 4,
            productID: 1004,
            productName: "Intel Processor I5-4900K",
            productType: "Processor",
            qty: 80,
            price: 120.00,
            userID: 1,
        });
    });
    return Products;
}
