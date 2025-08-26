const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: 'postgres'
  }
);

async function testDatabaseConnection() {
  try{
    await sequelize.authenticate();
    console.log('Connection to PostgresSQL estabilished successfully.');
  }catch(err) {
    console.log('Unable to connect to the database: ', err);
  }
}

testDatabaseConnection()

module.exports = sequelize;