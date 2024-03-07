import express from 'express';
import cors from 'cors';
import { setupUserRouter } from '../routes/userRouter';

const app = express();
app.use(express.json());
app.use(cors());

setupUserRouter(app);

app.get('/api', (req, res) => {
  res.send('Hello World');
});

export { app };
