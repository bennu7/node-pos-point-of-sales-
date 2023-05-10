import { Request } from "express";
import { JWT } from "./user.interface";

export interface AuthenticateRequest extends Request {
    user?: JWT
}
