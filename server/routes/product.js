var express = require('express');
var productRouter = express.Router();
var productController = require("../controllers/product");
// define the home page route
productRouter.get("/",productController.list);
productRouter.get("/edit/:id", productController.editRecord);
productRouter.post("/new", productController.insert);
productRouter.post("/edit/:id", productController.update);
productRouter.delete("/:id", productController.delete);
module.exports = productRouter
