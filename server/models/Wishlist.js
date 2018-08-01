module.exports = function (sequelize, Sequelize) {
    var Wishlist = sequelize.define("Wishlist", {
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        },
        productID: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
                model: 'Products',
                key: 'id'
            }
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
    Wishlist.sync({
        force: false,
        logging: console.log
    }).then(() => {
        console.log("Wishlist table synced");
    });
    return Wishlist;
}