import { NextFunction, Request, Response } from "express"
import httpStatus from "http-status"

// eslint-disable-next-line no-unused-vars
export const notFound = (req:Request,  res:Response, _next: NextFunction )=>{
 return res.status(httpStatus.NOT_FOUND).json({
  status:false,
  message:'API Not Found !!',
  error: ''
 })
}