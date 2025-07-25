'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {

    await queryInterface.createTable('statuses', {
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
    await queryInterface.bulkInsert('statuses', [
      { name: 'Uszkodzone', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Wydane', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Nowe', createdAt: new Date(), updatedAt: new Date() } ,
    ])
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('statuses');
    await queryInterface.dropTable('status');
    await queryInterface.dropTable('Status');
  }
};