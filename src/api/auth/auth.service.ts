import User from "@/models/user.model";
import { HttpExceptionBadRequest, HttpExceptionNotAcceptable, HttpExceptionNotFound } from "@/exceptions/HttpException";
import { ITokenPayload, generateToken } from "@/utils/jwt.utils";
import { ADMIN_ROLE, CASHIER_ROLE } from "@/utils/constant.utils";

class AuthService {
    public login = async (user: any): Promise<any> => {
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
        const token = generateToken(payload);

        return token;
    };

    // public logout = async (): Promise<any> => { 

    // };
}

export default AuthService;