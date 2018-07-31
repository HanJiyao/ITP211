module.exports=function(sequelize,Sequelize){
    var Reviews=sequelize.define("Reviews",{
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        productID: {            
            type: Sequelize.STRING,
            allowNull: false,
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
        helpfulness:{
            type:Sequelize.INTEGER,
            defaultValue:0,
        }
    });
    // force: true will drop the table if it already exists
    Reviews.sync({ force: false, logging: console.log}).then(() => {
        // Table created
        console.log("reviews table synced");
        Reviews.upsert({
            id: 1,
            productID: 1,
            title: 'Great hard disk',
            content: 'good quality',
            user_id: 1,
            rating: 5,
        });
        Reviews.upsert({
            id: 2,
            productID: 1,
            title: 'good hard disk',
            content: 'good delivery',
            user_id: 1,
            rating: 5,
        });
        Reviews.upsert({
            id: 3,
            productID: 1,
            title: 'work fine',
            content: 'good quality',
            user_id: 1,
            rating: 4,
        });
        Reviews.upsert({
            id: 4,
            productID: 1,
            title: 'hard disk damaged',
            content: 'poor product',
            user_id: 1,
            rating: 1,
        });
        Reviews.upsert({
            id: 5,
            productID: 4,
            title: 'Great ram',
            content: 'work perfectly',
            user_id: 1,
            rating: 4,
        });
        Reviews.upsert({
            id: 6,
            productID: 4,
            title: 'just normal',
            content: 'seems second hand ram',
            user_id: 1,
            rating: 2,
        })
    });
    return Reviews;
}