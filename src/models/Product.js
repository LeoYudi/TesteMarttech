const { Model, DataTypes } = require('sequelize');

class Products extends Model {
  static init(connection) {
    super.init({
      name: DataTypes.STRING,
      description: DataTypes.TEXT,
      price: DataTypes.FLOAT,
    }, {
      sequelize: connection,
    })
  }
  static associate(models) {
    this.hasMany(models.Item, { foreignKey: 'productId', as: 'items' });
  }
};

module.exports = Products;