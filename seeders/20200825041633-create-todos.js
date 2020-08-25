'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('todos', [
      {
        content: '料理',
        category_id: 2,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        content: '洗濯',
        category_id: 2,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        content: 'レポート',
        category_id: 1,
        created_at: new Date(),
        updated_at: new Date()
      }
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('todos');
  }
};
