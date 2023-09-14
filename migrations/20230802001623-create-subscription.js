'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Subscriptions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      subscriber_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Users', // Имя связанной таблицы
          key: 'id',
        },
      },
      target_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Users', // Имя связанной таблицы
          key: 'id',
        },
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Subscriptions');
  },
};

