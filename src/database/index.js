const Sequelize = require('sequelize');

const dbConfig = require('../config/database.js');

const Product = require('../models/Product');
const User = require('../models/User');

const connection = new Sequelize(dbConfig);

Product.init(connection);
User.init(connection);

module.exports = connection;