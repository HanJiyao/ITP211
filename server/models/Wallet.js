module.exports = function (sequelize, Sequelize) {
    var Wallet = sequelize.define('Wallet', {
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        },
        balance: {
            defaultValue: 0,
            type: Sequelize.FLOAT(10, 2),
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
            id:1,
            balance: 499.50,
            userID: 1
        })
    });
    return Wallet;
}