const { Model, DataTypes } = require('sequelize');

class Cart extends Model {
  static init(connection) {
    super.init({}, {
      sequelize: connection,
    })
  }
  static associate(models) {
    this.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });
    this.hasMany(models.Item, { foreignKey: 'cartId', as: 'items' });
  }
};

module.exports = Cart;