/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { blogServer } from './blog.server';

const cretBlog = catchAsync(async (req, res) => {
  const payload = req.body;

  const result = await blogServer.cretBlogIntoDB(payload);
  sendResponse(res, {
    success: true,
    message: 'Blog created successfully',
    statusCode: httpStatus.CREATED,
    data: result,
  });
});

//get bloag
const getBloag = catchAsync(async (req, res) => {
  const result = await blogServer.getBloagIntoDb(req.query);

  sendResponse(res, {
    success: true,
    message: 'Blog get successfully',
    statusCode: httpStatus.OK,
    data: result,
  });
});

//update bloag
const updateBloag = catchAsync(async (req, res) => {
  // const id = req.params.id;
  // const user = req.user;
  // const payload = req.body;
  const id = req.params.id; // Blog ID
  const user = req.user?._id || req.user?.id; // User ID (ensure the user object has `_id` or `id`)
  const payload = req.body
  
  const resut = await blogServer.updateBlogInToDB(id,payload,user);
  sendResponse(res, {
    success: true,
    message: 'Blog updated successfully',
    statusCode: httpStatus.OK,
    data: resut,
  });
});

//delete bloag
const deletBloag = catchAsync(async (req, res) => {
  const id = req.params.id;
  const user = req.user;
  const result = await blogServer.deleteBlogIntoDb(id,user);
  sendResponse(res, {
    success: true,
    message: 'Blog deleted successfully',
    statusCode: httpStatus.OK,
  });
});

export const blogController = {
  cretBlog,
  getBloag,
  updateBloag,
  deletBloag,
};
