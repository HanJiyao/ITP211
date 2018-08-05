var express = require('express');
var searchRouter = express.Router();
var searchController = require('../controllers/search');
searchRouter.get("/:category/:min/:max/:keyword/:sort/:order", searchController.default);
module.exports = searchRouter;