
import { Blog } from "../blog/blog.model";

const blogDeleteAdminIntoDb =async (id:string)=>{
   
    const result = await Blog.findByIdAndDelete(id)
    return result

}

export const AdminService ={
    blogDeleteAdminIntoDb
}