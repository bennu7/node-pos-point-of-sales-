import { apiResponse } from '@/utils/apiResponse.utils';
import { Request, Response, NextFunction } from 'express';
import { StatusCodes as STATUS } from "http-status-codes";
import { json } from 'sequelize';
interface IError {
    code: number;
    status: string;
    message: string;
    name?: string;
    original?: string;
    parent?: IErrorParent;
}
interface IErrorParent {
    code: string;
    detail: string;
}

const errorMiddleware = async (
    err: IError,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        console.log("🪓🪓  ERROR.PARENT ->", err.parent + " <- 🪓🪓");
        console.log("😡😡 error :", err);

        // Sequelize error handler
        if (err?.parent?.code) {
            switch (err.parent.code) {
                case "22P02": {
                    const message = "Invalid type of data.";
                    return res.status(STATUS.BAD_REQUEST).json(apiResponse(STATUS.BAD_REQUEST, "BAD_REQUEST", message));
                }
                case "42703": {
                    const message = "Something went wrong.";
                    return res
                        .status(STATUS.INTERNAL_SERVER_ERROR)
                        .json(apiResponse(STATUS.INTERNAL_SERVER_ERROR, "INTERNAL_SERVER_ERROR", message));
                }
                case "23505": {
                    const message = err.parent.detail;
                    return res.status(STATUS.CONFLICT).json(apiResponse(STATUS.CONFLICT, "CONFLICT", message));
                }
            }
        }

        // jwt error handler
        if (err.name)
            switch (err.name) {
                case "JsonWebTokenError": {
                    const message = "Invalid or Expired token. Please login again.";
                    return res
                        .status(STATUS.UNAUTHORIZED)
                        .json(apiResponse(STATUS.UNAUTHORIZED, "UNAUTHORIZED", message));
                }
                case "TokenExpiredError": {
                    const message = "Invalid or Expired Token. Please login again.";
                    return res
                        .status(STATUS.UNAUTHORIZED)
                        .json(apiResponse(STATUS.UNAUTHORIZED, "UNAUTHORIZED", message));
                }
            }

        return res.status(err.code).json(apiResponse(err.code, err.status, err.message));
    } catch (err) {
        next(err);
    }
};

export default errorMiddleware;