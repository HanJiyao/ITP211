var express = require('express');
var walletRouter = express.Router();
var walletController = require("../controllers/wallet");

// define the home page route
walletRouter.get("/", isLoggedIn, walletController.view);
walletRouter.post("/", isLoggedIn, walletController.insert);
walletRouter.get("/", isLoggedIn, walletController.list);
walletRouter.post("/topup", isLoggedIn, walletController.update);
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
        return next();
    res.redirect('/login');
}
module.exports = walletRouter