'use strict';

require('dotenv').config();

const { generateHash } = require('../../util/functions');
const { ADMIN } = require('../../config/level');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('users', [{
      name: 'marttech',
      email: process.env.ADMIN_EMAIL,
      password: generateHash(process.env.ADMIN_PASSWORD),
      level: ADMIN,
      createdAt: new Date(),
      updatedAt: new Date(),
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('users', null, {});
  }
};
