'use strict';

module.exports = {
  up: async (queryInterface, _Sequelize) => {
    await queryInterface.bulkInsert('catalogs', [{
      id: 1,
      name: 'Boneca Funko Wanda',
      description: '',
      unit_value: 220.30,
      created_at: new Date(),
      updated_at: new Date(),
    }], {});
  },

  down: async (queryInterface, _Sequelize) => {
    await queryInterface.bulkDelete('catalogs', null, {});
  }
};
