export interface ICreateOrder {
    user_id: string;
    payment_type_id: string;
    products_id: string[];
    name: string;
    total_price: number;
    total_paid: number;
    total_return: number;
}

export interface ICreaateOrderProduct {
    order_id: string;
    product_id: string;
    qty: number;
    total_price: number;
}

export interface IUpdateOrderProduct {
    qty: number;
}