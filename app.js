const bodyParser = require('body-parser');
const express = require('express');
const cors = require('cors');
require('dotenv').config();

const usersRouter = require('./src/routers/users');
const categoryRouter = require('./src/routers/category');
const productRouter = require('./src/routers/products');
const supplierRouter = require('./src/routers/supplier');
const mainUnit = require('./src/routers/mainUnit');
const itemLabel = require('./src/routers/itemLabel');
const itemFlavor = require('./src/routers/itemFlavor');
const itemBrand = require('./src/routers/itemBrand');

const { PORT } = process.env;

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(usersRouter);
app.use(productRouter);
app.use(categoryRouter);
app.use(supplierRouter)
app.use(mainUnit)
app.use(itemLabel)
app.use(itemFlavor)
app.use(itemBrand)
app.use(express.static(`${__dirname}/uploads`));

app.get('/', (req, res) => {
  res.json({
    succes: true,
    msg: 'it works',
  });
});

app.listen(PORT, () => {
  console.log(`service running on port ${PORT}`);
});

module.exports = app;
