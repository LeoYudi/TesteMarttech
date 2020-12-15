const express = require('express');
const ProductController = require('./controllers/ProductController');
const UserController = require('./controllers/UserController');
const CartController = require('./controllers/CartController');
// const ItemController = require('./controllers/ItemController');

const authMiddleware = require('./middlewares/auth');

const routes = express.Router();

routes.get('/', () => {
  return res.status(200).json({ msg: 'teste' });
});

routes.get('/products', ProductController.getAll);
routes.post('/product/register', authMiddleware, ProductController.store);
routes.put('/product/update', authMiddleware, ProductController.update);
routes.delete('/product/delete/:id', authMiddleware, ProductController.delete);

routes.post('/login', UserController.login);
routes.post('/signup', UserController.register);
routes.put('/user/update', authMiddleware, UserController.update);
routes.delete('/user/delete/:id', authMiddleware, UserController.delete);

routes.get('/cart/:cartId', authMiddleware, CartController.getCart);

module.exports = routes;