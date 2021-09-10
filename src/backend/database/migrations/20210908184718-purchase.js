'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('purchases', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      status_purchase: {
        type: Sequelize.ENUM('APROVADO', 'PENDENTE', 'RECUSADO'),
        allowNull: false,
      },
      quantity_purchase: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      date_purchase: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      delivery_status: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },
      final_price: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
      },
      user_id: {
        type: Sequelize.INTEGER,
        references: { model: 'users', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
        allowNull: true,
      },
      store_id: {
        type: Sequelize.INTEGER,
        references: { model: 'stores', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
        allowNull: true,
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

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('purchases');
  }
};
