'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('phones', [
      {
       user: 'Bartosz Łaniocha',
       name: 'Galaxy S25 5G',
       category: 'Telefon',
       imei: "1234567890123456",
       nr_tel: 607488583,
       puk: 12345678,
       pin: 3333,
       stan: 'Wydane',
       status: 'Dobry',
       recipt_date: new Date(),
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
