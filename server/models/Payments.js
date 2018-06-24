module.exports = function (sequelize, Sequelize) {
    var PaymentDetails = sequelize.define('PaymentDetails', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        paymentDetailsID: {
            type: Sequelize.INTEGER,
            allowNull: true,
        },
        cardHolderName: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        cardNumber: {
            type: Sequelize.STRING,
            trim: true,
            allowNull: false,
        },
        securityCode: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        expiryDate: {
            type: Sequelize.STRING,
            allowNull: false,
            //date format is MM/YY
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
    PaymentDetails.sync({force: true, logging: console.log}).then(() => {
        console.log("Payment details table synced");
        return PaymentDetails.upsert({
            //static test data
            id: 1,
            paymentDetailsID: 1,
            cardHolderName: "Tan Yong Rui",
            cardNumber: "0000111122223333",
            securityCode: "555",
            expiryDate: "03/95",
            userID: 1
        });
    });
    return PaymentDetails;
}