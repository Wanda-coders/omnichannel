'use strict';

module.exports = {
  up: async (queryInterface, _Sequelize) => {
    await queryInterface.bulkInsert('photos', [{
      id: 1,
      image_name: 'Mulher-Maravilha',
      path: 'F1.png',
      catalog_id: 1,
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      id: 2,
      image_name: 'Viúva Negra',
      path: 'F5.png',
      catalog_id: 2,
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      id: 3,
      image_name: 'Capitã Marvel',
      path: 'F4.png',
      catalog_id: 3,
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      id: 4,
      image_name: 'Doutor Estranho',
      path: 'F6.png',
      catalog_id: 4,
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      id: 5,
      image_name: 'Capitão América',
      path: 'F8.png',
      catalog_id: 5,
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      id: 6,
      image_name: 'Homem de Ferro',
      path: 'F7.png',
      catalog_id: 6,
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      id: 7,
      image_name: 'Sylvie',
      path: 'F2.png',
      catalog_id: 7,
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      id: 8,
      image_name: 'Gamora',
      path: 'F3.png',
      catalog_id: 8,
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      id: 9,
      image_name: 'Homem Aranha',
      path: 'F9.png',
      catalog_id: 9,
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      id: 10,
      image_name: 'Hulk',
      path: 'F10.png',
      catalog_id: 10,
      created_at: new Date(),
      updated_at: new Date(),
    }
    ], {});
  },

  down: async (queryInterface, _Sequelize) => {
    await queryInterface.bulkDelete('photos', null, {});
  }
};
