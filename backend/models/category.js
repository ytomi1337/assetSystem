

module.exports = (sequelize, DataTypes) =>  {
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

  return Category
}



