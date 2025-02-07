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
    it_num: {
      type: DataTypes.TEXT,
      allowNull: false,
      unique: true,
    },
    serialnum: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    user_new: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    user_old: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    localization: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    category:{
        type: DataTypes.TEXT,
        allowNull: true
    },
    status:{
        type:DataTypes.TEXT,
        allowNull: true
    },
    recipt_date:{
      type: DataTypes.DATE,
      allowNull: true
    },
    return_date:{
      type: DataTypes.DATE,
      allowNull: true
    },
    warranty_date:{
        type: DataTypes.DATE,
        allowNull: true
    },
  },
);
 
module.exports = Asset;