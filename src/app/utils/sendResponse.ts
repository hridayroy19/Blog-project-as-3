import { Response } from "express";

type TResponse<T>={
    success?:boolean,
    message:string,
    statusCode:number,
    token?:string,
    data?: T | T[] | null
}

const sendResponse = <T>(res: Response, data:TResponse<T>) => {
    res.status(data.statusCode).json({
      success: true,
      message: data.message,
      statusCode: data.statusCode,
      token:data.token,
      data: data.data,
    })
  }

  export default sendResponse;