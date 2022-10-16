const jwt = require('jsonwebtoken');

const UnauthorisedError = require('../utils/errors/UnauthorizedError');

const auth = (req, res, next) => {
  const token = req.cookies.jwt;

  if (!token) {
    next(new UnauthorisedError('Authorisation error'));
  }

  let payload;

  try {
    payload = jwt.verify(token, 'super-secret-key');
  } catch (err) {
    next(new UnauthorisedError('Authorisation error'));
  }

  req.user = payload;

  next();
};

module.exports = auth;
