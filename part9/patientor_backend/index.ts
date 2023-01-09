import express from 'express';

const app = express();
app.use(express.json());

const PORT = 3001;

app.get('/api/ping', (_req, res) => {
  // eslint-disable-next-line no-console
  console.log('pinged');
  res.send('pong');
});

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Server running on ${PORT}`);
});
