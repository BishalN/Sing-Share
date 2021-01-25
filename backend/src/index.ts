import express from 'express';

const app = express();

app.get('/', (_, res) => {
  res.send('hello to the world');
});

app.listen(4000, () => {
  console.log('The app is listening on port 4000');
});
