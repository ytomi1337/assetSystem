
const { Sequelize, DataTypes } = require('sequelize');
const sequelize = global.sequelize;

const Category = sequelize.define(
  'categories',  // <--- Nazwa Tabeli
  {
    name:{
      type: DataTypes.TEXT,
      allowNull: false
    }
  },
);

module.exports = Category;