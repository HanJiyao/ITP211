var myDatabase = require('../controllers/sqlDatabase');
var sequelizeInstance = myDatabase.sequelizeInstance;
var Sequelize = myDatabase.Sequelize;

const ProductModel = sequelizeInstance.define('View Products', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    productID: {
        type: Sequelize.INTEGER,
        trim: true
    },
    productName: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    type: {
        type: Sequelize.STRING,
        trim: true,
    },
    qty: {
        type: Sequelize.INTEGER
    },
    price: {
        type: Sequelize.INTEGER,
        trim: true,
    }
});

ProductModel.sync({force: false, loging: console.log}).then(()=> {
    console.log("Product table synced");
    ProductModel.upsert({
        id:1,
        productID: 001,
        productName: "Seagate 1TB 7200RPM (Blue)",
        type: "Hard Disk",
        qty: 100,
        price: 150
    });
});

module.exports = sequelizeInstance.model("Students", StudentModel)