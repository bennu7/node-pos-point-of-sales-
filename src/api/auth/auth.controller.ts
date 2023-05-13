import { IAuthRequest } from "@/middleware/authentication.middleware";
import AuthService from "./auth.service";
import { Request, Response } from "express";
import expressAsyncHandler from "express-async-handler";
import { apiResponse } from "@/utils/apiResponse.utils";
import { ITokenPayload } from "@/utils/jwt.utils";
import { StatusCodes as STATUS } from "http-status-codes";

class AuthController {
    private authService = new AuthService();

    public login = expressAsyncHandler(async (req: Request, res: Response) => {
        const { email, password } = req.body;

        const { token, refresh_token } = await this.authService.login({
            email, password
        });

        res.status(200).cookie("token", token, {
            httpOnly: true,
            maxAge: 1000 * 60 * 60 * 24 * 1, // 1 day
            // secure: true, // ? set secure true for production because it's using https not http like localhost
            expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 1), // 1 week
        })
            .cookie("refresh_token", refresh_token, {
                httpOnly: true,
                maxAge: 1000 * 60 * 60 * 24 * 7, // 1 week
                // secure: true,
                expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7), // 1 week
            })
            .json(apiResponse(200, "Success login", { token, refresh_token }));
    });

    public logout = expressAsyncHandler(async (req: IAuthRequest, res: Response) => {
        const userId = req.user?.id;
        const payload = req.user as ITokenPayload;

        const token = await this.authService.logout(userId as string, payload, res);

        res.status(STATUS.OK)
            .json(apiResponse(STATUS.OK, "SUCCESS LOGOUT", { token }));
    });

    public refreshToken = expressAsyncHandler(async (req: IAuthRequest, res: Response) => {
        const { refresh_token } = req.cookies;
        const idUser = req.user?.id;
        const payload = req.user as ITokenPayload;

        const responseToken = await this.authService.refreshToken(idUser as string, refresh_token, payload);
        const new_refresh_token = responseToken.refresh_token;
        const token = responseToken.token;

        res.status(STATUS.OK).cookie("token", token, {
            httpOnly: true,
            maxAge: 1000 * 60 * 60 * 24 * 1, // 1 day
            // secure: true,
            expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 1), // 1 week
        })
            .cookie("refresh_token", new_refresh_token, {
                httpOnly: true,
                maxAge: 1000 * 60 * 60 * 24 * 7, // 1 week
                // secure: true,
                expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7), // 1 week
            }).json(apiResponse(STATUS.OK, "Success refresh token", { token, new_refresh_token }));

    });

}

export default AuthController;