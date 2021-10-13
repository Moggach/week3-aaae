'use strict';

const crypto = require('crypto');
const bcrypt = require('bcryptjs');
const model = require('./database/model');

function verifyUser(email, password) {
  model
    .getUser(email)
    .then((user) => bcrypt.compare(password, user.password))
    .then((match) => {
      if (!match) {
        throw new Error('Password mismatch');
      } else {
        delete user.password;
        return user;
      }
    });
}

function createUser(email, password, name) {
  return bcrypt
    .hash(password, 10)
    .then((hash) => model.createUser(email, hash, name));
}

const COOKIE_OPTIONS = {
  httpOnly: true,
  maxAge: 600000,
  sameSite: 'strict',
  signed: true,
};

module.exports = { verifyUser, createUser, COOKIE_OPTIONS };
