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
  }
};

module.exports = Products;