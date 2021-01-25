import express from 'express';
import dotenv from 'dotenv';

import { connectDb } from './config/db';
import { errorHandler, notFound } from './middleware/errorMiddleware';
import userRoutes from './routes/userRoutes';

dotenv.config();
connectDb();

const app = express();

app.use(express.json());
app.use('/api/users', userRoutes);

app.use(notFound);
app.use(errorHandler);

app.listen(4000, () => {
  console.log('The app is listening on port 4000');
});
