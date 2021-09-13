import Sequelize, { Model } from 'sequelize';

class Product extends Model {
  static init(sequelize) {
    super.init({
      price: Sequelize.DECIMAL,
      quantity: Sequelize.INTEGER,
    },
      { sequelize });
    return this;
  }
  static associate(models) {
    this.belongsTo(models.Catalog, { foreignKey: 'catalog_id', as: 'catalogs' });
    this.belongsTo(models.Order, { foreignKey: 'order_id', as: 'orders' });
  }
}

export default Product;