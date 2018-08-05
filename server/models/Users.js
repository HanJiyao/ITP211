module.exports = function (sequelize, Sequelize) {
    var Users = sequelize.define('Users', {
        id: { 
            autoIncrement: true, 
            primaryKey: true, 
            type: Sequelize.INTEGER 
        },
        username: { 
            type: Sequelize.STRING 
        },
        email: { 
            type: Sequelize.STRING, 
            validate: { isEmail: true } 
        },
        password: { 
            type: Sequelize.STRING, 
            allowNull: false 
        },
        mobile: { 
            type: Sequelize.INTEGER,
        },
        avatar: { type: Sequelize.STRING },
        last_login: { type: Sequelize.DATE },
        first_name: { 
            type: Sequelize.STRING,
            defaultValue: 'Anonymous',
        },
        last_name: { 
            type: Sequelize.STRING ,
            defaultValue: 'User',
        },
        gender: { type: Sequelize.STRING },
        birthday: { 
            type: Sequelize.DATE,
            defaultValue: '2018-01-01',
        },
        address: { type: Sequelize.STRING },
        postal_code: { type: Sequelize.STRING }
    });
    Users.sync({ force: false, logging: console.log }).then(() => {
        console.log("Users table synced");
        Users.upsert({
            //static test data
            id: 1,
            username:"Default Test User",
            password:"",
            email:"i@default.user",
            first_name:"Test",
            last_name:"User"
        });
    });
    return Users;
}
