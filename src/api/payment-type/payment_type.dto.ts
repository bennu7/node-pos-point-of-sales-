import { IsString, IsNotEmpty, IsOptional, IsUUID } from "class-validator";

export interface ICreatePayment {
    name: string;
    type: string;
    logo: string;
}

export interface IUpdatePayment {
    name: string;
    type: string;
    logo: string;
}

export class CreatePaymentDTO {
    @IsString() @IsNotEmpty()
    public name: string;

    @IsString() @IsNotEmpty()
    public type: string;

    @IsString() @IsOptional()
    public logo: string;
}

export class UpdatePaymentDTO {
    @IsString() @IsOptional()
    public name: string;

    @IsString() @IsOptional()
    public type: string;

    @IsString() @IsOptional()
    public logo: string;
}

export class ParamsUuidDTO {
    @IsUUID() @IsNotEmpty()
    public id: string;
}