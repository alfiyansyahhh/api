const express = require('express');
const itemLabelController = require('../controllers/itemLabel');
const authen = require('../middleware/authentication');
const author = require('../middleware/authorization');

const itemLabelRouter = express.Router();
itemLabelRouter
  .get('/pospal-api2/openapi/v1/itemLabelOpenApi',authen,author.isAdmin, itemLabelController.getList)
  .get('/pospal-api2/openapi/v1/itemLabelOpenApi/:id', authen, itemLabelController.getDetails)
  .post('/pospal-api2/openapi/v1/itemLabelOpenApi/insert', authen, author.isAdmin, itemLabelController.insert)

module.exports = itemLabelRouter;
