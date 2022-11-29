const { INTERNAL_SERVER_ERROR } = require('../utils/constants');

module.exports.errorHandler = (err, req, res, next) => {
  res
    .status(err.statusCode || INTERNAL_SERVER_ERROR)
    .send({ message: err.message || 'Oops! Something went wrong...' });

  next();
};
