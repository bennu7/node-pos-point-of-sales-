import { Response } from "express";
import User from "@/models/user.model";
import { HttpExceptionBadRequest, HttpExceptionNotAcceptable, HttpExceptionNotFound } from "@/exceptions/HttpException";
import { ITokenPayload, generateRefreshToken, generateToken, setTokenExpired } from "@/utils/jwt.utils";
import { ADMIN_ROLE, CASHIER_ROLE } from "@/utils/constant.utils";

interface ITokenResponse {
    token: string,
    refresh_token: string
}

class AuthService {
    public login = async (user: any): Promise<ITokenResponse> => {
        const { email, password } = user;

        const isExist = await User.findOne({
            where: {
                email
            }
        });
        if (!isExist) {
            throw new HttpExceptionNotFound("Email not found");
        }
        if (isExist.role_id !== ADMIN_ROLE as string && isExist.role_id !== CASHIER_ROLE as string) {
            throw new HttpExceptionNotAcceptable("You can't access this route, just admin or cashier");
        }

        const isPasswordMatch = await isExist?.validatePassword(password);
        if (!isPasswordMatch) {
            throw new HttpExceptionBadRequest("Password is wrong");
        }

        const payload = {
            user_id: isExist.id,
            role_id: isExist.role_id
        } as ITokenPayload;

        const generateRefToken = generateRefreshToken(payload);
        await User.update({
            session_token: generateRefToken,
        }, {
            where: {
                email
            }
        });

        const token = generateToken(payload);

        return { token, refresh_token: generateRefToken };
    };

    public logout = async (userId: string, payload: ITokenPayload, res: Response): Promise<string> => {
        res.clearCookie("token");
        res.clearCookie("refresh_token");

        await User.update({
            session_token: null,
        }, {
            where: {
                id: userId
            }
        });

        const token = setTokenExpired(payload);

        return token;
    };

    public refreshToken = async (idUser: string, refreshToken: string, payload: ITokenPayload): Promise<ITokenResponse> => {
        const checkSessionToken = await User.findOne({
            where: {
                session_token: refreshToken,
                id: idUser
            }
        });

        if (!checkSessionToken) {
            await User.update({
                session_token: null,
            }, {
                where: {
                    id: idUser
                }
            });

            throw new HttpExceptionNotFound("Refresh token not found");
        }

        const payloaded = {
            ...payload,
        } as ITokenPayload;


        const refresh_token = generateRefreshToken(payloaded);
        const token = generateToken(payloaded);

        await User.update({
            session_token: refresh_token,
        }, {
            where: {
                id: idUser
            }
        });

        return { token, refresh_token };
    };
}

export default AuthService;