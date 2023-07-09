import { Request, Response } from 'express';
import noteModel from '../models/note.model';
import userModel from '../models/user.model';

export const getNotes = async (req: Request, res: Response) => {
	try {
		const notes = await noteModel.findAll();
		if (!notes) {
			return res.status(404).json({
				success: false,
				message: 'notes not found',
			});
		}

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

export const getNotesWithOwners = async (req: Request, res: Response) => {
	try {
		const { id } = req.params;
		const existingNote: any = await noteModel.findOne({
			where: {
				id,
			},
		});

		if (!existingNote) {
			return res.status(404).json({
				success: false,
				message: 'Note not found',
			});
		}

		const auther = await userModel.findOne({
			attributes: {
				exclude: ['password'],
			},
			where: {
				id: existingNote.userId,
			},
		});
		res.status(200).json({
			success: true,
			message: 'Note retrieved successfully',
			data: {
				note: existingNote,
				auther: auther,
			},
		});
	} catch (err) {
		console.log(err);
		res.status(500).json({
			success: false,
			message: 'Error getting notes',
			error: err,
		});
	}
};

export const addNote = async (req: Request, res: Response) => {
	try {
		const note = req.body;
		const existingUser: any = await userModel.findOne({ where: { id: note.userId } });
		console.log(existingUser);

		if (!existingUser) {
			return res.status(401).json({
				success: false,
				message: 'Unauthorized',
			});
		}

		const response = await noteModel.create(note);
		res.status(200).json({
			success: true,
			message: 'Note added successfully',
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

export const deleteNote = async (req: Request, res: Response) => {
	try {
		const { id, userId } = req.body;
		const existingNote: any = await noteModel.findOne({ where: { id } });
		if (!existingNote) {
			return res.status(404).json({
				success: false,
				message: "Note doesn't exist",
			});
		}
		if (userId !== existingNote.userId) {
			return res.status(401).json({
				success: false,
				message: 'Unauthorized',
			});
		}

		await noteModel.destroy({ where: { id, userId } });
		return res.status(200).json({
			success: true,
			message: 'Note deleted successfully',
		});
	} catch (err) {
		console.log(err);
		res.status(500).json({
			success: false,
			message: 'Error deleting note',
			error: err,
		});
	}
};

export const updateNote = async (req: Request, res: Response) => {
	try {
		const { id } = req.params;
		const { userId, data: updatedNote } = req.body;
		const existingNote: any = await noteModel.findOne({
			where: {
				id,
			},
		});
		if (!existingNote) {
			return res.status(404).json({
				success: false,
				message: 'notes not found',
			});
		}

		if (userId !== existingNote.userId) {
			return res.status(401).json({
				success: false,
				message: 'Unauthorized',
			});
		}

		await noteModel.update(updatedNote, { where: { id, userId } });
		const afterUpdate = await noteModel.findOne({ where: { id } });
		return res.status(200).json({
			success: true,
			message: 'Note updated successfully',
			data: afterUpdate,
		});
	} catch (err) {
		console.log(err);
		res.status(500).json({
			success: false,
			message: 'Error updating note',
			error: err,
		});
	}
};
