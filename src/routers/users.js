const express = require('express');
const usersController = require('../controllers/users');

const usersRouter = express.Router();
usersRouter
  .post('/pospal-api2/openapi/v1/login', usersController.login)
  .post('/pospal-api2/openapi/v1/register', usersController.register)

module.exports = usersRouter;
