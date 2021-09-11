import Sequelize, { Model } from 'sequelize';

class Catalog extends Model {
  static init(sequelize) {      
    super.init({
      name: Sequelize.STRING,
      description: Sequelize.STRING,
      unit_value: Sequelize.DECIMAL,
      category: Sequelize.STRING,
    }, 
    {  
      sequelize, 
    });

    return this;
  }
}

export default Catalog;
