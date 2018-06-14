var myDatabase = require('../controllers/database');
var sequelizeInstance = myDatabase.sequelize;
var Sequelize = myDatabase.Sequelize;

const ProductModel = sequelizeInstance.define('Products', {
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
        type: Sequelize.FLOAT(10,2)
    }
});

ProductModel.sync({force: true, loging: console.log}).then(()=> {
    console.log("Product table synced");
    ProductModel.upsert({
        id:0,
        productID: 1,
        productName: "Seagate 1TB 7200RPM (Blue)",
        productType: "Hard Disk",
        qty: 100,
        price: 199.99
    });
});

module.exports = sequelizeInstance.model("Products", ProductModel)