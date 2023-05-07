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
    confirmation_password?: string;
    password?: string;
}

export interface IUserUpdate {
    email: string;
    full_name: string;
    user_name?: string;
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

    @IsString() @IsOptional() @IsStrongPassword()
    public password: string;

    @IsString() @IsOptional()
    public confirmation_password: string;
}

export class UpdateUserDTO {
    @IsString() @IsOptional()
    public full_name: string;

    @IsString() @IsOptional()
    public user_name: string;

    @IsEmail() @IsOptional()
    public email: string;

    @IsString() @IsOptional()
    public password: string;
}

export class UUIDUserDTO {
    @IsString() @IsUUID() @IsNotEmpty()
    public id: string;
}