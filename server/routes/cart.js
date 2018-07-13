var express = require('express');
var cartRouter = express.Router();
var cartController = require("../controllers/cart");
cartRouter.post("/add/:id", isLoggedIn, cartController.insert);
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
        return next();
    res.redirect('/login');
}
module.exports = cartRouter