module.exports = function (sequelize, Sequelize) {
    var Users = sequelize.define('Users', {
        id: { autoIncrement: true, primaryKey: true, type: Sequelize.INTEGER },
        firstname: { type: Sequelize.STRING, notEmpty: true },
        lastname: { type: Sequelize.STRING, notEmpty: true },
        username: { type: Sequelize.TEXT },
        email: { type: Sequelize.STRING, validate: { isEmail: true } },
        password: { type: Sequelize.STRING, allowNull: false },
        last_login: { type: Sequelize.DATE },
    });
    Users.sync({ force: false, logging: console.log }).then(() => {
        console.log("Users table synced");
    });
    return Users;
}
