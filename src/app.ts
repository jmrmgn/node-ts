require('dotenv').config();

import express, {
  Request,
  Response,
  NextFunction,
  RequestHandler,
} from 'express';

import todoRoutes from './routes/todos';

const PORT = process.env.PORT;
const app = express();

app.use(express.json());

app.use('/status', (req, res, next) => {
  res.json({ status: 'OK' });
});

app.use('/todos', todoRoutes);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  res.status(500).json({ message: err.message });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
