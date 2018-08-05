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
            content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam vitae urna odio. Etiam vestibulum, mi ut dignissim elementum, risus enim porttitor nunc, sed consequat nunc eros sit amet quam.',
            user_id: 1,
            rating: 3,
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
            rating: 5,
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
            title: 'Great cpu',
            content: 'work perfectly',
            user_id: 1,
            rating: 5,
        });
        Reviews.upsert({
            id: 6,
            productID: 4,
            title: 'just normal',
            content: 'seems second hand ram',
            user_id: 1,
            rating: 1,
        })
        Reviews.upsert({
            id: 7,
            productID: 4,
            title: 'Great chip',
            content: 'This i5 is just so good!!!!',
            user_id: 1,
            rating: 4,
        });
        Reviews.upsert({
            id: 8,
            productID: 2,
            title: 'Great Product',
            content: 'work perfectly',
            user_id: 1,
            rating: 5,
        });
    });
    return Reviews;
}
