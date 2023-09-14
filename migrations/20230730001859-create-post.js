'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) =>{
    await queryInterface.createTable('Posts', {
      id:{
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      media: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      caption: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      filter_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'Filters',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Users',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    })
  },

  down: async (queryInterface, Sequelize) =>{
    await queryInterface.dropTable('Posts')
  },
};

