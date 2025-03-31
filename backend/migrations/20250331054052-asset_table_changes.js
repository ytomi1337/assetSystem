'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

    await queryInterface.createTable('assets', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
      },
      name: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      it_num: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      serialnum: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      user_new: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      user_old: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      localizationId: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'localizations',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      categoryId: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'categories',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      statusId: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'status',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      recipt_date: {
        type: Sequelize.DATE,
        allowNull: true
      },
      return_date: {
        type: Sequelize.DATE,
        allowNull: true
      },
      warranty_date: {
        type: Sequelize.DATE,
        allowNull: true
      },
      note:{
        type: Sequelize.TEXT,
        allowNull: true
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      }
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('assets');
  }
};
