module.exports = function (sequelize, Sequelize) {
    var Offer = sequelize.define('Offer', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        productID: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
                model: 'Products',
                key: 'id'
            }
        },
        offerPrice:{
            type: Sequelize.FLOAT(10, 2),
            allowNull: false,
        },
        created: {
            type: Sequelize.DATE,
            defaultValue: Sequelize.NOW
        },
        updated:{
            type: Sequelize.DATE,
        },
        accepted: {
            type: Sequelize.BOOLEAN,
        },
        userID: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
                model: 'Users',
                key: 'id'
            }
        },
    });
    Offer.sync({
        force: false,
        logging: console.log
    }).then(() => {
        console.log("Cart table synced");
    });
    return Offer;
}