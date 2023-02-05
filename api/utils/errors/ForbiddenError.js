const { FORBIDDEN_ERROR } = require('../constants');

module.exports = class ForbiddenError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = FORBIDDEN_ERROR;
  }
};
