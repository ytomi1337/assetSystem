'use strict';

module.exports = (sequelize, DataTypes) =>{
  const Status = sequelize.define(
    'Status', // Model name
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

  return Status
}
