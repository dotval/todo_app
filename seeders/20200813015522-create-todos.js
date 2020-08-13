'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    queryInterface.bulkInsert('todos', [
      {
        content: '料理',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        content: '洗濯',
        created_at: new Date(),
        updated_at: new Date()
      }
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    queryInterface.bulkDelete('todos');
  }
};
