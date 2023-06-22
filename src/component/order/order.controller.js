const orderService = require('./order.service');

module.exports = {

  getAllOrders: async (req, res, next) => {
    try {
      const filters = req.query;
      const orders = await orderService.getAllOrders(filters);
      res.status(200).json(orders);
    } catch (error) {
      next(error);
    }
  },

  createOrder: async (req, res, next) => {
    try {
      const order = req.body;
      await orderService.createOrder(order);
      res.status(201).json();
    } catch (error) {
      next(error);
    }
  },

  getOrderById: async (req, res, next) => {
    try {
      const { orderID } = req.params;
      const order = await orderService.getOrderById(orderID);
      res.status(200).json(order);
    } catch (error) {
      next(error);
    }
  },

  deleteOrder: async (req, res, next) => {
    try {
      const { orderID } = req.params;
      await orderService.deleteOrder(orderID);
      res.status(204).json();
    } catch (error) {
      next(error);
    }
  },

};
