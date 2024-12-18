import { IBlog } from './blog.interface';
import { Blog } from './blog.model';

const cretBlogIntoDB = async (payload: IBlog) => {
  const result = await Blog.create(payload);
  const popoletResult = await result.populate('author');
  return popoletResult;
};
//getAll Bloag
const getBloagIntoDb = async (query: Record<string, unknown>) => {
  const queryParams = { ...query };
  console.log(queryParams);

  const excludingImportant = [
    'searchTerm',
    'page',
    'limit',
    'sortOrder',
    'sortBy',
    'fields',
  ];

  excludingImportant.forEach((key) => delete queryParams[key]);
  // console.log(queryParams);

  const searchTerm = query?.searchTerm || '';
  // console.log(searchTerm);
  const searchableFields = ['title'];

  const searchQuery = Blog.find({
    $or: searchableFields.map((field) => ({
      [field]: { $regex: searchTerm, $options: 'i' },
    })),
  });

  const result = await searchQuery.find(queryParams);

  return result;
};

//update blog
const updateBlogInToDB = async (id: string, payload: IBlog) => {
  const result = await Blog.findByIdAndUpdate(id, payload, { new: true });
  return result;
};
//delete bloag
const deleteBlogIntoDb = async (id: string) => {
  const result = await Blog.findByIdAndDelete(id);
  return result;
};

export const blogServer = {
  cretBlogIntoDB,
  getBloagIntoDb,
  updateBlogInToDB,
  deleteBlogIntoDb,
};
