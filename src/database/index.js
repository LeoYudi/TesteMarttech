const Sequelize = require('sequelize');

const dbConfig = require('../config/database.js');

const Product = require('../models/Product');
const User = require('../models/User');
const Cart = require('../models/Cart');
const Item = require('../models/Item');

const connection = new Sequelize(dbConfig);

Product.init(connection);
User.init(connection);
Cart.init(connection);
Item.init(connection);

Product.associate(connection.models);
User.associate(connection.models);
Cart.associate(connection.models);
Item.associate(connection.models);

module.exports = connection;