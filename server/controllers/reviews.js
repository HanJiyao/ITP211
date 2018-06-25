var gravatar = require('gravatar');
//get reviews model
var models=require("../models");
var Reviews=models.Reviews;
var sequelize=models.sequelize;
//list reviews
exports.list=function(req,res){
    var user = (req.session.passport) ? req.session.passport.user : false;
    //list all users and sort by date
    sequelize.query("select r.rating,r.id,r.title,r.content,u.email AS user_id from Reviews r join Users u on r.user_id=u.id",{model:Reviews })
    .then((reviews)=>{

    res.render("reviews",{
        title:"Reviews Page",
        reviews:reviews,
        gravatar:gravatar.url(reviews.user_id, {s:"80",r:"x",d:"retro"},true),
        urlPath:req.protocol+"://" + req.get("host")+req.url,
        user:user
        })
    }).catch((err)=>{
        return res.status(400).send({
            message:err




        });
    });
};
        //create reviews
    exports.create=function (req,res){
        console.log("creating reviews")

        var reviewsData={
            title:req.body.title,
            content:req.body.content,
            user_id:req.user.id ,
            rating:req.body.star,
            helpfulness:req.body.helpfulness,
            dateofreview:req.body.date,
        }
        Reviews.create(reviewsData).then((newReviews,created)=>{
            if (!newReviews){
                return res.send(400,{
                    message:"error"
                });
            }
            res.redirect("/reviews");
        })
    };
    

     //delete comments
     exports.delete=function(req,res){
        var record_num=req.params.reviews_id;
        console.log('deleting reviews' +record_num);
        Reviews.destroy({where:{id:record_num}}).then((deletedReview)=>{
            if (!deletedReview){
                return res.send(400, {
                    message: "error"
                });
            }
            res.status(200).send({message:"Deleted reviews :" + record_num });
        })
    }

        //comments authorization middleware
        exports.hasAuthorization=function (req,res,next){
            if (req.isAuthenticated())
                return next();
            res.redirect("/login");
        };

        exports.hasAuthorization=function(req,res,next){
            if (req.isAuthenticated())
                return next();
            res.redirect("/login");
        };
      

