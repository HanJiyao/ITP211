var express = require('express');
var wishlistRouter = express.Router();
var wishlistController = require("../controllers/wishlist");
// define the home page route
wishlistRouter.get("/", isLoggedIn, wishlistController.list);
wishlistRouter.post("/:id", isLoggedIn, wishlistController.insert);
wishlistRouter.delete("/:id", isLoggedIn, wishlistController.delete);
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
        return next();
    res.redirect('/login');
}
module.exports = wishlistRouter