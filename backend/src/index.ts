import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

import { connectDb } from './config/db';
import { errorHandler, notFound } from './middleware/errorMiddleware';
import userRoutes from './routes/userRoutes';
import recordingRoutes from './routes/recordingRoutes';
import path from 'path';

dotenv.config();
connectDb();

const app = express();

app.use(cors());

export const uploadDir = path.join(__dirname, '../uploads');

app.use(express.json());
app.use('/api/users', userRoutes);
app.use('/api/recordings', recordingRoutes);

app.use(notFound);
app.use(errorHandler);

app.listen(process.env.PORT || 4000, () => {
  console.log('The app is listening on port 4000');
});
