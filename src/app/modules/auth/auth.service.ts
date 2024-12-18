import { IBlog } from "../blog/blog.interface"
import { User } from "../user/user.model"


const register = async (payload: IBlog) => {
    const result = await User.create(payload)
    return result
  }

 export const authServer = {
    register
  }