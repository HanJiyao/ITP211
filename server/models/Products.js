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
        });
        Products.upsert({
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
        }); 
        Products.upsert({
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
        }); 
        Products.upsert({
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
        Products.upsert({
            id: 5,
            productID: 1005, 
            productImage: "LD0004618347_2.jpg",
            productName: "Intel Processor I7-8850H", 
            productType: "Processor", 
            productDesc:"base frequency 2.60Ghz, Max turbo frequency 4.30 Ghz, 6 Core, Memory Slot: Up to 64GB, Processor Graphics: Intel UHD Graphics 630",
            quantity: 10, 
            price: 395.00, 
            discount_percentage: 0.2,
            userID: 1,
        }); 
        Products.upsert({
            id: 6,
            productID: 1006, 
            productImage: "wd-blue-1tb-wd10ezex_16970.jpg",
            productName: "Western Digital WD WD10EZEX Blue 3.5 Internal Hard Drive", 
            productType: "Storage", 
            productDesc:"1TB, SATA 6GB/s, 64MB cache, 7200 RPM, 3 Years Western Digital Singapore Waranty",
            quantity: 80, 
            price: 118.00, 
            discount_percentage: 0.37,
            userID: 1,
        }); 
        Products.upsert({
            id: 7,
            productID: 1007, 
            productImage: "ZT-P10610E-10M-07.jpg",
            productName: "ZOTAC NVIDIA Geforce GTX1060 Amp! Edition 6GB", 
            productType: "Graphic Card", 
            productDesc:"GPU, 6GB GDDR5, 1280",
            quantity: 80, 
            price: 429.00, 
            discount_percentage: 0.4,
            userID: 1,
        }); 
        Products.upsert({
            id: 8,
            productID: 1008, 
            productImage: "1003874670.g_400-w_g.JPG",
            productName: "Armaggeddon T1G Pro", 
            productType: "Computer Case", 
            productDesc:"Transparent Front and size panel, supports up to 2 solid state drives, 290MM length graphic card & USB 3.0,",
            quantity: 20, 
            price: 39.00, 
            discount_percentage: 0.3,
            userID: 1,
        });
        Products.upsert({
            id: 9,
            productID: 1009, 
            productImage: "w275R_G_01.JPG",
            productName: "Corsair Carbide Series 275R", 
            productType: "Computer Case",
            productDesc:"Full window side panel shows of your system",
            quantity: 80,   
            price: 129.00, 
            discount_percentage: 0.3,
            userID: 1,
        }); 
        Products.upsert({
            id: 10,
            productID: 1010, 
            productImage: "650W PSU ATX 12V Gaming PC Power Supply.JPG",
            productName: "650W PSU ATX 12V Gaming PC Power Supply", 
            productType: "Power Supply", 
            productDesc:"Fan Size: 12mm, Connector: 24 Pin",
            quantity: 150, 
            price: 78.50, 
            discount_percentage: 0.6,
            userID: 1,
        }); 
        Products.upsert({
            id: 11,
            productID: 1011, 
            productImage: "Justgogo 550W.JPG",
            productName: "Justgogo 550W Power Supply Unit",
            productType: "Power Supply", 
            productDesc:"Rated power 550 watts, maximum power 650 watts",
            quantity: 150, 
            price: 100.00, 
            discount_percentage: 0.5,
            userID: 1,
        });
        Products.upsert({
            id: 12,
            productID: 1012, 
            productImage: "94aa974c24ff2df7fc8cb966d5a9829a_L.JPG",
            productName: "Logitech G213 Prodigy Gaming Keyboard",
            productType: "Keyboard", 
            productDesc:"Gaming grade performance, Customize with logitech gaming software",
            quantity: 50, 
            price: 99.90, 
            discount_percentage: 0.5,
            userID: 1,
        });
        Products.upsert({
            id: 13,
            productID: 1013, 
            productImage: "Razer-Blackwidow-V2-2.JPG",
            productName: "Razer Blackwidow Chroma V2",
            productType: "Keyboard", 
            productDesc:"5 additional dedicated macro keys, 80 million keystroke life span",
            quantity: 200, 
            price: 289.00, 
            discount_percentage: 0.3,
            userID: 1,
        });
        Products.upsert({
            id: 14,
            productID: 1014, 
            productImage: "Razer-DeathAdder-Elite.JPG",
            productName: "Razer DeathAdder Elite",
            productType: "Mouse", 
            productDesc:"True 16,000 DPI optical sensor, Mechanical Mouse switches",
            quantity: 100, 
            price: 109.00, 
            discount_percentage: 0.6,
            userID: 1,
        });
        Products.upsert({
            id: 15,
            productID: 1015, 
                productImage: "Logitech-G502-Spectrum.JPG",
            productName: "Logitech G502 Proteus Spectrum ",
            productType: "Mouse", 
            productDesc:"Most accurate sensor, 3 DPI indicator LEDs",
            quantity: 60, 
            price: 129.00, 
            discount_percentage: 0.4,
            userID: 1,
         });
         Products.upsert({
            id: 16,
            productID: 1016, 
            productImage: "Dell-Se2717h.JPG",
            productName: "Dell SE2717H 27 IPS FreeSync",
            productType: "Monitor", 
            productDesc:"Elegantly designed with a smooth curved back in a classy black piano finish",
            quantity: 20, 
            price: 269.00, 
            discount_percentage: 0.6,
            userID: 1,
         });
         Products.upsert({
            id: 17,
            productID: 1017, 
            productImage: "Samsung-23inch-LED.JPG",
            productName: "Samsung 23.5 inch LED Monitor LS24F350FHEXXS",
            productType: "Monitor", 
            productDesc:"Super slim design, Perfectly smooth gameplay",
            quantity: 20, 
            price: 188.00, 
            discount_percentage: 0.4,
            userID: 1,
         });
         Products.upsert({
            id: 18,
            productID: 1018, 
            productImage: "CoolMaster-ML120L.JPG",
            productName: "CoolerMaster MasterFan MF120L",
            productType: "Cooling Fans", 
            productDesc:"2x 120mm Red Led Fan perfectly crafted 7-blade fan design for your system",
            quantity: 20, 
            price: 28.00, 
            discount_percentage: 0.3,
            userID: 1,
         });
         Products.upsert({
            id: 19,
            productID: 1019, 
            productImage: "Etmakit-120mm-LED-Ultra-Computer-Cooler.JPG",
            productName: "Etmakit 120mm LED Ultra Computer Cooler",
            productType: "Cooling Fan", 
            productDesc:"4pin+3pin ultra silent LED case fan, 15 LED lights",
            quantity: 150, 
            price: 8.78, 
            discount_percentage: 0.1,
            userID: 1,
         });
         Products.upsert({
            id: 20,
            productID: 1020, 
            productImage: "Razer-Kraken-Pro-V2.JPG",
            productName: "Razer Kraken PRO V2 Gaming Headset",
            productType: "Headset", 
            productDesc: "50 mm audio drivers custom tuned for balanced in-game audio and communications",
            quantity: 100, 
            price: 99.90, 
            discount_percentage: 0.3,
            userID: 1,
         });
         Products.upsert({
            id: 21,
            productID: 1021, 
            productImage: "Asus-Cerberus-Gaming-Headset.JPG",
            productName: "Asus Cerberus Gaming Headset",
            productType: "Headset", 
            productDesc:"Large 60mm neodymium-magnet drivers deliver unrivaled punch and ultimate immersion",
            quantity: 100, 
            price: 89.00, 
            discount_percentage: 0.5,
            userID: 1,
         });
         Products.upsert({
            id: 22,
            productID: 1022, 
            productImage: "Razer-Nommo-Full-range.JPG",
            productName: "Razer Nommo Full range 2.0 gaming speakers",
            productType: "Speaker", 
            productDesc: "Custom woven glass fiber 3-inch drivers for power and clarity",
            quantity: 100, 
            price: 143.90, 
            discount_percentage: 0.4,
            userID: 1,
         });
         Products.upsert({
            id: 23,
            productID: 1023, 
            productImage: "Logitech-Z213-Speaker-System.JPG",
            productName: "Logitech Multimedia 2.1 Speaker System Z213",
            productType: "Speaker", 
            productDesc:"Connect up to two compatible devices via the 3.5mm and RCA inputs, 1x headphone jack and 3.5 jack",
            quantity: 20, 
            price: 37.90, 
            discount_percentage: 0.5,
            userID: 1,
         });
        return console.log("Products table synced");
    });
    return Products;
}
