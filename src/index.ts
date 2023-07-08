import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import usersRoutes from './../routers/users.routers';
import notesRoutes from './../routers/notes.routers';
import dbConnection from '../database/dbConnectin';

dotenv.config();
const app = express();
const port = process.env.PORT || 8081;

app.use(express.json());
app.use(cors());
app.use('/api/users', usersRoutes);
app.use('/api/notes', notesRoutes);

app.all('*', (req: Request, res: Response) =>
	res.send("You've tried reaching a route that doesn't exist.")
);

app.listen(port, () => {
	console.info(`server running on http://localhost:${port}`);
});

(async () => {
	try {
		await dbConnection.authenticate();
		console.info('Connection has been established successfully.');
	} catch (error) {
		console.error('Unable to connect to the database:', error);
	}
})();
