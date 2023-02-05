const { BAD_REQUEST_ERROR } = require('../constants');

module.exports = class BadRequestError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = BAD_REQUEST_ERROR;
  }
};
