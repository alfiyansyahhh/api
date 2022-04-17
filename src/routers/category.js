const express = require('express');
const categoryController = require('../controllers/category');
const authen = require('../middleware/authentication');
const author = require('../middleware/authorization');

const categoryRouter = express.Router();
categoryRouter
  .get('/pospal-api2/openapi/v1/categoryOpenApi',authen,author.isAdmin, categoryController.getList)
  .get('/pospal-api2/openapi/v1/categoryOpenApi/:id', authen, categoryController.getDetails)
  .post('/pospal-api2/openapi/v1/categoryOpenApi/insert', authen, author.isAdmin, categoryController.insert)

module.exports = categoryRouter;
