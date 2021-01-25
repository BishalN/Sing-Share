import express from 'express';
import dotenv from 'dotenv';

import { connectDb } from './config/db';
import { errorHandler, notFound } from './middleware/errorMiddleware';

dotenv.config();
connectDb();

const app = express();

app.get('/', (_, res) => {
  res.send('hello to the world');
});

app.use(notFound);
app.use(errorHandler);

app.listen(4000, () => {
  console.log('The app is listening on port 4000');
});
