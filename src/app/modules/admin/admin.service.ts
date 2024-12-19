import { Blog } from '../blog/blog.model';
import { IUser } from '../user/user.interface';
import { User } from '../user/user.model';

const blogUpdateAdminIntoDb = async (id: string, payload: IUser) => {
  console.log(id, 'id nubm');

  const result = await User.findByIdAndUpdate(id, payload, { new: true });
  return result;
};

const blogDeleteAdminIntoDb = async (id: string) => {
  const result = await Blog.findByIdAndDelete(id);
  return result;
};

export const AdminService = {
  blogUpdateAdminIntoDb,
  blogDeleteAdminIntoDb,
};
