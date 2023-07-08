import { Request, Response } from 'express';
import userModel from '../models/user.model';

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

export const signIn = (req: Request, res: Response) => {};

export const updateUser = (req: Request, res: Response) => {};

export const deleteUser = async (req: Request, res: Response) => {
	try {
		const { id } = req.params;
		const user = await userModel.findOne({ where: { id } });
		if (user) {
			await userModel.destroy({
				where: {
					id,
				},
			});
			res.status(200).json({
				success: true,
				message: 'Users deleted successfully',
			});
		} else {
			res.status(404).json({
				success: false,
				message: "User doesn't exist",
			});
		}
	} catch (err) {
		console.log(err);
		res.status(500).json({
			success: false,
			message: 'Error deleting user',
			error: err,
		});
	}
};

export const searchUser = (req: Request, res: Response) => {};

export const searchUserIds = (req: Request, res: Response) => {};
