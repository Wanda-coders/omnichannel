'use strict';

module.exports = {
  up: async (queryInterface, _Sequelize) => {
    await queryInterface.bulkInsert('photos', [{
      id: 1,
      image_name: 'Mulher-Maravilha',
      path: 'images/F1.png',
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      id: 2,
      image_name: 'Viúva Negra',
      path: 'images/F5.png',
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      id: 3,
      image_name: 'Capitã Marvel',
      path: 'images/F4.png',
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      id: 4,
      image_name: 'Doutor Estranho',
      path: 'images/F6.png',
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      id: 5,
      image_name: 'Capitão América',
      path: 'images/F8.png',
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      id: 6,
      image_name: 'Homem de Ferro',
      path: 'images/F7.png',
      created_at: new Date(),
      updated_at: new Date(),
    }], {});
  },

  down: async (queryInterface, _Sequelize) => {
    await queryInterface.bulkDelete('photos', null, {});
  }
};
