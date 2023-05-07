
import User from "@/models/user.model";
import { HttpExceptionBadRequest, HttpExceptionNotFound } from "@/exceptions/HttpException";
import { ITokenPayload, generateToken } from "@/utils/jwt.utils";

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

        const isPasswordMatch = await isExist?.comparePassword(password);
        if (!isPasswordMatch) {
            new HttpExceptionBadRequest("username or password is wrong");
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