const { Sequelize, DataTypes } = require('sequelize');
const sequelize = global.sequelize;

const Localization = sequelize.define(
  'Localization',
  {
    name:{
      type: DataTypes.TEXT,
      allowNull: false
    }
  }
);

module.exports = Localization;