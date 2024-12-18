import { model, Schema } from "mongoose";
import { IBlog } from "./blog.interface";


const userSchema = new Schema<IBlog>({
    title: { type: String, required:[true, 'Name is required']},
    content: { type: String, required:[true, 'Content is required'] },
    author:{type:Schema.Types.ObjectId, 
        ref:'User',
         required:[true, 'Author is required']},
    isPublished:{type:Boolean}
  },{
    timestamps:true
  });

 export const Blog = model<IBlog>('Blog', userSchema);