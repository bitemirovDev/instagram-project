'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Filters', [
      { name: 'Original' },
      { name: 'Clarendon' },
      { name: 'Gingham' },
      { name: 'Moon' },
      { name: 'Lark' },
      { name: 'Reyes' },
      { name: 'Juno' },
      { name: 'Slumber' },
      { name: 'Crema' },
      { name: 'Ludwig' },
      { name: 'Aden' },
      { name: 'Perpetua' }
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    // Удаление всех данных из таблицы Filters
    await queryInterface.bulkDelete('Filters', null, {});
  }
};
