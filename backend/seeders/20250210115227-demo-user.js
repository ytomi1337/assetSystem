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
        },
        {
          name: 'Michal Czerski',
          employeId: 123,
          company: 'Boerner Insulation Sp.z.o.o',
          profession: 'Technolog',
          department: 'Technologi',
          email: 'michal.czerski@boernerinsulation.pl',
          createdAt: new Date(),
          updatedAt: new Date()
          },
          {
            name: 'Sergei Matveenko',
            employeId: 12,
            company: 'Boerner Insulation Sp.z.o.o',
            profession: 'Kierownik dzialu IT',
            department: 'IT',
            email: 'sergei.matveenko@boernerinsulation.pl',
            createdAt: new Date(),
            updatedAt: new Date()
            },
            {
              name: 'Nikola Kruk',
              employeId: 444,
              company: 'Boerner Insulation Sp.z.o.o',
              profession: 'Spec. ds Administracji',
              department: 'Administracja',
              email: 'nikola.kruk@boernerinsulation.pl',
              createdAt: new Date(),
              updatedAt: new Date()
              },
              {
                name: 'Joanna Klebczyk',
                employeId: 412,
                company: 'Boerner Insulation Sp.z.o.o',
                profession: 'Mistrz Zmianowy',
                department: 'MWG',
                email: 'joanna.klebczyk@boernerinsulation.pl',
                createdAt: new Date(),
                updatedAt: new Date()
                },
                {
                  name: 'Mariusz Mol',
                  employeId: 321,
                  company: 'Boerner Insulation Sp.z.o.o',
                  profession: 'Spec. ds Utrzymania floty',
                  department: 'Administracja',
                  email: 'mariusz.mol@boernerinsulation.pl',
                  createdAt: new Date(),
                  updatedAt: new Date()
                  },
                  {
                    name: 'Tomasz Kowalski',
                    employeId: 512,
                    company: 'Boerner Insulation Sp.z.o.o',
                    profession: 'Spec. ds Elektryki',
                    department: 'Utrzymanie Ruchu',
                    email: 'tomasz.kowalski@boernerinsulation.pl',
                    createdAt: new Date(),
                    updatedAt: new Date()
                    },
                    {
                      name: 'Marta Przybylska',
                      employeId: 131,
                      company: 'Boerner Insulation Sp.z.o.o',
                      profession: 'Spec. ds BHP',
                      department: 'Administracja',
                      email: 'marta.przybylska@boernerinsulation.pl',
                      createdAt: new Date(),
                      updatedAt: new Date()
                      },
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
