/* eslint-disable @typescript-eslint/no-unused-vars */
 
/* eslint-disable no-unused-vars */

import express, { Application, NextFunction, Request, Response } from 'express';
import cors from 'cors';
import userRouter from './app/modules/user/user.route';
import blogRouter from './app/modules/blog/blog.route';
import authRouter from './app/modules/auth/auth.router';
import adminRoute from './app/modules/admin/admin.route';
import httpStatus from 'http-status';
import { globalErrorHandler } from './app/middlewares/globalErrorHandler';
const app: Application = express();

//parsers
app.use(express.json());
app.use(cors());

// application routes
app.use('/api/auth', authRouter);
app.use('/api/admin', adminRoute);
app.use('/api', userRouter);
app.use('/api', blogRouter);

app.get('/', (req, res) => {
  res.send('Bloge Server is Running🏃🏿‍♂️‍➡️!');
});

//golbal Error handler
app.use(globalErrorHandler);

//not found
app.use('*', (req: Request, res: Response) => {
  res.status(400).json({
    status: httpStatus.NOT_FOUND,
    message: 'Route Not Found',
  });
});

export default app;
