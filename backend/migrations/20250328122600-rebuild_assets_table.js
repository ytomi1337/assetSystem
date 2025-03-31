module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('assets', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
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
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('assets');
  },
};
