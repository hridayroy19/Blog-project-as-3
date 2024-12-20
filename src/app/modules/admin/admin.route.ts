import { Router } from 'express';
import { AdminController } from './admin.controller';
import auth from '../../middlewares/auth';

const adminRoute = Router();

adminRoute.patch(
  '/users/:userId/block',
  auth(['admin']),
  AdminController.blogUpdateAdmin,
);
adminRoute.delete(
  '/blogs/:id',
  auth(['admin']),
  AdminController.blogDeleteAdmin,
);

export default adminRoute;
