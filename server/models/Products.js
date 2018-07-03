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
            productID: 1001, 
            productImage:"Null",
            productName: "Seagate 1TB 7200RPM (Blue)", 
            productType: "Hard Disk", 
            quantity: 100, 
            price: 199.99, 
        });Products.upsert({
            id: 2,
            productID: 1002, 
            productImage:"Null",
            productName: "G.Skill RipJaws DDR3", 
            productType: "RAM", 
            quantity: 100, 
            price: 99.90, 
        }); Products.upsert({
            id: 3,
            productID: 1003, 
            productImage:"Null",
            productName: "MSI H270 Gaming M3", 
            productType: "Motherboard", 
            quantity: 50, 
            price: 100.00, 
            userID: 1,
        }); Products.upsert({
            id: 4,
            productID: 1004, 
            productImage:"Null",
            productName: "Intel Processor I5-4900K", 
            productType: "Processor", 
            quantity: 80, 
            price: 120.00, 
            userID: 1,
        }); 
        return console.log("Products table synced");
    });
    return Products;
}
