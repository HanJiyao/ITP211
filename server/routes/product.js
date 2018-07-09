var express = require('express');
var productRouter = express.Router();
var productController = require("../controllers/product");
// Import multer
var multer = require('multer');
var upload = multer({ dest: './public/uploads/', limits: { fileSize: 1500000, file: 1 } });
// define the home page route
productRouter.get("/", isLoggedIn, productController.list);
productRouter.get("/edit/:id", isLoggedIn, productController.editRecord);
productRouter.post("/new", isLoggedIn, upload.single('productImage'), productController.insert);
productRouter.post("/edit/:id", isLoggedIn, productController.update);
productRouter.delete("/:id", isLoggedIn, productController.delete);
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
        return next();
    res.redirect('/login');
}
module.exports = productRouter