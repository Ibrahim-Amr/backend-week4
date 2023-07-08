import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();
const dbConnection = new Sequelize(process.env.DB_NAME, process.env.DB_USER, '', {
	host: process.env.DB_HOST,
	dialect: 'mysql',
});

dbConnection.sync();

export default dbConnection;
