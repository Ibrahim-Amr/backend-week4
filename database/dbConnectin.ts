import { Sequelize } from 'sequelize';

const dbConnection = new Sequelize('sequelize', 'root', '', {
	host: 'localhost',
	dialect: 'mysql',
});

dbConnection.sync();

export default dbConnection;
