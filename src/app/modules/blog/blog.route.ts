import { Router } from 'express';
import { blogController } from './blog.controller';
import auth from '../../middlewares/auth';

const blogRouter = Router();

blogRouter.post('/blogs', blogController.cretBlog);
blogRouter.get('/blogs', auth('admin'),blogController.getBloag);
blogRouter.patch('/blogs/:id', blogController.updateBloag);
blogRouter.delete('/blogs/:id', blogController.deletBloag);

export default blogRouter;
