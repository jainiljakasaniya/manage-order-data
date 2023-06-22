const dalHelper = require('../../helper/dalHelper');

const generateOrderItemsParameters = (createdOrderID, order) => {
  const orderItemsParameters = [];
  const parameterValues = [];
  let count = 1;
  order.product.forEach(item => {
    const parameterizedString = `
     (
      $${count},
      $${count + 1},
      $${count + 2}
     )`;
    orderItemsParameters.push(parameterizedString);
    parameterValues.push(createdOrderID);
    parameterValues.push(item.productID);
    parameterValues.push(item.quantity);
    count += 3;
  });
  const strParameterNames = orderItemsParameters.join();
  return { strParameterNames, parameterValues };
};

module.exports = {

  getAllOrders: async (dbClient, filters) => {
    const columns = Object.keys(filters);
    const parameters = [...Object.values(filters)];
    const query = `
    SELECT
      o."orderID",
      o."customerID",
      o."orderDate",
      o."priority",
      c."name" ,
      c."email",
      ca.street ,
      ca.city ,
      ca.state ,
      ca."postalCode" ,
      oi."productID" ,
      oi.quantity ,
      p."productName"
    FROM
      "order" o
    JOIN customer c ON
      o."customerID" = c."customerID"
    JOIN "customerAddresses" ca ON
      ca."customerId" = c."customerID"
    JOIN "orderItems" oi ON
      oi."orderID" = o."orderID"
    JOIN product p ON
      p."productID" = oi."productID"
    ${dalHelper.whereQuery(columns)}
    `;
    const orders = await dbClient.query(query, parameters);
    return orders.rows;
  },

  createOrder: async (dbClient, order) => {
    const sqlQuery = `    
      INSERT
      INTO
        "order" ("customerID", "orderDate", "priority")
      VALUES ($1,$2,$3)
      RETURNING "orderID"
      `;
    const {
      customerID, orderDate, priority
    } = order;
    const parameters = [customerID, orderDate, priority];
    const queryResult = await dbClient.query(sqlQuery, parameters);
    return queryResult.rows[0];
  },

  createOrderItems: async (dbClient, createdOrderID, order) => {
    const {
      strParameterNames,
      parameterValues
    } = generateOrderItemsParameters(createdOrderID, order);
    const sqlQuery = `    
    INSERT
      INTO
        "orderItems" ("orderID", "productID", "quantity")
      VALUES ${strParameterNames}
      `;
    const queryResult = await dbClient.query(sqlQuery, parameterValues);
    return queryResult.rows;
  },

  getOrderById: async (dbClient, orderId) => {
    const query = `
    SELECT
      o."orderID",
      o."customerID",
      o."orderDate",
      o."priority",
      c."name" ,
      c."email",
      ca.street ,
      ca.city ,
      ca.state ,
      ca."postalCode" ,
      oi."productID" ,
      oi.quantity ,
      p."productName"
    FROM
      "order" o
    JOIN customer c ON
      o."customerID" = c."customerID"
    JOIN "customerAddresses" ca ON
      ca."customerId" = c."customerID"
    JOIN "orderItems" oi ON
      oi."orderID" = o."orderID"
    JOIN product p ON
      p."productID" = oi."productID"
    WHERE o."orderID" = $1; 
    `;
    const parameters = [orderId];
    const order = await dbClient.query(query, parameters);
    if (!order.rowCount) {
      throw new Error('DATA_NOT_FOUND');
    }
    return order.rows;
  },

  deleteOrder: async (dbClient, orderID) => {
    const query = `
      DELETE
      FROM
        "order"
      WHERE
        "orderID" = $1
    `;
    const parameters = [orderID];
    const queryResult = await dbClient.query(query, parameters);
    if (!queryResult.rowCount) {
      throw new Error('DATA_NOT_FOUND');
    }
    return queryResult.rows;
  },

};
