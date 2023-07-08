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

export const signUp = async (req: Request, res: Response) => {};

export const signIn = (req: Request, res: Response) => {};

export const updateUser = (req: Request, res: Response) => {};

export const deleteUser = (req: Request, res: Response) => {};

export const searchUser = (req: Request, res: Response) => {};

export const searchUserIds = (req: Request, res: Response) => {};
