/* eslint-disable no-unused-vars */
import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import mongoose from "mongoose";

// eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any
export const globalErrorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {

    if (err instanceof mongoose.Error.CastError) {
        res.status(httpStatus.BAD_REQUEST)
            .json({ success: false, message: err.message, error: err })
    }
    else if (err instanceof mongoose.Error.ValidationError) {
        res.status(httpStatus.BAD_REQUEST)
            .json({ success: false, message: err.message, error: err })
    }
    else if (err.code && err.code === 11000) {
        res.status(httpStatus.BAD_REQUEST)
            .json({ success: false, message: err.errorResponse.errmsg, error: err })
    }
    else if (err instanceof Error) {
        res.status(httpStatus.INTERNAL_SERVER_ERROR)
            .json({ success: false, name: err.name, message: `Any error ${err.message}`, error: err })
    }
} 