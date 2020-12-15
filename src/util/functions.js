const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports = {
  hasEmpty: (array) => {
    for (let i = 0; i < array.length; i++) {
      if (array[i] === undefined || array[i] === null)
        return true;
    }
    return false;
  },

  generateHash: password => bcrypt.hashSync(password, bcrypt.genSaltSync(8), null),

  validPassword: (password, hash) => bcrypt.compareSync(password, hash),

  generateToken: (params = {}) => jwt.sign(params, authConfig.secret, {
    expiresIn: 86400, //um dia
  }),
}