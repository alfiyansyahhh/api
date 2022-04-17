const express = require('express');
const productController = require('../controllers/product');
const authen = require('../middleware/authentication');
const author = require('../middleware/authorization');
const upload = require('../middleware/upload');

const productRouter = express.Router();
productRouter
  .get('/pospal-api2/openapi/v1/productOpenApi',authen,author.isAdmin, productController.getList)
  .get('/pospal-api2/openapi/v1/productOpenApi/:id', authen, productController.getDetails)
  .post('/pospal-api2/openapi/v1/productOpenApi/insert', authen, author.isAdmin, upload, productController.insert)
  .put('/pospal-api2/openapi/v1/productOpenApi/updateProductInfo/:id', authen, author.isAdmin, upload, productController.update)
module.exports = productRouter;
