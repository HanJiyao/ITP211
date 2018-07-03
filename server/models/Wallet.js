module.exports = function (sequelize, Sequelize) {
    var Wallet = sequelize.define('Wallet', {
        balance: {
            type: Sequelize.INTEGER
        },
    })
    return Wallet;
}