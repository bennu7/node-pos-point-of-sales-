import jwt from "jsonwebtoken";
import { JWT_SECRET_KEY } from "./constant.utils";

export interface ITokenPayload {
    user_id: string;
    role_id?: string;
    iat?: number;
    exp?: number;
}

export const generateToken = (payload: ITokenPayload): string => {
    return jwt.sign(
        payload,
        JWT_SECRET_KEY as string,
        { expiresIn: "1d" }
    );
};

export const verifyToken = (token: string): ITokenPayload => {
    const paylod = jwt.verify(token, JWT_SECRET_KEY as string) as ITokenPayload;
    return paylod;
};