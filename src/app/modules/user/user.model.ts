import { model, Schema } from "mongoose";
import { IUser } from "./user.interface";

const userSchema = new Schema<IUser>({
    name: { type: String, required:[true, 'Name is required'] },
    email: { type: String, required:[true, 'Email is required'], unique:true },
    password:{type:String, required:[true, 'Password is required']},
    role:{type:String, required:true ,
        enum:['user','admin']
     },
    status:{type:String , enum:['in-progress' , 'blocked'],
        default:'in-progress'
    }
  },{
    timestamps:true
  });

 export const User = model<IUser>('User', userSchema);

