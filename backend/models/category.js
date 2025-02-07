
const { Sequelize, DataTypes } = require('sequelize');
const sequelize = global.sequelize;

const Category = sequelize.define(
  'Categories',
  {
    name:{
      type: DataTypes.TEXT,
      allowNull: false
    }
  }
);

module.exports = Category;