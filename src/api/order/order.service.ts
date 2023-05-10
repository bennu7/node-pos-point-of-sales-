import randomString from "randomstring";
import { v4 as UUIDv4 } from "uuid";

import { HttpExceptionNotFound } from "@/exceptions/HttpException";
import User from "@/models/user.model";
import Order from "@/models/order.model";
import OrderProduct from "@/models/order_product.model";
import Product from "@/models/product.model";

import TRANSACTION from "@/utils/transaction.utils";

import {
    ICreaateOrderProduct,
    IReturnDeletedOrder,
    IUpdateOrderProduct,
    IUpdatePaymentOrder
} from "./order.dto";
import Payment from "@/models/payment.model";

class OrderService {
    public async getOrders(): Promise<Order[]> {
        const data = await Order.findAll({
            include: {
                model: OrderProduct,
                as: "order_products",
            }
        });

        return data;
    }

    public async updateForPaymentOrder(id: string, order: IUpdatePaymentOrder): Promise<Order | null> {
        const { payment_type_id, total_paid } = order;

        const findOrder = await Order.findOne({
            where: {
                id,
                status: "BUYING"
            }
        });
        if (!findOrder) throw new HttpExceptionNotFound("Order id not found");

        const checkPayment = await Payment.findOne({
            where: {
                id: payment_type_id
            }
        });
        if (!checkPayment) throw new HttpExceptionNotFound("Payment id not found");

        const totalReturn = total_paid - findOrder.total_price;

        await Order.update({
            payment_type_id,
            total_paid,
            total_return: totalReturn,
            status: "PAID",
            receipt_code: randomString.generate({ length: 8, capitalization: "uppercase" })
        }, {
            where: {
                id
            }
        });

        const data = await Order.findOne({
            where: {
                id
            }
        });

        return data;
    }

    public async getOrderById(id: string): Promise<Order> {
        const data = await Order.findOne({
            where: {
                id
            },
            include: {
                model: OrderProduct,
                as: "order_products",
            }
        });

        if (!data) {
            throw new HttpExceptionNotFound("Order id not found");
        }

        return data;
    }

    public async deleteOrder(id: string): Promise<IReturnDeletedOrder> {
        let order_product = 0;
        order_product = await OrderProduct.destroy({
            where: {
                order_id: id
            }
        });

        const order = await Order.destroy({
            where: {
                id
            }
        });

        return {
            order,
            order_product
        };
    }

    // *handling by routing order-product
    public async getOrderProductById(id: string): Promise<OrderProduct[] | null> {
        const data = await OrderProduct.findAll({
            where: {
                order_id: id
            }
        });

        return data;
    }

    public async createOrderProduct(orderProduct: ICreaateOrderProduct): Promise<OrderProduct | undefined> {
        const { product_id, qty, user_id } = orderProduct;
        const orderId = UUIDv4();
        let createdOrderProduct: OrderProduct | undefined;
        const t = await TRANSACTION();
        t.LOCK.UPDATE;

        const dataProduct = await Product.findOne({
            where: {
                id: product_id
            }
        });
        if (!dataProduct) {
            throw new HttpExceptionNotFound("Product id not found");
        }

        const checkUser = await User.findOne({
            where: {
                id: user_id,
            }
        });
        if (!checkUser) {
            throw new HttpExceptionNotFound("User id not found");
        }

        const checkOrderUser = await Order.findOne({
            where: {
                user_id,
                status: "BUYING"
            }
        });

        const totalPrice = dataProduct?.price * qty;

        if (!checkOrderUser) {
            OrderProduct.beforeCreate(async () => {
                await Order.create({
                    id: orderId,
                    user_id: user_id,
                    status: "BUYING",
                    name: checkUser.full_name,
                }, {
                    transaction: t
                });
            });

            createdOrderProduct = await OrderProduct.create({
                order_id: orderId,
                product_id,
                qty,
                total_price: totalPrice
            }, {
                transaction: t
            });

            await Order.update({
                total_price: totalPrice
            }, {
                where: {
                    id: orderId
                },
                transaction: t
            });
        }

        if (checkOrderUser) {
            createdOrderProduct = await OrderProduct.create({
                order_id: checkOrderUser?.id,
                product_id,
                qty,
                total_price: totalPrice
            }, { transaction: t }
            );

            // update price
            const dataOrder = await Order.findOne({
                where: {
                    id: checkOrderUser?.id
                }
            });
            if (!dataOrder) {
                throw new HttpExceptionNotFound("Order id not found for updating price");
            }

            const totalPriceOrder = dataOrder?.total_price + totalPrice;
            await Order.update({
                total_price: totalPriceOrder
            }, {
                where: {
                    id: checkOrderUser?.id
                },
                transaction: t
            });

        }

        t.commit();
        return createdOrderProduct;
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

    public async deleteOrderProduct(id: string): Promise<number> {
        const deleted = await OrderProduct.destroy({
            where: {
                id
            }
        });

        return deleted;
    }
}

export default OrderService;