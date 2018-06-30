var express = require('express');
var paymentRouter = express.Router();
var paymentController = require("../controllers/payment");

// define the home page route
paymentRouter.get("/createPaymentDetails", isLoggedIn, paymentController.create);
paymentRouter.post("/createPaymentDetails", isLoggedIn, paymentController.insert);
paymentRouter.get("/", isLoggedIn, paymentController.list);
paymentRouter.get("/editDetails/:id", isLoggedIn, paymentController.edit);
paymentRouter.post("/editDetails/:id", isLoggedIn, paymentController.update);
paymentRouter.delete("/:id", isLoggedIn, paymentController.delete);
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
        return next();
    res.redirect('/login');
}
module.exports = paymentRouter