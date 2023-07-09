import { Request, Response } from 'express';
import noteModel from '../models/note.model';

export const getNotes = async (req: Request, res: Response) => {
	try {
		const notes = await noteModel.findAll();
		res.status(200).json({
			success: true,
			message: 'Notes retrieved successfully',
			data: notes,
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

export const getNotesWithOwners = (req: Request, res: Response) => {};

export const addNote = async (req: Request, res: Response) => {
	try {
		const note = req.body;
		const response = await noteModel.create(note);

		res.status(200).json({
			success: true,
			message: 'Notes added successfully',
			data: response,
		});
	} catch (err) {
		console.log(err);
		res.status(500).json({
			success: false,
			message: 'Error adding notes',
			error: err,
		});
	}
};

export const deleteNote = (req: Request, res: Response) => {};

export const updateNote = (req: Request, res: Response) => {};
