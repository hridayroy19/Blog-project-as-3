import { IUser } from './user.interface';
import { User } from './user.model';

const creatUserIntoDB = async (payload: IUser) => {
  const result = await User.create(payload);
  return result;
};

export const userServer = {
  creatUserIntoDB,
};
