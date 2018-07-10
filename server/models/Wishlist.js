module.exports = function (sequelize, Sequelize) {
    var Wishlist = sequelize.define("Wishlist", {
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        },
        seller_name: {
            type: Sequelize.STRING,
            allowNull: false,
            trim: true,
        },
        product_id: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        userID: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
                model: 'Users',
                key: 'id'
            }
        },
        product_name: {
            type: Sequelize.STRING
        },
        product_quantity: {
            type: Sequelize.INTEGER
        },
        product_price: {
            type: Sequelize.INTEGER
        },
        total_price: {
            type: Sequelize.INTEGER
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