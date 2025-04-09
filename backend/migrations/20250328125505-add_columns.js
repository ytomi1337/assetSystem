'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('phones', 'user_old',{
      type: Sequelize.STRING,
      allowNull: true,
    })
    await queryInterface.addColumn('phones', 'note',{
      type: Sequelize.TEXT,
      allowNull: true,
    })
    await queryInterface.addColumn('phones', 'return_date',{
      type: Sequelize.DATE,
      allowNull: true
    })
    await queryInterface.addColumn('assets', 'note',{
      type: Sequelize.TEXT,
      allowNull: true
    })

    
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('phones', 'user_old')
    await queryInterface.removeColumn('phones', 'note')
    await queryInterface.removeColumn('phones', 'return_date')
    await queryInterface.removeColumn('assets', 'note')

  }
};
