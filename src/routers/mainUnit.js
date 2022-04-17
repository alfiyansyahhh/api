const express = require('express');
const mainUnitController = require('../controllers/mainUnit');
const authen = require('../middleware/authentication');
const author = require('../middleware/authorization');

const mainUnitRouter = express.Router();
mainUnitRouter
  .get('/pospal-api2/openapi/v1/mainUnitOpenApi',authen,author.isAdmin, mainUnitController.getList)
  .get('/pospal-api2/openapi/v1/mainUnitOpenApi/:id', authen, mainUnitController.getDetails)
  .post('/pospal-api2/openapi/v1/mainUnitOpenApi/insert', authen, author.isAdmin, mainUnitController.insert)

module.exports = mainUnitRouter;
