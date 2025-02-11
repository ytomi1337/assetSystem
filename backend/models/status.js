const { Sequelize, DataTypes } = require('sequelize');
const sequelize = global.sequelize;

const Status = sequelize.define(
  'Status', // Model name
  {
    name: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    tableName: 'Status', 
    timestamps: true,
  }
);

module.exports = Status;