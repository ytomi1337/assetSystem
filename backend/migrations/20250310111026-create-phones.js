'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('phones', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      user: {
        type: Sequelize.STRING,
        allowNull: false
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      category: {
        type: Sequelize.STRING
      },
      imei: {
        type: Sequelize.STRING
      },
      nr_tel: {
        type: Sequelize.INTEGER
      },
      puk: {
        type: Sequelize.INTEGER
      },
      pin: {
        type: Sequelize.INTEGER
      },
      stan: {
        type: Sequelize.STRING
      },
      status: {
        type: Sequelize.STRING
      },
      recipt_date: {
        type: Sequelize.DATE
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
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('phones');
  }
};