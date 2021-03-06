import Sequelize, { Model } from 'sequelize';


class Store extends Model {
  static init(sequelize) {
    super.init({
      name: Sequelize.STRING,
      contact: Sequelize.STRING,
      postal_code: Sequelize.STRING,
      state: Sequelize.ENUM(27),
      city: Sequelize.STRING,
      district: Sequelize.STRING,
      address: Sequelize.STRING,
      number: Sequelize.STRING,
      complement: Sequelize.STRING,
    },
      {
        sequelize,
      });

    return this;
  }
}

export default Store;