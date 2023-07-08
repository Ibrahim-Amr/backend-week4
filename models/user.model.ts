import dbConnection from '../database/dbConnectin';
import { DataTypes } from 'sequelize';

const userModel = dbConnection.define('User', {
	id: {
		type: DataTypes.INTEGER,
		unique: true,
		autoIncrement: true,
		primaryKey: true,
	},
	name: {
		type: DataTypes.STRING,
		allowNull: false,
		validate: {
			notEmpty: {
				msg: 'Name cannot be empty.',
			},
		},
	},
	email: {
		type: DataTypes.STRING(50),
		allowNull: false,
		unique: true,
		validate: {
			isEmail: true,
			notEmpty: {
				msg: 'Email cannot be empty.',
			},
		},
	},
	password: {
		type: DataTypes.STRING,
		allowNull: false,
		validate: {
			notEmpty: {
				msg: 'Password cannot be empty.',
			},
			len: [6, 20],
		},
	},
	age: {
		type: DataTypes.INTEGER,
		allowNull: false,
		validate: {
			isNumeric: true,
			notEmpty: {
				msg: 'Age cannot be empty.',
			},
		},
	},
});

export default userModel;
