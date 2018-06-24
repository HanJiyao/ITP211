var express = require('express');
var productRouter = express.Router();
var productController = require("../controllers/product");
// define the home page route
productRouter.get("/", isLoggedIn, productController.list);
productRouter.get("/edit/:id", isLoggedIn, productController.editRecord);
productRouter.post("/new", isLoggedIn, productController.insert);
productRouter.post("/edit/:id", isLoggedIn, productController.update);
productRouter.delete("/:id", isLoggedIn, productController.delete);
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
        return next();
    res.redirect('/login');
}
module.exports = productRouter