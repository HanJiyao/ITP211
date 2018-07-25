// var express = require('express');
// var productRouter = express.Router();
// var productController = require("../controllers/product");
// // define the home page route
// // productRouter.get("/",productController.list);
// // productRouter.get("/edit/:id", productController.editRecord);
// // productRouter.post("/new", productController.insert);
// // productRouter.post("/edit/:id", productController.update);
// // productRouter.delete("/:id", productController.delete);
// // module.exports = productRouter
var express=require("express");
var reviewsRouter=express.Router();
var reviewsController=require("../controllers/reviews");
// app.get("/comments",comments.hasAuthorization, comments.list);
// app.post("/comments",comments.hasAuthorization, comments.create);
// app.delete("/comments/:comments_id", comments.hasAuthorization, comments.delete);
reviewsRouter.get("/",reviewsController.hasAuthorization,reviewsController.list);
reviewsRouter.get("/edit/:id", isLoggedIn,reviewsController.editRecord);
reviewsRouter.post("/edit/:id", isLoggedIn,reviewsController.update);
reviewsRouter.post("/",reviewsController.hasAuthorization,reviewsController.create);
reviewsRouter.delete("/:reviews_id",reviewsController.hasAuthorization,reviewsController.delete);
// productRouter.get("/edit/:id", isLoggedIn, productController.editRecord);
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
        return next();
    res.redirect('/login');
}
module.exports=reviewsRouter;
