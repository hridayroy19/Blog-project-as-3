import { Router } from 'express';
import { userController } from './user.controller';

const userRouter = Router();

userRouter.post('/user/creat-user', userController.creatUser);
userRouter.post('/user/');

export default userRouter;
