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
    this.hasMany(models.Cart, { foreignKey: 'userId', as: 'carts' });
  }
};

module.exports = User;