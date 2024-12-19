import { Router } from 'express';
import { blogController } from './blog.controller';
import auth from '../../middlewares/auth';

const blogRouter = Router();

blogRouter.post('/blogs', auth('user'), blogController.cretBlog);
blogRouter.get('/blogs', auth('user'), blogController.getBloag);
blogRouter.patch('/blogs/:id', auth('user'), blogController.updateBloag);
blogRouter.delete('/blogs/:id', auth('admin'), blogController.deletBloag);

export default blogRouter;
