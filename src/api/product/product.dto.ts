import { IsArray, IsNotEmpty, IsNumber, IsOptional, IsString, IsUUID } from 'class-validator';

export interface ICreateProduct {
    name: string;
    sku: string;
    stock: number;
    price: number;
    image: string;
    category_id: string;
}
export interface IUpdateProduct {
    name: string;
    sku: string;
    stock: number;
    price: number;
    image: string;
    category_id: string;
}

export class CreateProductDTO {
    @IsString() @IsNotEmpty()
    public name: string;

    @IsString() @IsNotEmpty()
    public sku: string;

    @IsNumber() @IsNotEmpty()
    public stock: number;

    @IsNumber() @IsNotEmpty()
    public price: number;

    @IsString() @IsOptional()
    public image: string;

    @IsUUID() @IsNotEmpty()
    public category_id: string;
}

export class UpdateProductDTO {
    @IsString() @IsOptional()
    public name: string;

    @IsString() @IsOptional()
    public sku: string;

    @IsNumber() @IsOptional()
    public stock: number;

    @IsNumber() @IsOptional()
    public price: number;

    @IsString() @IsOptional()
    public image: string;

    @IsUUID() @IsOptional()
    public category_id: string;
}

export class DeletesProductDTO {
    @IsUUID() @IsArray() @IsNotEmpty()
    public ids: string;
}
export class DeleteProductDTO {
    @IsUUID() @IsNotEmpty()
    public ids: string;
}