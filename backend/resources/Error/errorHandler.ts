import { ErrorRequestHandler, Request, Response, NextFunction } from "express"
import { CustomError } from "./types.ts";

export const errorHandler: ErrorRequestHandler = (error: CustomError, req: Request, res: Response, next: NextFunction) => {
    error.statusCode = error.statusCode || 500;
    error.status = error.status || "An unexpected error occurred";

    res.status(error.statusCode).json({
        status: error.statusCode,
        message: error.message,
        error: error.name
    })
}
