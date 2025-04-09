'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('localizations', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });

    await queryInterface.bulkInsert('localizations', [
      { name: 'Open-space', createdAt: new Date(), updatedAt: new Date() },
      { name: 'IT', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Warszawa', createdAt: new Date(), updatedAt: new Date() } ,
    ])
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('localizations');
  }
};