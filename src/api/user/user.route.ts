import { Routes } from "@/interfaces/routes.interface";
import { Router } from "express";
import UserController from "./user.controller";
import authentication from "@/middleware/authentication.middleware";

import { ADMIN_ROLE } from "@/utils/constant.utils";
import authorization from "@/middleware/authorization.middleware";
import validationMiddleware from "@/middleware/validation.middleware";
import { RegisterUserDTO, UUIDUserDTO, UpdateUserDTO } from "./user.dto";

class UserRoute implements Routes {
    public path = "/user";
    public router = Router();
    public userController = new UserController();

    constructor() {
        this.initializedRoutes();
    }

    // TODO: handle by admin
    private initializedRoutes(): void {
        this.router.post(
            `${this.path}/create`,
            authentication,
            authorization(ADMIN_ROLE as string),
            validationMiddleware(RegisterUserDTO, "body"),
            this.userController.register
        );
        this.router.get(
            `${this.path}`,
            authentication,
            authorization(ADMIN_ROLE as string),
            this.userController.getAllDataUser
        );
        this.router.put(
            `${this.path}/update/:id`,
            authentication,
            authorization(ADMIN_ROLE as string),
            validationMiddleware(UUIDUserDTO, "params"),
            validationMiddleware(UpdateUserDTO, "body"),
            this.userController.updateDataUser
        );
        this.router.delete(
            `${this.path}/delete/:id`,
            authentication,
            authorization(ADMIN_ROLE as string),
            validationMiddleware(UUIDUserDTO, "params"),
            this.userController.deleteDataUser
        );
    }
}

export default UserRoute;