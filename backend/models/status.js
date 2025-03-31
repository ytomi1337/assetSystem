const { Sequelize, DataTypes } = require('sequelize');
const sequelize = global.sequelize;

const Status = sequelize.define(
  'status', 
  {
    name: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    tableName: 'status', 
    timestamps: true,
  }
);

module.exports = Status;