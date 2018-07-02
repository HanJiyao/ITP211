var express = require('express');
var wishlistRouter = express.Router();
var wishlistController = require('../controllers/wishlist')
// define the home page route
wishlistRouter.get("/", wishlistController.show)
module.exports = wishlistRouter
