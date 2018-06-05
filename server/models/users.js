// models/users.js
var myDatabase = require('../controllers/database');
var sequelize = myDatabase.sequelize;
var Sequelize = myDatabase.Sequelize;

const Users = sequelize.define('Users', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING
    },
    email: {
        type: Sequelize.STRING
    },
    password: {
        type: Sequelize.STRING
    }
});

// force: true will drop the table if it already exists
Users.sync({force: false, logging:console.log}).then(()=>{
    console.log("users table synced");
    return Users.upsert({
        id: 1,
        name: 'Han',
        email: 'a@a.com',
        password: '1234'
    })
});

module.exports = sequelize.model('Users', Users);