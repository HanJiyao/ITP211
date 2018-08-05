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
            cardNumber: "4916114495606612",
            cardType: "Visa",
            securityCode: "555",
            expiryDate: "2020-03",
            userID: 1
        });
        PaymentDetails.upsert({
            id: 2,
            cardHolderName: "Dominic Tay Jia Wen",
            cardNumber: "5439199098484025",
            cardType: "MasterCard",
            securityCode: "666",
            expiryDate: "2021-03",
            userID: 1
        });
        PaymentDetails.upsert({
            id: 3,
            cardHolderName: "Fang Che Ee",
            cardNumber: "344897396624938",
            cardType: "American Express",
            securityCode: "222",
            expiryDate: "2021-11",
            userID: 1
        });
        PaymentDetails.upsert({
            id: 4,
            cardHolderName: "Lee Kai Ming",
            cardNumber: "6011367885651189",
            cardType: "Discover",
            securityCode: "333",
            expiryDate: "2025-01",
            userID: 1
        });
        PaymentDetails.upsert({
            id: 5,
            cardHolderName: "Han Jiyao",
            cardNumber: "3544155527763980",
            cardType: "JCB",
            securityCode: "777",
            expiryDate: "2019-08",
            userID: 1
        });
        PaymentDetails.upsert({
            id: 6,
            cardHolderName: "Muhammad Hisyam",
            cardNumber: "36425275671045",
            cardType: "Diners Club",
            securityCode: "999",
            expiryDate: "2023-05",
            userID: 1
        });
    });
    return PaymentDetails;
}