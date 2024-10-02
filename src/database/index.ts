// config/database.ts

import { Sequelize } from 'sequelize';

console.log("process.env.DB_NAME ::", process.env.DB_NAME);

const dbName = process.env.DB_NAME || '';
const dbUser = process.env.DB_USER || '';
const dbPassword = process.env.DB_PASSWORD || '';
const dbHost = process.env.DB_HOST || 'localhost';

// Create a new Sequelize instance, replace the credentials with yours
const sequelize = new Sequelize(
  dbName,
  dbUser,
  dbPassword,
  {
    host: dbHost,
    dialect: 'mysql', // You can use 'postgres', 'sqlite', etc.
    logging: false
  }
);

export default sequelize;
