'use strict';

module.exports = (sequelize, DataTypes) =>{
  const Reminders = sequelize.define(
  'reminders',
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      title: {
        type: DataTypes.STRING,
      },
      content: {
        type: DataTypes.STRING,
      },
      author:{
        type: DataTypes.STRING,
      },
      expiryDate: {
        allowNull: false,
        type: DataTypes.DATE
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE
      }
    
    }
  );
  return Reminders
}
