const express = require('express');
const orderController = require('./order.controller');
const { validate } = require('../../lib/expressValidation');
const validation = require('./order.validation');

const router = express.Router();

router.route('/')
  .get(
    validate(validation.searchOrders),
    orderController.getAllOrders,
  )
  .post(
    validate(validation.createOrder),
    orderController.createOrder,
  );

router.route('/:orderID')
  .get(
    validate(validation.getOrderById),
    orderController.getOrderById,
  )
  .delete(
    validate(validation.deleteOrder),
    orderController.deleteOrder,
  );

module.exports = router;
