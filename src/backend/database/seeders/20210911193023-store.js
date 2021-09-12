'use strict';

module.exports = {
  up: async (queryInterface, _Sequelize) => {
    await queryInterface.bulkInsert('stores', [{
      id: 1,
      name: 'Loja Centro',
      contact: '(16)3711-2200',
      postal_code: '78264896',
      state: 'SP',
      city: 'Franca',
      district: 'Centro',
      address: 'Voluntarios Da Franca',
      number: 1465,
      complement: 202,
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      id: 2,
      name: 'Loja Campina',
      contact: '(91)3321-4650',
      postal_code: '38914856',
      state: 'PA',
      city: 'Belém',
      district: 'Campina',
      address: 'Quinze De Novembro',
      number: 64,
      complement: 103,
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      id: 3,
      name: 'Loja Barreiro',
      contact: '(31)3389-5800',
      postal_code: '43286612',
      state: 'MG',
      city: 'Belo Horizonte',
      district: 'Barreiro',
      address: 'Visconde De Ibituruna',
      number: 318,
      complement: 60,
      created_at: new Date(),
      updated_at: new Date(),
    }], {});
  },

  down: async (queryInterface, _Sequelize) => {
    await queryInterface.bulkDelete('stores', null, {});
  }
};
