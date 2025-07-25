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
    tableName: 'statuses', 
    timestamps: true,
  }
);

module.exports = Status;