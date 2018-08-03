module.exports = function (sequelize, Sequelize) {
    var Products = sequelize.define('Products', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
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
        discount_percentage:{
            type: Sequelize.FLOAT(3,2)
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
            productImage: "seagate_stdr2000102_backup_plus_2tb_portable_1017872.jpg",
            productName: "Seagate Barracuda ST1000DM003 2TB", 
            productType: "Storage", 
            productDesc:"Seagate Barracuda ST1000DM003 2TB 7200 RPM 64MB Cache SATA 6.0Gb/s.",
            quantity: 100, 
            price: 199.99, 
            discount_percentage: 0.5,
            userID: 1,
        });Products.upsert({
            id: 2,
            productID: 1002, 
            productImage: "61svh7xo0kl._sl1200__4.jpg",
            productName: "G.Skill RipJaws DDR3", 
            productType: "Memory", 
            productDesc:"240 pin DDR3 1600 (PC3 12800), Desktop Memory Model F3-12800CL9D-8GBXL",
            quantity: 100, 
            price: 99.90, 
            discount_percentage: 0.3,
            userID: 1,
        }); Products.upsert({
            id: 3,
            productID: 1003, 
            productImage: "msi-z270_gaming_pro_carbon-overview-hero.png",
            productName: "MSI H270 Gaming M3", 
            productType: "Motherboard", 
            productDesc:"Supports 7th / 6th Gen Intel® Core™ / Pentium® / Celeron® processors for LGA 1151 socket, MULTI-GPU: With Steel Armor PCI-E slot. Supports AMD Crossfire™ Twin Turbo M.2 with Steel Armor. Intel Optane Memory Ready, Lightning USB 3.1 Gen2",
            quantity: 50, 
            price: 100.00,
            discount_percentage: 0.7, 
            userID: 1,
        }); Products.upsert({
            id: 4,
            productID: 1004, 
            productImage: "LD0004618347_2.jpg",
            productName: "Intel Processor I5-4960K", 
            productType: "Processor", 
            productDesc:"base frequency 3.5Ghz, Max turbo frequency 3.90 GHZ, Quad Core, Memory Slot: Up to 32GB, Processor Graphics: Intel HD 4600",
            quantity: 80, 
            price: 243.00, 
            discount_percentage: 0.5,
            userID: 1,
        }); 
        return console.log("Products table synced");
    });
    return Products;
}
