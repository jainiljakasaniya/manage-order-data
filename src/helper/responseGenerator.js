const { ValidationError } = require('../lib/expressValidation');
const errorCodes = require('../constant/errorConst');
const { PostgresDbErrorCode } = require('../constant');

const generateErrorResponse = (error) => errorCodes[error.message]
    || errorCodes.INTERNAL_SERVER_ERROR;

const validationErrorResponse = (error) => {
  const errors = [];
  Object.keys(error.details).forEach((key) => {
    error.details[key].forEach((e) => {
      errors.push({
        location: key,
        messages: e.message,
        field: e.path[0],
      });
    });
  });
  return {
    httpStatusCode: error.statusCode,
    body: {
      code: error.name,
      message: 'Request parameters are not valid',
      errors,
    },
  };
};

const getErrorResponse = (error) => {
  if (error instanceof ValidationError) {
    return validationErrorResponse(error);
  }
  if (error.code === PostgresDbErrorCode.FOREIGN_KEY_VIOLATION
      || error.code === PostgresDbErrorCode.UNIQUE_VIOLATION) {
    console.info(error);
    // eslint-disable-next-line no-param-reassign
    error = new Error('CONFLICT');
  }
  console.error(error);
  return generateErrorResponse(error);
};

const orderResponseGenerator = (orders) => {
  const outputArray = [];

  orders.forEach(item => {
    const existingOrder = outputArray.find(order => order.orderID === item.orderID);

    if (existingOrder) {
      existingOrder.product.push({
        productName: item.productName,
        quantity: item.quantity
      });
    } else {
      const newOrder = {
        orderID: item.orderID,
        customer: {
          name: item.name,
          email: item.email,
          address: {
            street: item.street,
            city: item.city,
            state: item.state,
            postalCode: item.postalCode
          }
        },
        product: [
          {
            productName: item.productName,
            quantity: item.quantity
          }
        ],
        orderDate: item.orderDate,
        priority: item.priority
      };
      outputArray.push(newOrder);
    }
  });
  return outputArray;
};

module.exports = {
  getErrorResponse,
  orderResponseGenerator
};
