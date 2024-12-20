import httpStatus from 'http-status';
import sendResponse from '../../utils/sendResponse';
import { authServer } from './auth.service';
import catchAsync from '../../utils/catchAsync';

const register = catchAsync(async (req, res) => {
  const result = await authServer.registerIntoDb(req.body);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    message: 'User registered successfully',
    data: {
      _id: result._id,
      name: result.name,
      email: result.email,
    },
  });
});

const login = catchAsync(async (req, res) => {
  const result = await authServer.loginIntoDb(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: 'Login successful',
    token: result,
  });
});

export const AuthControllers = {
  register,
  login,
};
