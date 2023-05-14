import bcryptjs from "bcryptjs";

import User from "@/models/user.model";
import { IUserRegister, IUserUpdate } from "./user.dto";
import { HttpExceptionBadRequest, HttpExceptionNotFound } from "@/exceptions/HttpException";
import Role from "@/models/role.model";

import { USER_ROLE } from "@/utils/constant.utils";

class UserService {
    public registerSvc = async (idAdmin: string | undefined, user: IUserRegister): Promise<User> => {
        const { email, full_name, password, user_name, role_id, confirmation_password } = user;

        const chekEmail = await User.findOne({
            where: {
                email
            }
        });
        if (chekEmail) throw new HttpExceptionBadRequest("Email already exist");

        let passwordHash: string | undefined;
        if (password) {
            if (password !== confirmation_password) throw new HttpExceptionBadRequest("Password and confirmation password not match");
            passwordHash = bcryptjs.hashSync(password, 10);
        }

        const created = await User.create({
            email,
            full_name,
            password: passwordHash,
            user_name,
            role_id: role_id ?? USER_ROLE,
            created_by: idAdmin,
        });

        return created;
    };

    public getAllDataUserSvc = async (): Promise<User[]> => {
        const data = await User.findAll({
            attributes: {
                exclude: ["password", "deleted_at"],
                include: ["created_at"]
            },
            include: [
                {
                    model: Role,
                    as: "user_role",
                }
            ],
            // logging: true
        });

        return data;
    };

    public updateDataUserSvc = async (id: string, user: IUserUpdate): Promise<User | null> => {
        const { email, full_name, password, user_name, confirmation_password } = user;

        let passwordHash: string | undefined;
        if (password) {
            if (password !== confirmation_password) throw new HttpExceptionBadRequest("Password and confirmation password not match");
            passwordHash = bcryptjs.hashSync(password, 10);
        }

        await User.update({
            email,
            full_name,
            password: passwordHash,
            user_name,
        }, {
            where: {
                id
            }
        });

        const getData = await User.findOne({
            where: {
                id
            }
        });

        return getData;
    };

    public deleteUserSvc = async (id: string) => {
        const deleted = await User.destroy({
            where: {
                id
            }
        });

        if (!deleted) throw new HttpExceptionNotFound("User id not found");

        return deleted;
    };
}

export default UserService;