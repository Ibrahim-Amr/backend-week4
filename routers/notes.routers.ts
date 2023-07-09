import Router from 'express';
import {
	addNote,
	deleteNote,
	getNotes,
	getNotesWithOwners,
	updateNote,
} from '../controllers/notes.controllers';

const router = Router();

router.get('/', getNotes);

router.get('/owners/:id', getNotesWithOwners);

router.post('/', addNote);

router.delete('', deleteNote);

router.patch('/:id', updateNote);

export default router;
