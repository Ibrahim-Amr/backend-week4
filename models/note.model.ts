import dbConnection from '../database/dbConnectin';
import { DataTypes } from 'sequelize';
import userModel from './user.model';

const noteModel = dbConnection.define('Note', {
	id: {
		type: DataTypes.INTEGER,
		unique: true,
		autoIncrement: true,
		primaryKey: true,
	},
	title: {
		type: DataTypes.STRING,
		allowNull: false,
		validate: {
			notEmpty: {
				msg: 'Title cannot be empty.',
			},
		},
	},
	content: {
		type: DataTypes.STRING,
		allowNull: false,
		validate: {
			notEmpty: {
				msg: 'Content cannot be empty.',
			},
		},
	},
	userId: {
		type: DataTypes.INTEGER,
		allowNull: false,
		references: {
			model: userModel,
			key: 'id',
		},
	},
});

export default noteModel;
