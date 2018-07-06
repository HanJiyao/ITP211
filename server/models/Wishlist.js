module.exports = function (sequelize, Sequelize) {
    var Wishlist = sequelize.define("Wishlist", {
        order_id: {
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        },
        seller_name: {
            type: Sequelize.STRING
        },
        product_id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
                model: 'Products',
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