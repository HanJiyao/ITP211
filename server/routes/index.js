var express = require('express');
var indexRouter = express.Router();
var indexController = require('../controllers/index')
// middleware that is specific to this router
indexRouter.use(function timeLog(req, res, next) {
    next()
})
// define the home page route
indexRouter.get("/", indexController.show)
module.exports = indexRouter
