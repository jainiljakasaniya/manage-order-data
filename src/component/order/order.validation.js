const Joi = require('joi');

module.exports = {

  getOrderById: {
    params: Joi.object({
      orderID: Joi.number().required(),
    }),
  },

  deleteOrder: {
    params: Joi.object({
      orderID: Joi.number().required(),
    }),
  },

  searchOrders: {
    query: Joi.object({
      productName: Joi.string().optional(),
      priority: Joi.string().optional(),
    }),
  },

  createOrder: {
    body: Joi.object({
      customerID: Joi.number().required(),
      product: Joi.array()
        .items(
          Joi.object({
            productID: Joi.number().required(),
            quantity: Joi.number().required(),
          })
        ).required(),
      orderDate: Joi.string().isoDate().required(),
      priority: Joi.string().valid('low', 'medium', 'high').required(),
    }),
  },

};
