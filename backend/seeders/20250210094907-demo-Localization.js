'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    
      await queryInterface.bulkInsert('Localizdadations', [
        {
        name: 'Ksiegowosc',
        createdAt: new Date(),
        updatedAt: new Date()
        },
        {
          name: 'SHE',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'Kadry',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'IT',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'Magazyn',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'Zarzad',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'Krzywa',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'Paprotnia',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'Guardhouse',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'CR Piec',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'Labolatorium',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'Binderownia',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'Brykietownia',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'SHE',
          createdAt: new Date(),
          updatedAt: new Date()
        },
    ],);
    
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
