'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('phones', [
      {
       user: 'Bartosz Łaniocha',
       name: 'Plus',
       category: 'Karta',
       imei: "1234567890123456",
       nr_tel: "607488583",
       puk: "88888888",
       pin: "1234",
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
