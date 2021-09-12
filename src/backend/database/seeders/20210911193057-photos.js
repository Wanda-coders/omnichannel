'use strict';

module.exports = {
  up: async (queryInterface, _Sequelize) => {
    await queryInterface.bulkInsert('photos', [{
      id: 1,
      image_name: '',
      path: '',
      created_at: new Date(),
      updated_at: new Date(),
    }], {});
  },

  down: async (queryInterface, _Sequelize) => {
    await queryInterface.bulkDelete('photos', null, {});
  }
};
