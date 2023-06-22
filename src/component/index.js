const express = require('express');

const orderRoute = require('./order/order.route');

const router = express.Router();

router.use('/order', orderRoute);

module.exports = router;
