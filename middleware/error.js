const ErrorResponse = require('../utils/errorResponse');

// eslint-disable-next-line no-unused-vars
const errorHandler = (err, req, res, next) => {
  // ? spread the err to the newly created error variable
  let error = { ...err };

  error.message = err.message;

  // eslint-disable-next-line no-console
  console.log(err);

  if (err.code === 11000) {
    const message = 'Duplicate field value entered';
    error = new ErrorResponse(message, 400);
  }

  if (err.name === 'validationError') {
    const message = Object.values(err.errors).map((val) => val.message);
    error = new ErrorResponse(message, 400);
  }
  // ? responds with the correct status code and if none applies the error must be a server error
  res.status(error.statusCode || 500).json({
    success: false,
    error: error.message || 'Server Error',
  });
};

module.exports = errorHandler;
