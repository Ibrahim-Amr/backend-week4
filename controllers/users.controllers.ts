import { Request, Response } from 'express';
import userModel from '../models/user.model';
import { Op } from 'sequelize';
import noteModel from '../models/note.model';

interface User {
	id: number;
	name: string;
	email: string;
	password: string;
	age: number;
	createdAt: string;
	updatedAt: string;
}

export const getUsers = async (req: Request, res: Response) => {
	try {
		const users = await userModel.findAll();
		res.status(200).json({
			success: true,
			message: 'Users retrieved successfully',
			data: users,
		});
	} catch (err) {
		console.log(err);
		res.status(500).json({
			success: false,
			message: 'Error retrieving users',
			error: err,
		});
	}
};

export const signUp = async (req: Request, res: Response) => {
	try {
		const userData = req.body;
		const existingUser = await userModel.findOne({
			attributes: ['email'],
			where: { email: userData.email },
		});

		if (existingUser) {
			return res.status(409).json({
				success: false,
				message: 'Users already exists',
			});
		}

		const signUp = await userModel.create(userData);
		res.status(201).json({
			success: true,
			message: 'Users created successfully',
			data: signUp,
		});
	} catch (err) {
		console.log(err);
		res.status(500).json({
			success: false,
			message: 'Error signing up',
			error: err,
		});
	}
};

export const signIn = async (req: Request, res: Response) => {
	try {
		const { email, password } = req.body;
		const existingUser: User | any = await userModel.findOne({ where: { email } });

		if (!existingUser) {
			return res.status(404).json({
				success: false,
				message: 'User not found',
			});
		}

		if (password !== existingUser.password) {
			return res.status(401).json({
				success: false,
				message: 'Incorrect password',
			});
		}

		const userWithoutPassword: User = { ...existingUser.toJSON() };
		delete userWithoutPassword.password;
		res.status(200).json({
			success: true,
			message: 'User authenticated successfully',
			data: userWithoutPassword,
		});
	} catch (err) {
		console.log(err);
		res.status(500).json({
			success: false,
			message: 'Error signing in',
			error: err,
		});
	}
};

export const updateUser = async (req: Request, res: Response) => {
	try {
		const { id } = req.params;
		const updatedUser = req.body;

		const existingUser = await userModel.findOne({
			attributes: ['email'],
			where: { id },
		});

		if (!existingUser) {
			return res.status(404).json({
				success: false,
				message: 'User not found',
			});
		}

		await userModel.update(updatedUser, { where: { id } });
		const afterUpdate = await userModel.findOne({
			attributes: { exclude: ['password'] },
			where: { id },
		});

		res.status(200).json({
			success: true,
			message: 'User updated successfully',
			data: afterUpdate,
		});
	} catch (err) {
		console.log(err);
		res.status(500).json({
			success: false,
			message: 'Error updating user',
			error: err,
		});
	}
};

export const deleteUser = async (req: Request, res: Response) => {
	try {
		const { id } = req.params;
		const existingUser = await userModel.findOne({ where: { id } });

		if (!existingUser) {
			return res.status(404).json({
				success: false,
				message: "User doesn't exist",
			});
		}

		await noteModel.destroy({
			where: { userId: id },
		});

		await userModel.destroy({
			where: {
				id,
			},
		});

		return res.status(200).json({
			success: true,
			message: 'Users deleted successfully',
		});
	} catch (err) {
		console.log(err);
		res.status(500).json({
			success: false,
			message: 'Error deleting user',
			error: err,
		});
	}
};

export const searchUser = async (req: Request, res: Response) => {
	try {
		const users = await userModel.findAll({
			where: {
				age: { [Op.between]: [20, 30] },
			},
		});

		if (!users) {
			return res.status(404).json({
				success: false,
				message: 'User not found',
			});
		}

		res.status(200).json({
			success: true,
			message: 'Users retrieved successfully',
			data: users,
		});
	} catch (err) {
		console.log(err);
		res.status(500).json({
			success: false,
			message: 'Error getting users',
			error: err,
		});
	}
};

export const searchUserIds = async (req: Request, res: Response) => {
	try {
		const { ids } = req.body;
		const users = await userModel.findAll({
			attributes: {
				exclude: ['password'],
			},
			where: {
				id: { [Op.in]: ids },
			},
		});

		if (!users) {
			return res.status(404).json({
				success: false,
				message: 'User not found',
			});
		}

		res.status(200).json({
			success: true,
			message: 'Users retrieved successfully',
			data: users,
		});
	} catch (err) {
		console.log(err);
		res.status(500).json({
			success: false,
			message: 'Error getting users',
			error: err,
		});
	}
};
