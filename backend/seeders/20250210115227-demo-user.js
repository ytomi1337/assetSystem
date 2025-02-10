'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
      await queryInterface.bulkInsert('Users', [
        {
        name: 'Bartosz Łaniocha',
        employeId: 321,
        company: 'Boerner Insulation Sp.z.o.o',
        profession: 'Specjalista ds. ERP',
        department: 'IT',
        email: 'bartosz.laniocha@boernerinsulation.pl',
        createdAt: new Date(),
        updatedAt: new Date()
        }
    ],
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
