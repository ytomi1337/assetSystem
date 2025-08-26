'use strict';

module.exports = (sequelize, DataTypes) =>{
  const Localization = sequelize.define(
  'Localization',
    {
      name:{
        type: DataTypes.TEXT,
        allowNull: false
      }
    },
    {
      tableName: 'localizations', 
      timestamps: true,
    }
  );
return Localization
}
