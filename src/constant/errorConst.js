module.exports = {
  NOT_FOUND: {
    httpStatusCode: 404,
    body: {
      code: 'not_found',
      message: 'You lost somewhere. Please check url again.',
    },
  },
  DATA_NOT_FOUND: {
    httpStatusCode: 404,
    body: {
      code: 'not_found',
      message: 'data not found.',
    },
  },
  INTERNAL_SERVER_ERROR: {
    httpStatusCode: 500,
    body: {
      code: 'internal_server_error',
      message: 'An internal server error occurred.',
    }
  },
  FORBIDDEN: {
    httpStatusCode: 403,
    body: {
      code: 'forbidden_access',
      message: 'You not have permission to access.',
    }
  },
  UNAUTHORIZED: {
    httpStatusCode: 401,
    body: {
      code: 'unauthorized_access',
      message: 'Authentication Credentials Invalid.',
    }
  },
  BAD_REQUEST: {
    httpStatusCode: 400,
    body: {
      code: 'bad_request',
      message: 'Bad Request is Found.',
    }
  },
  CONFLICT: {
    httpStatusCode: 409,
    body: {
      code: 'Conflict',
      message: 'Request not completed because of a conflict.',
    }
  },
};
