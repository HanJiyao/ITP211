module.exports = function (sequelize, Sequelize) {
    var Wallet = sequelize.define('Wallet', {
        balance: {
            type: Sequelize.INTEGER
        },
        //need any other attributes?
        userID: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
                model: 'Users',
                key: 'id'
            }
        },
    });
    Wallet.sync({force: true, logging: console.log}).then(() => {
        console.log("Wallet table synced");
        Wallet.upsert({
            //test data
            balance: 500.00,
            userID: 1
        })
    });
    return Wallet;
}