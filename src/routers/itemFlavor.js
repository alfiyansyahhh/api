const express = require('express');
const itemFlavorController = require('../controllers/itemFlavor');
const authen = require('../middleware/authentication');
const author = require('../middleware/authorization');

const itemFlavorRouter = express.Router();
itemFlavorRouter
  .get('/pospal-api2/openapi/v1/itemFlavorOpenApi',authen,author.isAdmin, itemFlavorController.getList)
  .get('/pospal-api2/openapi/v1/itemFlavorOpenApi/:id', authen, itemFlavorController.getDetails)
  .post('/pospal-api2/openapi/v1/itemFlavorOpenApi/insert', authen, author.isAdmin, itemFlavorController.insert)

module.exports = itemFlavorRouter;
