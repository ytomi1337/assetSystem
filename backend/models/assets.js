const { Sequelize, DataTypes } = require('sequelize');
const sequelize = global.sequelize;
const Category = require('./category');
const Localization = require('./localization')
const Status = require('./status')

const Asset = sequelize.define(
  'assets',
  {
    name: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    it_num: {
      type: DataTypes.TEXT,
      allowNull: false,
      unique: true,
    },
    serialnum: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    user_new: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    user_old: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    localizationId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'Localizations', //<-- Nazwa Tabeli
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
    },
    categoryId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'categories', //<-- Nazwa Tabeli
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
    },
    statusId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'Status', //<-- Nazwa Tabeli
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
    },
    recipt_date: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    return_date: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    warranty_date: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    note: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
);

Asset.belongsTo(Category, { foreignKey: 'categoryId' });
Asset.belongsTo(Localization, { foreignKey: 'localizationId' });
Asset.belongsTo(Status, { foreignKey: 'statusId' });

module.exports = Asset;
