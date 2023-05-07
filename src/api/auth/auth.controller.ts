import AuthService from "./auth.service";
import { Request, Response } from "express";
import expressAsyncHandler from "express-async-handler";

class AuthController {
    private authService = new AuthService();

    public login = expressAsyncHandler(async (req: Request, res: Response) => {
        const { email, password } = req.body;

        const token = await this.authService.login({
            email, password
        });

        res.status(200).json({
            message: "Login success",
            token,
        });
    });
}

export default AuthController;