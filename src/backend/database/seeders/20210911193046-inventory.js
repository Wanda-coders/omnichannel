'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('inventories', [{
      id: 1,
      quantity: 20,
      catalog_id: 1,
      //store_id
      created_at: new Date(),
      updated_at: new Date(),
    }], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('inventories', null, {});
  }
};
