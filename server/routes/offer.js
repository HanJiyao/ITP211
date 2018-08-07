var express = require('express');
var offerRouter = express.Router();
var offerController = require("../controllers/offer");
offerRouter.get("/:id", isLoggedIn, offerController.show);
offerRouter.post("/add/:id", isLoggedIn, offerController.insert);
offerRouter.post("/edit/:id", isLoggedIn, offerController.edit);
offerRouter.post("/accept/:id", isLoggedIn, offerController.check);
offerRouter.delete("/:id", isLoggedIn, offerController.delete);
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
        return next();
    res.redirect('/login');
}
module.exports = offerRouter