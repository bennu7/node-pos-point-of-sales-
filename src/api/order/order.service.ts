import randomString from "randomstring";
import { v4 as UUIDv4 } from "uuid";

import { ICreaateOrderProduct, ICreateOrder, IUpdateOrderProduct } from "./order.dto";
import Order from "@/models/order.model";
import OrderProduct from "@/models/order_product.model";
import Product from "@/models/product.model";
import { HttpExceptionNotFound } from "@/exceptions/HttpException";

class OrderService {
    public async getOrders(): Promise<Order[]> {
        const data = await Order.findAll();

        return data;
    }

    public async createOrderProduct(orderProduct: ICreaateOrderProduct): Promise<OrderProduct> {
        const orderId = UUIDv4();
        const { product_id, qty } = orderProduct;

        const dataProduct = await Product.findOne({
            where: {
                id: product_id
            }
        });
        if (!dataProduct) {
            throw new HttpExceptionNotFound("Product id not found");
        }

        OrderProduct.beforeCreate(async () => {
            await Order.create({
                id: orderId,
            });
        });

        const totalPrice = dataProduct?.price * qty;

        const createdProduct = OrderProduct.create({
            order_id: orderId,
            product_id,
            qty,
            total_price: totalPrice
        });

        return createdProduct;
    }

    public async updateQtyOrderProduct(id: string, orderProduct: IUpdateOrderProduct): Promise<OrderProduct | null> {
        const { qty } = orderProduct;

        const findDataOrderProduct = await OrderProduct.findOne({
            where: {
                id
            }
        });

        if (!findDataOrderProduct) {
            throw new HttpExceptionNotFound("Order product id not found");
        }

        const findDataProduct = await Product.findOne({
            where: {
                id: findDataOrderProduct.product_id
            }
        });
        if (!findDataProduct) {
            throw new HttpExceptionNotFound("Product id not found");
        }

        const totalPrice = qty * findDataProduct?.price;
        await OrderProduct.update({
            qty,
            total_price: totalPrice
        }, {
            where: {
                id
            }
        });

        const data = await OrderProduct.findOne({
            where: {
                id
            }
        });

        return data;
    }
}

export default OrderService;