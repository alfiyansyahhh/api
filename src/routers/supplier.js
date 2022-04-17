const express = require('express');
const supplierController = require('../controllers/supplier');
const authen = require('../middleware/authentication');
const author = require('../middleware/authorization');

const supplierRouter = express.Router();
supplierRouter
  .get('/pospal-api2/openapi/v1/supplierOpenApi',authen,author.isAdmin, supplierController.getList)
  .get('/pospal-api2/openapi/v1/supplierOpenApi/:id', authen, supplierController.getDetails)
  .post('/pospal-api2/openapi/v1/supplierOpenApi/insert', authen, author.isAdmin, supplierController.insert)

module.exports = supplierRouter;
