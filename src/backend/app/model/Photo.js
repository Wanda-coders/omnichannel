import Sequelize, { Model } from 'sequelize';

class Photo extends Model {
  static init(sequelize) {
    super.init({
      image_name: Sequelize.STRING,
      path: Sequelize.STRING,
      url: {
        type: Sequelize.VIRTUAL,
        get() {
          return `http://localhost:3000/photos/${this.path}`
        }
      }
    },
    { sequelize });
    return this;
  }
}

export default Photo;