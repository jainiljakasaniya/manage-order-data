const express = require('express');
const orderController = require('./order.controller');
const { validate } = require('../../lib/expressValidation');
const validation = require('./order.validation');

const router = express.Router();

/**
 * @swagger
 * /order:
 *   get:
 *     tags:
 *       - order
 *     summary: To return all order with filtration.
 *     parameters:
 *       - in: query
 *         required: false
 *         name: productName
 *         schema:
 *           type: string
 *           example: "Toy"
 *       - in: query
 *         required: false
 *         name: priority
 *         schema:
 *           type: string
 *           example: "low"
 *     responses:
 *       200:
 *         description: successful operation.
 *         schema:
 *           $ref: 'components/order/res.json#GetAllOrders'
 *       400:
 *         description: Bad Request - validation error
 *         schema:
 *           $ref: 'components/errorContracts.json#/ValidationErrorResponse'
 *       500:
 *         description: Internal Server Error
 *         schema:
 *           $ref: 'components/errorContracts.json#/ErrorResponse'
 *   post:
 *     tags:
 *       - order
 *     summary: To create new order.
 *     parameters:
 *       - in: body
 *         required: true
 *         name: order
 *         schema:
 *           $ref: 'components/order/req.json#CreateOrder'
*     responses:
 *       201:
 *         description: successful operation.
 *       400:
 *         description: Bad Request - validation error
 *         schema:
 *           $ref: 'components/errorContracts.json#/ValidationErrorResponse'
 *       500:
 *         description: Internal Server Error
 *         schema:
 *           $ref: 'components/errorContracts.json#/ErrorResponse'
 */
router.route('/')
  .get(
    validate(validation.searchOrders),
    orderController.getAllOrders,
  )
  .post(
    validate(validation.createOrder),
    orderController.createOrder,
  );

/**
 * @swagger
 * /order/:orderID:
 *   get:
 *     tags:
 *       - order
 *     summary: To return specific order with orderID.
 *     parameters:
 *       - in: path
 *         required: true
 *         name: orderID
 *         schema:
 *           type: integer
 *           example: 3
 *     responses:
 *       200:
 *         description: successful operation.
 *         schema:
 *           $ref: 'components/order/res.json#GetAllOrders'
 *       400:
 *         description: Bad Request - validation error
 *         schema:
 *           $ref: 'components/errorContracts.json#/ValidationErrorResponse'
 *       500:
 *         description: Internal Server Error
 *         schema:
 *           $ref: 'components/errorContracts.json#/ErrorResponse'
 *   delete:
 *     tags:
 *       - order
 *     summary: To delete specific order.
 *     parameters:
 *       - in: path
 *         required: true
 *         name: orderID
 *         schema:
 *           type: integer
 *           example: 3
*     responses:
 *       201:
 *         description: successful operation.
 *       400:
 *         description: Bad Request - validation error
 *         schema:
 *           $ref: 'components/errorContracts.json#/ValidationErrorResponse'
 *       500:
 *         description: Internal Server Error
 *         schema:
 *           $ref: 'components/errorContracts.json#/ErrorResponse'
 */
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
