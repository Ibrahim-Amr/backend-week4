import {
	deleteUser,
	getUsers,
	searchUser,
	searchUserIds,
	signIn,
	signUp,
	updateUser,
} from './../controllers/users.controllers';
import Router from 'express';

const router = Router();

router.get('/', getUsers);

router.post('/signup', signUp);

router.post('/signin', signIn);

router.patch('/update/:id', updateUser);

router.delete('/:id', deleteUser);

router.get('/search', searchUser);

router.post('/searchids', searchUserIds);

export default router;
