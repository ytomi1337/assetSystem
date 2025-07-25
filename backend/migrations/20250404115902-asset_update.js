'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('assets', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      it_num: {
        type: Sequelize.TEXT,
        allowNull: false,
        unique: true,
      },
      serialnum: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      user_new: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      user_old: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      localization: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      category: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      status: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      recipt_date: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      return_date: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      warranty_date: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      note: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('assets');
  },
};
