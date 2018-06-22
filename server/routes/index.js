var express = require('express');
var indexRouter = express.Router();
var indexController = require('../controllers/index')
// define the home page route
indexRouter.get("/", indexController.show)
module.exports = indexRouter
