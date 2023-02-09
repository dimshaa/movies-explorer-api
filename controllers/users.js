const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/user');
const { JWT_SECRET_DEV } = require('../utils/configuration');

const { NODE_ENV, JWT_SECRET } = process.env;

const BadRequestError = require('../utils/errors/BadRequestError');
const ConflictError = require('../utils/errors/ConflictError');
const NotFoundError = require('../utils/errors/NotFoundError');

const createUser = (req, res, next) => {
  const {
    email,
    name,
    password,
  } = req.body;

  bcrypt.hash(password, 11)
    .then((passwordHash) => {
      User.create({
        email,
        name,
        password: passwordHash,
      })
        .then((user) => {
          res.send(user.toJSON());
        })
        .catch((err) => {
          if (err.name === 'ValidationError') {
            next(new BadRequestError('Incorrect data'));
          } else if (err.code === 11000) {
            next(new ConflictError('User already exists'));
          } else {
            next(err);
          }
        });
    });
};

const login = (req, res, next) => {
  const { email, password } = req.body;

  User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user.id }, NODE_ENV === 'production' ? JWT_SECRET : JWT_SECRET_DEV, { expiresIn: '7d' });

      res.cookie('jwt', token, {
        maxAge: 604800000, httpOnly: true, sameSite: 'none', secure: true,
      }).send(user.toJSON());
    })
    .catch(next);
};

const getUserInfo = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      if (!user) {
        next(new NotFoundError('User not found'));
      } else {
        res.send(user);
      }
    })
    .catch(next);
};

const updateUserInfo = (req, res, next) => {
  const { email, name } = req.body;

  User.findByIdAndUpdate(req.user._id, { email, name }, { new: true, runValidators: true })
    .then((user) => {
      if (!user) {
        next(new NotFoundError('User not found!'));
      } else {
        res.send(user);
      }
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError('Incorrect data'));
      } else if (err.code === 11000) {
        next(new ConflictError('User already exists'));
      } else {
        next(err);
      }
    });
};

module.exports = {
  createUser,
  login,
  getUserInfo,
  updateUserInfo,
};
