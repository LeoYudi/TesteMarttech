const { Model, DataTypes } = require('sequelize');

class User extends Model {
  static init(connection) {
    super.init({
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      name: DataTypes.STRING,
      level: DataTypes.TINYINT,
    }, {
      sequelize: connection,
    })
  }
  static associate(models) {
  }
};

module.exports = User;