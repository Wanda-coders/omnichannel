import Sequelize, { Model } from 'sequelize';

class Photo extends Model {
  static init(sequelize) {
    super.init({
      image_name: Sequelize.STRING,
      path: Sequelize.STRING,
      url: {
        type: Sequelize.VIRTUAL,
        get() {
          return `http://localhost:3000/storage/${this.path}`
        }
      }
    },
    { sequelize });
    return this;
  }
  static associate(models){
    this.belongsTo( models.Catalog, { foreignKey: 'catalog_id', as: 'catalogs'})
  }
}

export default Photo;