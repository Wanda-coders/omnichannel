'use strict';

module.exports = {
  up: async (queryInterface, _Sequelize) => {
    await queryInterface.bulkInsert('catalogs', [{
      id: 1,
      name: 'Boneca Funko Mulher-Maravilha',
      description: 'Figura Colecionável - Funko POP - Mulher Maravilha',
      unit_value: 220.30,
      category: 'Super-Heroínas',
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      id: 2,
      name: 'Boneca Funko Viúva Negra',
      description: 'Figura Colecionável - Funko POP - Viúva Negra',
      unit_value: 205.50,
      category: 'Super-Heroínas',
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      id: 3,
      name: 'Boneca Funko Capitã Marvel',
      description: 'Figura Colecionável - Funko POP - Capitã Marvel',
      unit_value: 330.45,
      category: 'Super-Heroínas',
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      id: 4,
      name: 'Boneca Funko Doutor Estranho',
      description: 'Figura Colecionável - Funko POP - Doutor Estranho',
      category: 'Super-Heróis',
      unit_value: 275.85,
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      id: 5,
      name: 'Boneca Funko Capitão América',
      description: 'Figura Colecionável - Funko POP - Capitão América',
      unit_value: 305.50,
      category: 'Super-Heróis',
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      id: 6,
      name: 'Boneca Funko Homem de Ferro',
      description: 'Figura Colecionável - Funko POP - Homem de Ferro',
      unit_value: 310.00,
      category: 'Super-Heróis',
      created_at: new Date(),
      updated_at: new Date(),
    }], {});
  },

  down: async (queryInterface, _Sequelize) => {
    await queryInterface.bulkDelete('catalogs', null, {});
  }
};
