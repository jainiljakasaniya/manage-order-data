const { dbConnPool } = require('../../../config/db.config');
const orderDAL = require('./order.dal');
const responseHelper = require('../../helper/responseGenerator');

module.exports = {

  getAllOrders: async (filters) => {
    const dbClient = await dbConnPool.connect();
    try {
      const orders = await orderDAL.getAllOrders(dbClient, filters);
      return responseHelper.orderResponseGenerator(orders);
    } finally {
      dbClient.release();
    }
  },

  createOrder: async (order) => {
    const dbClient = await dbConnPool.connect();
    try {
      await dbClient.query('BEGIN');
      const createdOrderID = await orderDAL.createOrder(dbClient, order);
      await orderDAL.createOrderItems(dbClient, createdOrderID.orderID, order);
      await dbClient.query('COMMIT');
    } catch (error) {
      await dbClient.query('ROLLBACK');
      throw error;
    } finally {
      dbClient.release();
    }
  },

  getOrderById: async (orderID) => {
    const dbClient = await dbConnPool.connect();
    try {
      const order = await orderDAL.getOrderById(dbClient, orderID);
      return responseHelper.orderResponseGenerator(order);
    } finally {
      dbClient.release();
    }
  },

  deleteOrder: async (orderID) => {
    const dbClient = await dbConnPool.connect();
    try {
      const order = await orderDAL.deleteOrder(dbClient, orderID);
      return order;
    } finally {
      dbClient.release();
    }
  },

};
