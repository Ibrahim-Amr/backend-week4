import { Request, Response } from 'express';

export const getUsers = (req: Request, res: Response) => {
	res.json({ message: 'hello' });
};

export const signUp = (req: Request, res: Response) => {};

export const signIn = (req: Request, res: Response) => {};

export const updateUser = (req: Request, res: Response) => {};

export const deleteUser = (req: Request, res: Response) => {};

export const searchUser = (req: Request, res: Response) => {};

export const searchUserIds = (req: Request, res: Response) => {};
