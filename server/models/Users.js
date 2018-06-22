module.exports = function (sequelize, Sequelize) {
    var Users = sequelize.define('Users', {
        id: { autoIncrement: true, primaryKey: true, type: Sequelize.INTEGER },
        username: { type: Sequelize.TEXT },
        email: { type: Sequelize.STRING, validate: { isEmail: true } },
        password: { type: Sequelize.STRING, allowNull: false },
        mobile: { type: Sequelize.INTEGER },
        avatar: { type: Sequelize.TEXT },
        last_login: { type: Sequelize.DATE },
        first_name: { type: Sequelize.TEXT },
        last_name: { type: Sequelize.TEXT },
        gender: { type: Sequelize.TEXT },
        birthday: { type: Sequelize.TEXT },
        address:{ type: Sequelize.TEXT },
        postal_code: { type: Sequelize.INTEGER }
    });
    Users.sync({ force: false, logging: console.log }).then(() => {
        console.log("Users table synced");
    });
    return Users;
}
