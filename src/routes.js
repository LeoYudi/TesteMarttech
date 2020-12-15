const express = require('express');
const ProductsController = require('./controllers/ProductsController');

const routes = express.Router();

routes.get('/', () => {
  return res.status(200).json({ msg: 'teste' });
});

routes.get('/products', ProductsController.getAll);
routes.post('/product/register', ProductsController.store);

module.exports = routes;