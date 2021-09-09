import Sequelize, { Model } from 'sequelize';

class Photo extends Model {
  static init(sequelize) {
    super.init({
      image_name: Sequelize.INTEGER,
      description: Sequelize.STRING,
      path: Sequelize.STRING,
    },
    { sequelize });
    return this;
  }
}

export default Photo;