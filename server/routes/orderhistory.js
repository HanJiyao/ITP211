var express=require("express");
var orderhistoryRouter=express.Router();
var orderhistoryController=require("../controllers/orderhistory");
// reviewsRouter.get("/",reviewsController.hasAuthorization,reviewsController.list);
// reviewsRouter.post("/",reviewsController.hasAuthorization,reviewsController.create);
// reviewsRouter.delete("/:reviews_id",reviewsController.hasAuthorization,reviewsController.delete);
// module.exports=reviewsRouter;
orderhistoryRouter.get("/",orderhistoryController.hasAuthorization,orderhistoryController.list);
module.exports=orderhistoryRouter;