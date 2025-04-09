'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Status', {
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
    await queryInterface.bulkInsert('Status', [
      { name: 'Uszkodzone', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Wydane', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Nowe', createdAt: new Date(), updatedAt: new Date() } ,
    ])
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Status');
  }
};