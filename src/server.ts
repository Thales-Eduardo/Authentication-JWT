import 'reflect-metadata';
import 'dotenv/config';

import express, { Request, Response, NextFunction } from 'express';
import 'express-async-errors';
import cors from 'cors';
import { errors } from 'celebrate';

import { rateLimiter } from './middleware/rateLimeter';

import routes from './routes';
import uploadCofig from './config/upload';

import AppErrors from './errors/AppErrors';
import './database';

const app = express();

app.use(
  cors({
    origin: 'http://localhost:3000',
  })
);
app.use(rateLimiter);
app.use(express.json());
app.use('/files', express.static(uploadCofig.directory));
app.use(routes);

app.use(errors());

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof AppErrors) {
    return res.status(err.statusCode).json({
      status: 'error',
      message: err.message,
    });
  }

  console.error(err);

  return res.status(500).json({
    status: 'error',
    message: 'Internal server error',
  });
});

app.listen(3333, () => {
  console.log('No ar! http://localhost:3333 🔥🔥🔥🚒🚒');
});
