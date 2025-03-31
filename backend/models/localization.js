const { Sequelize, DataTypes } = require('sequelize');
const sequelize = global.sequelize;

const Localization = sequelize.define(
  'localizations',
  {
    name:{
      type: DataTypes.TEXT,
      allowNull: false
    }
  }
);

module.exports = Localization;