import expressAsyncHandler from "express-async-handler";
import { Response, NextFunction, Request } from "express";

import { HttpExceptionUnauthorize } from "@/exceptions/HttpException";
import { ITokenPayload, verifyToken } from "@/utils/jwt.utils";

export interface IAuthRequest extends Request {
    user?: {
        id?: string;
        role_id?: string;
    }
}

const authentication = expressAsyncHandler((req: IAuthRequest, res: Response, next: NextFunction) => {
    const bearerHeader = req.headers.authorization; // *alternative can use req.headers['Authorization']
    if (!bearerHeader) throw new HttpExceptionUnauthorize("Token Authorization not found");

    const token = bearerHeader.split(" ")[1];
    if (!token) throw new HttpExceptionUnauthorize("Unauthorized, please login again to countinue");
    const decodedToken: ITokenPayload | null = verifyToken(token);

    req.user = {
        id: decodedToken.user_id,
        role_id: decodedToken.role_id
    };

    next();
});

export default authentication;