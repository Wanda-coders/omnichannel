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
    this.belongsTo(models.Inventory, { foreignKey: 'inventory_id', as: 'inventory'});
    this.belongsTo(models.Catalog, { foreignKey: 'catalog_id', as: 'catalog'});
    this.belongsTo(models.Store, { foreignKey: 'store_id', as: 'stores'});
    this.belongsTo(models.Purchase, { foreignKey: 'purchase_id', as: 'purchase'});
    this.belongsTo(models.Photo, { foreignKey: 'photo_id', as: 'photos'});
  }
}

export default Product;