import { IBlog } from "./blog.interface";
import { Blog } from "./blog.model";


const cretBlogIntoDB = async(payload:IBlog)=>{
    const result = await Blog.create(payload)
    const popoletResult = await result.populate('author')
    return popoletResult
}


//update blog
const updateBlogInToDB = async(id:string, payload:IBlog )=>{
   const result = await Blog.findByIdAndUpdate(id,payload,{new:true})
   return result

}
//delete bloag
const deleteBlogIntoDb = async(id:string)=>{
    const result = await Blog.findByIdAndDelete(id)
    return result
}


export const blogServer ={
    cretBlogIntoDB,
    updateBlogInToDB,
    deleteBlogIntoDb
}