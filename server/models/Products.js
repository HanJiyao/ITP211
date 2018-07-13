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
            type: Sequelize.FLOAT(10, 2),
            allowNull: false,
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
            productImage: "seagate_stdr2000102_backup_plus_2tb_portable_1017872.jpg",
            productName: "Seagate 1TB 7200RPM (Blue)", 
            productType: "Hard Disk", 
            productDesc:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam vitae urna odio. Etiam vestibulum, mi ut dignissim elementum, risus enim porttitor nunc, sed consequat nunc eros sit amet quam.",
            quantity: 100, 
            price: 199.99, 
            userID: 1,
        });Products.upsert({
            id: 2,
            productID: 1002, 
            productImage: "61svh7xo0kl._sl1200__4.jpg",
            productName: "G.Skill RipJaws DDR3", 
            productType: "RAM", 
            productDesc:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam vitae urna odio. Etiam vestibulum, mi ut dignissim elementum, risus enim porttitor nunc, sed consequat nunc eros sit amet quam.",
            quantity: 100, 
            price: 99.90, 
            userID: 1,
        }); Products.upsert({
            id: 3,
            productID: 1003, 
            productImage: "msi-z270_gaming_pro_carbon-overview-hero.jpg",
            productName: "MSI H270 Gaming M3", 
            productType: "Motherboard", 
            productDesc:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam vitae urna odio. Etiam vestibulum, mi ut dignissim elementum, risus enim porttitor nunc, sed consequat nunc eros sit amet quam.",
            quantity: 50, 
            price: 100.00, 
            userID: 1,
        }); Products.upsert({
            id: 4,
            productID: 1004, 
            productImage: "LD0004618347_2.jpg",
            productName: "Intel Processor I5-4900K", 
            productType: "Processor", 
            productDesc:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam vitae urna odio. Etiam vestibulum, mi ut dignissim elementum, risus enim porttitor nunc, sed consequat nunc eros sit amet quam.",
            quantity: 80, 
            price: 120.00, 
            userID: 1,
        }); 
        return console.log("Products table synced");
    });
    return Products;
}
