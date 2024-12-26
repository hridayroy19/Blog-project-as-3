 
import { IBlog } from './blog.interface';
import { Blog } from './blog.model';
import { User } from '../user/user.model';
import { JwtPayload } from 'jsonwebtoken';
import QueryBilder from '../../builder/query';



const cretBlogIntoDB = async (payload: IBlog) => {
  const result = await Blog.create(payload);
  const popoletResult = await result.populate('author');
  return popoletResult;
};

//get blog and seach filter sortby sortOrders
const getBloagIntoDb = async (query: Record<string, unknown>) => {

 const searchableField = ['title' , 'content'];
 const blog = new QueryBilder(Blog.find().populate('author'), query)
   .search(searchableField).filter().sortBy();
  
   const result = await blog.modelquery;
   return result

};


const updateBlogInToDB = async (
  blogId: string, 
  payload: IBlog, 
  user: JwtPayload
) => {

  const { id } = user;
  const userData = await User.findById(id); 
  const blog = await Blog.findById(id).populate('author'); 

  if (blog?.author.toString() === userData?.id.toString()) {
   
    const result = await Blog.findByIdAndUpdate(
      blogId,
      { $set: payload }, 
      { new: true } 
    ).populate('author');
    
    return result;
  } else {
    throw new Error('You do not have permission to update this blog.');
  }
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
