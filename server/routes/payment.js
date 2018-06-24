var express = require('express');
var paymentRouter = express.Router();
var paymentController = require("../controllers/payment");

// define the home page route
paymentRouter.get("/",paymentController.list);
paymentRouter.post("/new", paymentController.insert);
module.exports = paymentRouter