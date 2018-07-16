var express = require('express');
var checkoutRouter = express.Router();
var checkoutController = require("../controllers/checkout");
checkoutRouter.get("/", isLoggedIn, checkoutController.show);
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
        return next();
    res.redirect('/login');
}
module.exports = checkoutRouter