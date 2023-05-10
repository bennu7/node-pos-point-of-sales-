import { Response, NextFunction, Request } from "express";

import { HttpExceptionForbidden } from "@/exceptions/HttpException";
import { ADMIN_ROLE, CASHIER_ROLE } from "@/utils/constant.utils";

export interface IAuthenticationRequest extends Request {
    user?: {
        user_id?: string;
        role_id?: string;
    }
}

const authorization = (ROLE: any) => {
    return (req: IAuthenticationRequest, res: Response, next: NextFunction) => {
        const user = req.user;

        if (!Array.isArray(ROLE)) {
            if (user?.role_id === ROLE || user?.role_id === ADMIN_ROLE) return next();

            if (!user || user.role_id !== ROLE) throw new HttpExceptionForbidden("sorry u not have access to this route");

        } else if (Array.isArray(ROLE)) {
            // if (!ROLE.includes(user?.role_id)) throw new HttpExceptionForbidden("sorry u not have access to this route");
            if (!ROLE.includes(ADMIN_ROLE || CASHIER_ROLE)) throw new HttpExceptionForbidden("sorry u not have access to this route");
        }
        next();
    };
};

export default authorization;