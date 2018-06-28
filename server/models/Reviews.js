//models/Reviews.js
module.exports=function(sequelize,Sequelize){

    var Reviews=sequelize.define("Reviews",{
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        created: {
            type: Sequelize.DATE,
            defaultValue: Sequelize.NOW
        },
        title: {
            type: Sequelize.STRING,
            allowNull: false,
            defaultValue: '',
            trim: true
        },
        content: {
            type: Sequelize.STRING,
            defaultValue: '',
            trim: true
        },
        user_id:{
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
                model: 'Users',
                key: 'id'
            }
        },
        rating:{
            type:Sequelize.INTEGER,
            allowNull:true,
            defaultValue:0,
        },
        

    });

    // force: true will drop the table if it already exists
    Reviews.sync({ force: false, logging: console.log}).then(() => {
        // Table created
        console.log("reviews table synced");
    });
    return Reviews;
}