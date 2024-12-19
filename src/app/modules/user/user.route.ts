import { Router } from 'express';
import { userController } from './user.controller';
import validateRequest from '../../middlewares/validateRequest';
import { userValidation } from './userValidation';

const userRouter = Router();

userRouter.post(
  '/user/creat-user',
  validateRequest(userValidation.userValidationZod),
  userController.creatUser,
);
userRouter.post('/user/');

export default userRouter;
