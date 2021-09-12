'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('orders', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      status_purchase: {
        type: Sequelize.STRING,
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

  down: async (queryInterface, _Sequelize) => {

    await queryInterface.dropTable('orders');
  }
};
