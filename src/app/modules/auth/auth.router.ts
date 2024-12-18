import { Router } from 'express';
import { AuthControllers } from './auth.controller';
// import validateRequest from '../../middlewares/validateRequest';
// import { AuthValidationSchema } from './auth.vallidation';

const authRouter = Router();

authRouter.post('/register', AuthControllers.register);
authRouter.post(
  '/login',AuthControllers.login,
);

export default authRouter;
