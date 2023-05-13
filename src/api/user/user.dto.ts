import {
    IsString,
    IsEmail,
    IsStrongPassword,
    IsNotEmpty,
    IsOptional,
    IsUUID,
} from "class-validator";

export interface IUserRegister {
    email: string;
    full_name: string;
    user_name?: string;
    role_id?: string;
    confirmation_password?: string;
    password?: string;
}

export interface IUserUpdate {
    email?: string;
    full_name?: string;
    user_name?: string;
    role_id?: string;
    confirmation_password?: string;
    password?: string;
}

export class RegisterUserDTO {
    @IsString() @IsNotEmpty()
    public full_name: string;

    @IsString() @IsOptional()
    public user_name: string;

    @IsEmail() @IsNotEmpty()
    public email: string;

    @IsOptional() @IsUUID()
    public role_id: string;

    @IsString() @IsOptional()
    @IsStrongPassword({ minLength: 6, minNumbers: 1, minUppercase: 1, minSymbols: 0, minLowercase: 0 })
    public password: string;

    @IsString() @IsOptional()
    @IsStrongPassword({ minLength: 6, minNumbers: 1, minUppercase: 1, minSymbols: 0, minLowercase: 0 })
    public confirmation_password: string;
}

export class UpdateUserDTO {
    @IsString() @IsOptional()
    public full_name: string;

    @IsString() @IsOptional()
    public user_name: string;

    @IsEmail() @IsOptional()
    public email: string;

    @IsEmail() @IsOptional()
    public role_id: string;

    @IsString() @IsOptional()
    @IsStrongPassword({ minLength: 6, minNumbers: 1, minUppercase: 1, minSymbols: 0, minLowercase: 0 })
    public password: string;
}

export class UUIDUserDTO {
    @IsString() @IsUUID() @IsNotEmpty()
    public id: string;
}