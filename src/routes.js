const express = require('express');

const routes = express.Router();

routes.get('/', () => {
  return res.status(200).json({ msg: 'teste' });
});

module.exports = routes;