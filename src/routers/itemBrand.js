const express = require('express');
const itemBrandController = require('../controllers/itemBrand');
const authen = require('../middleware/authentication');
const author = require('../middleware/authorization');

const itemBrandRouter = express.Router();
itemBrandRouter
  .get('/pospal-api2/openapi/v1/itemBrandOpenApi',authen,author.isAdmin, itemBrandController.getList)
  .get('/pospal-api2/openapi/v1/itemBrandOpenApi/:id', authen, itemBrandController.getDetails)
  .post('/pospal-api2/openapi/v1/itemBrandOpenApi/insert', authen, author.isAdmin, itemBrandController.insert)

module.exports = itemBrandRouter;
