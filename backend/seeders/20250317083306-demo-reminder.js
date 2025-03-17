'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
     await queryInterface.bulkInsert('Reminders', [
      {
       title: 'Odebrac Sprzęt od Pracownika',
       content: 'Lorem ipsum dolor sit amet,  Null at  Pellentesque haesuada fames ac turpis egestas.',
       author: 'Kinga Piróg',
       expiryDate: new Date(),
       createdAt: new Date(),
       updatedAt: new Date()
      },
      {
        title: 'Przygotowac inwentaryzacje',
        content: 'Lorem ipsum dolor sit amet,  Curabitur nec nisl egestas, fames ac turpis egestas.',
        author: 'Bartosz Łaniocha',
        expiryDate: new Date(),
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
