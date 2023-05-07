import { Response, NextFunction, Request } from "express";

import { HttpExceptionForbidden } from "@/exceptions/HttpException";
import { ADMIN_ROLE, CASHIER_ROLE } from "@/utils/constant.utils";

export interface IAuthenticationRequest extends Request {
    user?: {
        user_id?: string;
        role_id?: string;
    }
}

const authorization = (role: string) => {
    return (req: IAuthenticationRequest, res: Response, next: NextFunction) => {
        const user = req.user;
        if (!user) throw new HttpExceptionForbidden("sorry u not have access to this route");

        if (role || req.user?.role_id === ADMIN_ROLE) return next();

        if (role || req.user?.role_id === CASHIER_ROLE) return next();
    };
};

export default authorization;