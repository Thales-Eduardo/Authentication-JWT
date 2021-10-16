import 'reflect-metadata';
import 'dotenv/config';

import express, { Request, Response, NextFunction } from 'express';
import 'express-async-errors';
import cors from 'cors';
import { errors } from 'celebrate';
import helmet from 'helmet';

import { rateLimiter } from './middleware/rateLimeter';

import routes from './routes';
import uploadCofig from './config/upload';

import AppErrors from './errors/AppErrors';
import './database';

const app = express();
const port = 3333;

app.use(
  cors({
    origin: process.env.APP_WEB_URL,
  })
);
app.use(helmet());
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

app.listen(port, () => {
  console.log('No ar! http://localhost:3333 🔥🔥🔥🚒🚒');
});
