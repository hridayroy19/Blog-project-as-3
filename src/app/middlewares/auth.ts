import jwt, { JwtPayload }  from 'jsonwebtoken';
import catchAsync from "../utils/catchAsync"
import { User } from '../modules/user/user.model';

const auth = ( requireRoles:string)=>{
    return catchAsync(async(req , res , next)=>{
        const token = req.headers.authorization;

        if(!token){
            throw new Error("User not authorized");
        }

      const decoded = jwt.verify(token, 'secrect') as JwtPayload
      console.log(decoded);

      const { role , email} = decoded;

      const user = await User.findOne({email})

      if(!user){
        throw new Error("this user not found")
      }

       const userStatus = user.isBlocked
       if(userStatus === true){
        throw new Error('this user blocked')
       }

       if(requireRoles !== role){
        throw new Error('You are not Authorized')
       } 
       req.user = decoded as JwtPayload;
       next()

    })
}

export default auth;