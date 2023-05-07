import { IsNotEmpty, IsNumber, IsOptional, IsString, IsUUID } from 'class-validator';

export interface ICreateProduct {
    name: string;
    sku: string;
    stock: number;
    price: number;
    image: string;
    original_image: string;
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