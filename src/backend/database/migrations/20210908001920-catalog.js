'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    
    await queryInterface.createTable('catalogs', { 
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,  
      },
      description: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      unit_value: {
        type: Sequelize.DECIMAL(10,2),
        allowNull: false,
      },
      category: {
        type: Sequelize.STRING,
        allowNull: false,  
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },      
    });
     
  },

  down: async (queryInterface, _Sequelize) => {
    
    await queryInterface.dropTable('catalogs');
     
  }
};
