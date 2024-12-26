import { Router } from 'express';
import { blogController } from './blog.controller';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { blogValidation } from './blogValidation';

const blogRouter = Router();

blogRouter.post(
  '/blogs',
  validateRequest(blogValidation.blogValidationByZod),
  auth(['user']),
  blogController.cretBlog,
);

blogRouter.get('/blogs', blogController.getBloag);
blogRouter.patch('/blogs/:id', auth(['user']), blogController.updateBloag);
blogRouter.delete('/blogs/:id',auth(['user', 'admin']),blogController.deletBloag,
);

export default blogRouter;
