import { Router } from "express";
import authentication from "@/middleware/authentication.middleware";
import authorization from "@/middleware/authorization.middleware";
import { Routes } from "@/interfaces/routes.interface";
import AuthController from "./auth.controller";
import { ADMIN_ROLE, CASHIER_ROLE } from "@/utils/constant.utils";

class AuthRoute implements Routes {
    public path = "/auth";
    public router = Router();
    public authController = new AuthController();

    constructor() {
        this.initializedRoutes();
    }


    private initializedRoutes(): void {
        this.router.post(
            `${this.path}/login`,
            this.authController.login
        );
        this.router.post(
            `${this.path}/logout`,
            authentication,
            authorization([ADMIN_ROLE, CASHIER_ROLE]),
            this.authController.logout
        );
        this.router.post(
            `${this.path}/refresh-token`,
            authentication,
            authorization([ADMIN_ROLE, CASHIER_ROLE]),
            this.authController.refreshToken
        );
    }
}

export default AuthRoute;