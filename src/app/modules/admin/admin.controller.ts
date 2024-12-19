/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { AdminService } from './admin.service';

const blogUpdateAdmin = catchAsync(async (req, res) => {
  const userId = req.params.userId;
  const body = req.body;
  const result = await AdminService.blogUpdateAdminIntoDb(userId, body);
  sendResponse(res, {
    success: true,
    message: 'User blocked successfully',
    statusCode: httpStatus.OK,
  });
});

const blogDeleteAdmin = catchAsync(async (req, res) => {
  const id = req.params.id;
  const result = await AdminService.blogDeleteAdminIntoDb(id);
  sendResponse(res, {
    success: true,
    message: 'Blog deleted successfully',
    statusCode: httpStatus.OK,
  });
});

export const AdminController = {
  blogUpdateAdmin,
  blogDeleteAdmin,
};
