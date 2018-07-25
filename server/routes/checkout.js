var express = require('express');
var checkoutRouter = express.Router();
var checkoutController = require("../controllers/checkout");
checkoutRouter.get("/", isLoggedIn, checkoutController.show);
checkoutRouter.get("/success/:id", isLoggedIn, checkoutController.success);
checkoutRouter.post("/confirm", isLoggedIn, checkoutController.checkout);
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
        return next();
    res.redirect('/login');
}
module.exports = checkoutRouter