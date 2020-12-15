const express = require('express');
const ProductController = require('./controllers/ProductController');
const UserController = require('./controllers/UserController');

const routes = express.Router();

routes.get('/', () => {
  return res.status(200).json({ msg: 'teste' });
});

routes.get('/products', ProductController.getAll);
routes.post('/product/register', ProductController.store);

routes.post('/signup', UserController.register);

module.exports = routes;