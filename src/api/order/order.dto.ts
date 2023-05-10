import { IsNotEmpty, IsNumber, IsString, IsUUID } from "class-validator";

export interface ICreateOrder {
    payment_type_id: string;
    name: string;
    total_price: number;
    total_paid: number;
    total_return: number;
}

export interface ICreaateOrderProduct {
    user_id: string;
    product_id: string;
    qty: number;
}

export interface IUpdateOrderProduct {
    qty: number;
}

export interface IUpdatePaymentOrder {
    payment_type_id: string;
    name: string;
    total_paid: number;
}

export interface IReturnDeletedOrder {
    order: number;
    order_product: number;
}

// routing order
export class UpdateForPaymentOrderDTO {
    @IsUUID() @IsNotEmpty()
    public payment_type_id: string;

    @IsString() @IsNotEmpty()
    public name: string;

    @IsNumber() @IsNotEmpty()
    public total_paid: number;
}


// routing order-product
export class CreateOrderProductDTO {
    @IsUUID() @IsNotEmpty()
    public user_id: string;

    @IsUUID() @IsNotEmpty()
    public product_id: string;

    @IsNumber() @IsNotEmpty()
    public qty: string;
}

export class UpdateOrderProductDTO {
    @IsNumber() @IsNotEmpty()
    public qty: number;
}

export class IsUUIDDTO {
    @IsUUID() @IsNotEmpty()
    public id: string;
}