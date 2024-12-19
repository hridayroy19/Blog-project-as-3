/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { AdminService } from "./admin.service";


const blogDeleteAdmin = catchAsync(async(req , res)=>{

    const id =req.params.id;
    const result = await AdminService.blogDeleteAdminIntoDb(id)
    sendResponse(res, {
        success: true,
        message: "Blog deleted successfully",
        statusCode: httpStatus.OK,
      });
})

export const AdminController = {
    blogDeleteAdmin
}