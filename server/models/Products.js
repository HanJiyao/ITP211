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
        },
        created:{
            type: Sequelize.DATE,
            defaultValue: Sequelize.NOW
        }
    });
    Products.sync({ force: false, logging: console.log })
    .then(() => {
        Products.upsert({
            id: 1,
            productImage: "Seagate Barracuda 2TB 3.5 inch internal hard disk.jpg",
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
            productImage: "G.Skill RipJaws DDR3.jpg",
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
            productImage: "i7-8700k.jpg",
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
            productImage: "1003874670.g_400-w_g.jpg",
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
            productImage: "hero_cases.png",
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
            productImage: "650W PSU ATX 12V Gaming PC Power Supply.jpg",
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
            productImage: "Justgogo 550W.jpg",
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
            productImage: "94aa974c24ff2df7fc8cb966d5a9829a_L.jpg",
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
            productImage: "Razer-Blackwidow-V2-2.jpg",
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
            productImage: "Logitech-G502-Spectrum.jpg",
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
            productImage: "Dell-Se2717h.jpg",
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
            productImage: "Samsung-23inch-LED.jpg",
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
            productImage: "Etmakit-120mm-LED-Ultra-Computer-Cooler.jpg",
            productName: "Etmakit 120mm LED Ultra Computer Cooler",
            productType: "Cooling Fans", 
            productDesc:"4pin+3pin ultra silent LED case fan, 15 LED lights",
            quantity: 150, 
            price: 8.78, 
            discount_percentage: 0.1,
            userID: 1,
         });
         Products.upsert({
            id: 20,
            productImage: "RZ04-02050200-R3M1-4.png",
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
            productImage: "Asus-Cerberus-Gaming-Headset.jpg",
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
            productImage: "razer-nommo-pro-speakers-render.jpg",
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
            productImage: "z213-compact-speaker-system.png",
            productName: "Logitech Multimedia 2.1 Speaker System Z213",
            productType: "Speaker", 
            productDesc:"Connect up to two compatible devices via the 3.5mm and RCA inputs, 1x headphone jack and 3.5 jack",
            quantity: 20, 
            price: 37.90, 
            discount_percentage: 0.5,
            userID: 1,
         });
         Products.upsert({
             id: 24,
             productImage: "29-102-101-V01.jpg",
             productName: "Creative Sound BlasterX AE-5 Discrete 5.1 Surround Sound Virtual 7.1 Surround Sound Channels 32-bit 384 KHz Sound Card",
             productType: "Sound Card",
             productDesc: "Industry Leading Audio Processing Updated, refined and perfected through years of being the clear leader in the sound processing field, the AE - 5 is featured packed with the latest and greatest version",
             quantity: 25,
             price: 222.50,
             discount_percentage: 0.2,
             userID: 1,
         });
         Products.upsert({
             id: 25,
             productImage: "ff7109babe78b3d8992295d9defcd034-1200-80.jpg",
             productName: "Asus Xonar DG",
             productType: "Sound Card",
             productDesc: "PCI v2.2, 5.1 Channels Dolby Headphone for an immersive 5.1 surround imaging GX2 .5 for realistic 3 D audio effects 3 gain modes for different usage scenarios ",
             quantity: 60,
             price: 52.60,
             discount_percentage: 0.25,
             userID: 1,
         });
         Products.upsert({
             id: 26,
             productImage: "product_2_20180716112044_5b4c0f0cd4181.png",
             productName: "MSI B450I GAMING PLUS AC AM4 AMD B450 SATA 6Gb/s USB 3.1 HDMI Mini ITX AMD Motherboard",
             productType: "Motherboard",
             productDesc: "AMD B450 Supports AMD RYZEN 1 st and 2 nd Generation / Ryzen with Radeon Vega Graphics Processors for Socket AM4 DDR4 3466 + (OC)",
             quantity: 90,
             price: 163.99,
             discount_percentage: 0.1,
             userID: 1,
         });
         Products.upsert({
             id: 27,
             productImage: "20-236-261-V06.jpg",
             productName: "CORSAIR Vengeance RGB DRAM 16GB (2 x 8GB) 288-Pin DDR4 3600 (PC4 28800) ",
             productType: "Memory",
             productDesc: "DDR4 3600 (PC4 28800) Timing 18 - 19 - 19 - 39 CAS Latency 18 Voltage 1.35 V ",
             quantity: 30,
             price: 295.99,
             discount_percentage: 0.16,
             userID: 1,
         });
         Products.upsert({
             id: 28,
             productImage: "11G-P4-6696-KR_XL_4.jpg",
             productName: "EVGA GeForce GTX 1080 Ti FTW3 GAMING, 11G-P4-6696-KR, 11GB GDDR5X",
             productType: "Graphic Card",
             productDesc: "Real Base Clock: 1569 MHz / Real Boost Clock: 1683 MHz; Memory Detail: 11264MB GDDR5X 1 x Dual Link DVI - D, 1 x HDMI 2.0 b, 3 x DisplayPort 1.4 EVGA iCX Technology - Asynchronous Fan Control 9 additional temp sensors to monitor memory and PWN GPU / Memory / PWM Thermal Status Indicator LEDs ",
             quantity: 200,
             price: 1135.90,
             discount_percentage: 0.3,
             userID: 1,
         });
         Products.upsert({
             id: 29,
             productImage: "aobelieve-1x4-powered-hdmi-splitter-v1-4-1-input-4-output-support-full-ultra-hd-4k-2k-1080p-and-3d-r__41AeeFh_COL.jpg",
             productName: "4K HDMI Splitter 1 Input 4 Outputs Support 4K 1080P 3D Video.",
             productType: "Accessory",
             productDesc: "This HDMI splitter is a product which can distribute 1 way HDMI signal to 4 display terminal devices without any quality loss. It supports most of the home theater such as HDTV, Xbox and PS4 etc..",
             quantity: 28,
             price: 51.72,
             discount_percentage: 0.3,
             userID: 1,
         });
         Products.upsert({
             id: 30,
             productImage: "12-196-608-03.jpg",
             productName: "C2G 05575 2m ST/ST Duplex 62.5/125 Multimode Fiber Patch Cable",
             productType: "Accessory",
             productDesc: "Cables To Go offers a high-quality fiber optic patch cable designed with ST to ST termination, and is perfect for ethernet, multimedia, or communication applications. The ST connector features a bayonet locking system.",
             quantity: 80,
             price: 35.99,
             discount_percentage: 0.33,
             userID: 1,
         });
         Products.upsert({
             id: 31,
             productImage: "51oWLj2zbHL._SL1000_.jpg",
             productName: "OnHub AC1900 Wi-Fi Router",
             productType: "Networking",
             productDesc: "Speed up to 1900 Mbps 1.4 GHz dual - core processor 13 high - performance Wi - Fi antennas USB 3.0 and Gigabit ports Bluetooth Smart Ready Built - in speaker ",
             quantity: 80,
             price: 260.99,
             discount_percentage: 0.6,
             userID: 1,
         });
         Products.upsert({
             id: 32,
             productImage: "A4M5_1_20180803837925482.jpg",
             productName: "C2G 28709 100 ft. Cat 5E Yellow Shielded Molded Patch Cable",
             productType: "Networking",
             productDesc: "Today's mission critical advanced Fast Ethernet and Gigabit computer networks require the stability and reliability of Enhanced Category 5 high-speed cabling to distribute data, voice and video.",
             quantity: 1000,
             price: 39.99,
             discount_percentage: 0.8,
             userID: 1,
         });
        return console.log("Products table synced");
    });
    return Products;
}
