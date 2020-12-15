const { Model, DataTypes } = require('sequelize');

class Item extends Model {
  static init(connection) {
    super.init({
      amount: DataTypes.INTEGER,
    }, {
      sequelize: connection,
    })
  }
  static associate(models) {
    this.belongsTo(models.Cart, { foreignKey: 'cartId', as: 'cart' });
    this.belongsTo(models.Products, { foreignKey: 'productId', as: 'product' });
  }
};

module.exports = Item;