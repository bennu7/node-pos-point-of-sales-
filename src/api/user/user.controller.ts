import { Request, Response } from "express";
import expressAsyncHandler from "express-async-handler";
import { StatusCodes as STATUS } from "http-status-codes";

import UserService from "./user.service";
import { IAuthRequest } from "@/middleware/authentication.middleware";
import { IUserRegister, IUserUpdate } from "./user.dto";

class UserController {
    private userService = new UserService();

    public register = expressAsyncHandler(async (req: IAuthRequest, res: Response) => {
        const idAdmin = req.user?.id;
        const data = req.body as IUserRegister;

        const created = await this.userService.registerSvc(idAdmin, data);

        res.status(STATUS.CREATED).json({
            status_code: STATUS.CREATED,
            message: "Success created user",
            data: created
        });
    });

    public getAllDataUser = expressAsyncHandler(async (req: Request, res: Response) => {
        const data = await this.userService.getAllDataUserSvc();

        res.status(STATUS.OK).json({
            status_code: STATUS.OK,
            message: "Success get all data user",
            data: data
        });
    });

    public updateDataUser = expressAsyncHandler(async (req: IAuthRequest, res: Response) => {
        const data: IUserUpdate = req.body;
        const id = req.params.id;

        const updated = await this.userService.updateDataUserSvc(id, data);

        res.status(STATUS.OK).json({
            status_code: STATUS.OK,
            message: "Success update data user",
            data: updated
        });
    });

    public deleteDataUser = expressAsyncHandler(async (req: IAuthRequest, res: Response) => {
        const id = req.params.id;

        await this.userService.deleteUserSvc(id);

        res.status(STATUS.OK).json({
            status_code: STATUS.OK,
            message: "Success delete data user",
        });
    });
}

export default UserController;