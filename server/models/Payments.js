module.exports = function (sequelize, Sequelize) {
    var PaymentDetails = sequelize.define('PaymentDetails', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
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
        cardType: {
            type: Sequelize.STRING,
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
    PaymentDetails.sync({force: false, logging: console.log}).then(() => {
        console.log("Payment details table synced");
        PaymentDetails.upsert({
            //static test data
            id: 1,
            cardHolderName: "Tan Yong Rui",
            cardNumber: "0000111122223333",
            cardType: "Visa",
            securityCode: "555",
            expiryDate: "03/95",
            userID: 1
        });
        PaymentDetails.upsert({
            id: 2,
            cardHolderName: "Lim Yong Ming",
            cardNumber: "9999111122223333",
            cardType: "MasterCard",
            securityCode: "666",
            expiryDate: "03/15",
            userID: 1
        })
    });
    return PaymentDetails;
}