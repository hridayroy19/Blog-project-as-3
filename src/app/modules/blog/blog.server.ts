/* eslint-disable @typescript-eslint/no-explicit-any */
import { IBlog } from './blog.interface';
import { Blog } from './blog.model';
import { User } from '../user/user.model';
import { JwtPayload } from 'jsonwebtoken';

const cretBlogIntoDB = async (payload: IBlog) => {
  const result = await Blog.create(payload);
  const popoletResult = await result.populate('author');
  return popoletResult;
};

//get blog and seach filter sortby sortOrders
const getBloagIntoDb = async (query: Record<string, unknown>) => {
  const { search, sortBy, sortOrder, filter } = query;

  const searchQuery: any = {};

  if (search && typeof search === 'string') {
    searchQuery.$or = [
      { title: { $regex: search, $options: 'i' } },
      { content: { $regex: search, $options: 'i' } },
    ];
  }
  if (filter) {
    searchQuery.author = filter;
  }

  const sortField: { [key: string]: 1 | -1 } = {};
  if (sortBy && typeof sortBy === 'string' && typeof sortOrder === 'string') {
    sortField[sortBy] = sortOrder.toLowerCase() === 'desc' ? -1 : 1;
  }

  const result = await Blog.find(searchQuery)
    .populate('author')
    .sort(sortField);

  return result;
};

//update blog
const updateBlogInToDB = async (id: string, payload: IBlog) => {
  const result = await Blog.findByIdAndUpdate(id, payload, {
    new: true,
  }).populate('author');
  return result;
};

const deleteBlogIntoDb = async (id: string, user: JwtPayload) => {
  const { email } = user;

  // if (!user) {
  //   throw new Error('User is not authenticated');
  // }

  const userData = await User.findOne({ email: email });
  if (userData?.role === 'admin') {
    const result = await Blog.findByIdAndDelete(id);
    return result;
  }

  const blog = await Blog.findById(id);

  if (blog?.author.toString() === userData?._id.toString()) {
    const result = await Blog.deleteOne({ author: userData?._id });
    return result;
  } else {
    throw new Error('You dont Have parmision to deleted');
  }
};

export const blogServer = {
  cretBlogIntoDB,
  getBloagIntoDb,
  updateBlogInToDB,
  deleteBlogIntoDb,
};
