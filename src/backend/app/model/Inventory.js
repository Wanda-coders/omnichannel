import Sequelize, { Model } from 'sequelize';

class Inventory extends Model {
  static init(sequelize) {
    super.init({
        quantity: Sequelize.INTEGER,
    }, 
    {  
      sequelize, 
    });
    return this;
  }
  static associate(models){
    this.belongsTo( models.Catalog, { foreignKey: 'catalog_id', as: 'catalogs'})
    this.belongsTo( models.Store, { foreignKey: 'store_id', as: 'stores'})
  }
}

export default Inventory