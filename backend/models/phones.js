const { Sequelize, DataTypes } = require('sequelize');
const sequelize = global.sequelize;

const Phones = sequelize.define(
  'phones',
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    user: {
      type: DataTypes.STRING,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING,
      allowNull: true
    },
    category: {
      type: DataTypes.STRING
    },
    imei: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: true,
      validate: {
        isNumeric: true,
        len: [16, 16]
      }
    },
    nr_tel: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        isNumeric: true,
        len: [9, 9]
      }
    },
    puk: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        len: [8, 8]
      },
      set(value) {
        this.setDataValue('puk', value === "" ? null : value);
      }
    },
    pin: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        len: [4, 4]
      },
      set(value) {
        this.setDataValue('pin', value === "" ? null : value);
      }
    },
    stan: {
      type: DataTypes.STRING
    },
    status: {
      type: DataTypes.STRING
    },
    recipt_date: {
      type: DataTypes.DATE,
      allowNull: true,
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

module.exports = Phones;