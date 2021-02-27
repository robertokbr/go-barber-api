import 'reflect-metadata';
import express, { Request, Response, NextFunction } from 'express';
import 'express-async-errors';
import cors from 'cors';

import routes from '@shared/infra/http/routes';
import AppError from '@shared/errors/AppError';
import uploadConfig from '@config/upload';
import '@shared/infra/typeorm';
import '@shared/container';

const app = express();
const PORT = process.env.PORT || 3333;

app.use(cors());
app.use(express.json());
app.use('/files', express.static(uploadConfig.uploadFolder));
app.use(routes);

app.use((err: Error, request: Request, response: Response, _: NextFunction) => {
  if (err instanceof AppError) {
    return response.status(err.statusCode).json({
      status: 'error',
      message: err.message,
    });
  }

  return response.status(500).json({
    status: 'error',
    message: 'Internal Server error',
  });
});

app.listen(PORT, () => {
  console.log(`server connected on port ${PORT} 🚪`);
});
