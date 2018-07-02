var express = require('express');
var productDetailRouter = express.Router();
var productDetailController = require('../controllers/productDetail')
// define the home page route
productDetailRouter.get("/:id", productDetailController.show)
module.exports = productDetailRouter