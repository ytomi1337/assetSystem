const { Sequelize, DataTypes } = require('sequelize');
const sequelize = global.sequelize;
 
const Asset = sequelize.define(
  'asset',
  {
    // Model attributes are defined here
    name: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    serialnum: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    localization: {
      type: DataTypes.TEXT,
    },
    category:{
        type: DataTypes.TEXT,
    },
    status:{
        type:DataTypes.TEXT
    },
    warranty_date:{
        type: DataTypes.DATE
    }
  },
);
 
 
module.exports = Asset;