'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
     await queryInterface.bulkInsert('Status', [
      {
       name: 'Wydane',
       createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Magazyn',
        createdAt: new Date(),
        updatedAt: new Date()
       },
       {
        name: 'Uszkodzone',
        createdAt: new Date(),
        updatedAt: new Date()
       },
    ]
    );
    
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
