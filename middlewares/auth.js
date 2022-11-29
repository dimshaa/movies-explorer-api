const jwt = require('jsonwebtoken');

const UnauthorisedError = require('../utils/errors/UnauthorizedError');

const { JWT_SECRET_DEV } = require('../utils/configuration');

const { NODE_ENV, JWT_SECRET } = process.env;

const auth = (req, res, next) => {
  const token = req.cookies.jwt;

  if (!token) {
    next(new UnauthorisedError('Authorisation error'));
  }

  let payload;

  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : JWT_SECRET_DEV);
  } catch (err) {
    next(new UnauthorisedError('Authorisation error'));
  }

  req.user = payload;

  next();
};

module.exports = auth;
