
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Categories', {
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
    await queryInterface.bulkInsert('Categories', [
          { name: 'Laptop', createdAt: new Date(), updatedAt: new Date() },
          { name: 'Monitor', createdAt: new Date(), updatedAt: new Date() },
          { name: 'Stacja Dok', createdAt: new Date(), updatedAt: new Date() } ,
          { name: 'Peryferia', createdAt: new Date(), updatedAt: new Date() } ,
          { name: 'Urządzenia Sieciowe', createdAt: new Date(), updatedAt: new Date() } 
        ])
      
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Categories');
  }
};