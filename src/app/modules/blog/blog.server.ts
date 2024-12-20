/* eslint-disable @typescript-eslint/no-explicit-any */
import { IBlog } from './blog.interface';
import { Blog } from './blog.model';

const cretBlogIntoDB = async (payload: IBlog) => {
  const result = await Blog.create(payload);
  const popoletResult = await result.populate('author');
  return popoletResult;
};

//get blog and seach filter sortby sortOrder
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
//delete bloag

const deleteBlogIntoDb = async (id: string, userid: string) => {
  const blog = await Blog.findById(id);
  // console.log(id , 'id');
  if (!blog) {
    throw new Error("Blog not found");
  }

  if (blog.id?.author?.toString() !== userid) { 
    throw new Error("You are not authorized to delete this blog");
  }
  // console.log(blog.author)
  const result = await Blog.findByIdAndDelete(id);
  return result;
};



export const blogServer = {
  cretBlogIntoDB,
  getBloagIntoDb,
  updateBlogInToDB,
  deleteBlogIntoDb,
};
