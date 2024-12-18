import { Router } from 'express';
import { blogController } from './blog.controller';

const blogRouter = Router();

blogRouter.post('/blogs', blogController.cretBlog);
blogRouter.get('/blogs', blogController.getBloag);
blogRouter.patch('/blogs/:id', blogController.updateBloag);
blogRouter.delete('/blogs/:id', blogController.deletBloag);

export default blogRouter;
