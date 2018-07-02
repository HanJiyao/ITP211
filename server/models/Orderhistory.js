module.exports=function(sequelize,Sequelize){
    var Orderhistory=sequelize.define("Orderhistory",{
        order_id:{autoIncrement:true, primaryKey:true,type:Sequelize.INTEGER},
        seller_name:{type:Sequelize.STRING},
        product_id:{autoIncrement:true, type:Sequelize.INTEGER},
        product_name:{type:Sequelize.STRING},
        product_quantity:{type:Seqelize.INTEGER},
        product_price:{type:Sequelize.INTEGER},
        total_price:{type:Sequelize.INTEGER},


    });
    Orderhistory.sync({force:false,logging:console.log}).then(()=>{
        console.log("Order History table synced");
        
    });
    return Orderhistory;
}