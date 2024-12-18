import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { userServer } from "./user.server";

const creatUser = catchAsync(async(req , res)=>{
    
    const payload = req.body
    const result = await userServer.creatUserIntoDB(payload)
    sendResponse(res,
        {statusCode:httpStatus.CREATED,
            message:"user creat successfuly",
            data:result
        })
})


export const userController ={
    creatUser  
}