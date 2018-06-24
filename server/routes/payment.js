var express = require('express');
var paymentRouter = express.Router();
var paymentController = require("../controllers/payment");

// define the home page route
paymentRouter.post("/", isLoggedIn, paymentController.insert);
paymentRouter.get("/", isLoggedIn, paymentController.list);
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
        return next();
    res.redirect('/login');
}
module.exports = paymentRouter