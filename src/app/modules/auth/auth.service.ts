import { IBlog } from '../blog/blog.interface';
import { User } from '../user/user.model';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const registerIntoDb = async (payload: IBlog) => {
  const result = await User.create(payload);
  return result;
};

const loginIntoDb = async (payload: { email: string; password: string }) => {
  const user = await User.findOne({ email: payload?.email }).select('+password');

  if (!user) {
    throw new Error('user is not found');
  }

  if (user.isBlocked === true) {
    throw new Error('User is blocked');
  }

  const isPasswordMatched = await bcrypt.compare(
    payload?.password,
    user?.password,
  );
  if (!isPasswordMatched) {
    throw new Error('Wrong password !! Try again');
  }

  // create token and sent to the  client
  const jwtPayload = {
    email: user?.email,
    role: user?.role
  }

  const token = jwt.sign(jwtPayload, "secrect", { expiresIn: "1d" })
  return token;
};

export const authServer = {
  registerIntoDb,
  loginIntoDb,
};
