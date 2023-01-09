import express from 'express';
import diaryRouter from './routes/diaries';

const app = express();
app.use(express.json());

const PORT = 3000;

app.get('/ping', (_req, res) => {
  // eslint-disable-next-line no-console
  console.log('someone pinged here');
  res.send('pong');
});

app.use('/api/diaries', diaryRouter);

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Server running on port ${PORT}`);
});
