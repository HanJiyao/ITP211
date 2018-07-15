var express = require('express');
var cartRouter = express.Router();
var cartController = require("../controllers/cart");
cartRouter.get("/", isLoggedIn, cartController.show);
cartRouter.post("/add/:id", isLoggedIn, cartController.insert);
cartRouter.post("/edit/:id", isLoggedIn, cartController.edit);
cartRouter.delete("/:id", isLoggedIn, cartController.delete);
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
        return next();
    res.redirect('/login');
}
module.exports = cartRouter