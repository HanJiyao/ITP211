module.exports = function (sequelize, Sequelize) {
    var paymentDetails = sequelize.define('Payment Details', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        paymentDetailsID: {
            type: Sequelize.INTEGER,
            allowNull: false,
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
            //from when the user signed up with us (FK)?
        },
    });
    paymentDetails.sync({force: true, logging: console.log}).then(() => {
        console.log("Payment details synced");
        return paymentDetails.upsert({
            //static test data
            id: 0,
            paymentDetailsID: 1,
            cardHolderName: "Tan Yong Rui",
            cardNumber: "0000111122223333",
            securityCode: "555",
            expiryDate: "03/95",
            userID: 5
        });
    });
    return paymentDetails;
}