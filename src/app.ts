import express, { Application } from 'express';
import cors from 'cors';
import userRouter from './app/modules/user/user.route';
import blogRouter from './app/modules/blog/blog.route';
import { notFound } from './app/middlewares/notFound';
import authRouter from './app/modules/auth/auth.router';
const app: Application = express();

//parsers
app.use(express.json());
app.use(cors());

// application routes
app.use('/api/auth',authRouter);
app.use('/api', userRouter);
app.use('/api', blogRouter);




app.get('/', (req, res) => {
  res.send('Bloge Server is Running🏃🏿‍♂️‍➡️!');
});

 app.use(notFound)

export default app;
