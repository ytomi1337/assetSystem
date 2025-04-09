
const { Sequelize, DataTypes } = require('sequelize');
const sequelize = global.sequelize;

const Category = sequelize.define(
  'Category', // Model Name
  {
    name:{
      type: DataTypes.TEXT,
      allowNull: false
    }
  },
  {
    tableName: 'categories', 
    timestamps: true,
  }
);

module.exports = Category;