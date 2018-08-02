module.exports = function (sequelize, Sequelize) {
    var Transactions = sequelize.define('Transactions', {
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        },
        transactionDate: {
            type: Sequelize.DATE,
            defaultValue: Sequelize.NOW,
            allowNull: false,
        },
        paymentMadeTo: {
            type: Sequelize.INTEGER,
            allowNull: true,
            references: {
                model: 'Users',
                key: 'id'
            }
        },
        paymentReceivedFrom: {
            type: Sequelize.INTEGER,
            allowNull: true,
            references: {
                model: 'Users',
                key: 'id'
            }
        },
        description: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        debit: {
            defaultValue: 0,
            type: Sequelize.FLOAT(10, 2),
            allowNull: true,
        },
        credit: {
            defaultValue: 0,
            type: Sequelize.FLOAT(10, 2),
            allowNull: true,
        },
        balance: {
            defaultValue: 0,
            type: Sequelize.FLOAT(10, 2),
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
    });
    Transactions.sync({force: false, logging: console.log}).then(() => {
        console.log("Transactions table synced");
    });
    return Transactions;
}