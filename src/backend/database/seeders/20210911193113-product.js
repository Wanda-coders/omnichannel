'use strict';

module.exports = {
  up: async (queryInterface, _Sequelize) => {
    await queryInterface.bulkInsert('products', [{
      id: 1,
      price: 310.50,
      quantity: 100,
      inventory_id: 1,
      catalog_id: 1,
      store_id: 1,
      created_at: new Date(),
      updated_at: new Date(),
    }], {});
  },

  down: async (queryInterface, _Sequelize) => {
    await queryInterface.bulkDelete('products', null, {});
  }
};
