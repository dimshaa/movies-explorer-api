// const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const BadRequestError = require('../utils/errors/BadRequestError');
const ConflictError = require('../utils/errors/ConflictError');

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
      const token = jwt.sign({ _id: user.id }, 'super-secret-key', { expiresIn: '7d' });

      res.cookie('jwt', token, { maxAge: 604800000, httpOnly: true }).send(user.toJSON());
    })
    .catch(next);
};

module.exports = {
  createUser,
  login,
};
