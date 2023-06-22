const express = require('express');
const logger = require('morgan');
const responseGenerator = require('./src/helper/responseGenerator');
const router = require('./src/component');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/', router);

// Catch HTTP 404
// eslint-disable-next-line no-unused-vars
app.use((request, response, next) => {
  response.status(404).send(responseGenerator.getErrorResponse(new Error('NOT_FOUND')).body);
});

// other type of errors, it might also be a Runtime Error
// eslint-disable-next-line no-unused-vars
app.use((err, request, response, next) => {
  const errorResponse = responseGenerator.getErrorResponse(err);
  response.status(errorResponse.httpStatusCode).send(errorResponse.body);
});

module.exports = app;
