import { Routes } from "@/interfaces/routes.interface";
import { Router } from "express";
import AuthController from "./auth.controller";

class AuthRoute implements Routes {
    public path = "/auth";
    public router = Router();
    public authController = new AuthController();

    constructor() {
        this.initializedRoutes();
    }


    private initializedRoutes(): void {
        this.router.post(`${this.path}/login`, this.authController.login);
        //TODO: add for logout
    }
}

export default AuthRoute;