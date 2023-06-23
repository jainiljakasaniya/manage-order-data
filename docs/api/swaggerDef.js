module.exports = {
  info: {
    title: 'manage-order-data',
    version: '0.0.1',
    description: 'Building a Dockerized Node.js API for Managing Orders Data in PostgreSQL',
  },
  host: 'localhost:8000',
  basePath: '/',
  apis: ['./src/component/**/*.route.js'],
  schemes: ['http'],
  consumes: ['application/json'],
  produces: ['application/json'],
};
