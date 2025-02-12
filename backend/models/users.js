const { Sequelize, DataTypes } = require('sequelize');
const sequelize = global.sequelize;

const Users = sequelize.define(
  'Users', // Model name
  {
    name: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    employeId: {
      type: DataTypes.INTEGER,
    },
    company: {
      type: DataTypes.TEXT,
    },
    profession: {
      type: DataTypes.TEXT,
    },
    department: {
      type: DataTypes.TEXT,
    },
    email: {
      type: DataTypes.INTEGER,
    },
  },
  
);

module.exports = Users;