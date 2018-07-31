var express = require('express');
var transactionsRouter = express.Router();
var transactionsController = require("../controllers/transactions");

transactionsRouter.post("/", isLoggedIn, transactionsController.insert);
transactionsRouter.get("/", isLoggedIn, transactionsController.list);
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
        return next();
    res.redirect('/login');
}
module.exports = transactionsRouter