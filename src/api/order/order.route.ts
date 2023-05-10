import { Router } from "express";
import authentication from "@/middleware/authentication.middleware";
import validationMiddleware from "@/middleware/validation.middleware";
import authorization from "@/middleware/authorization.middleware";
import { CreateOrderProductDTO, IsUUIDDTO, UpdateForPaymentOrderDTO, UpdateOrderProductDTO } from "./order.dto";
import OrderController from "./order.controller";
import { CASHIER_ROLE, ADMIN_ROLE } from "@/utils/constant.utils";
import { Routes } from "@/interfaces/routes.interface";

class OrderRoute implements Routes {
    public path = "/order";
    public router = Router();
    private orderCtrl = new OrderController();

    constructor() {
        this.initializedRoutes();
    }

    private initializedRoutes(): void {
        this.router.get(
            `${this.path}`,
            authentication,
            authorization([CASHIER_ROLE, ADMIN_ROLE]),
            this.orderCtrl.getOrders
        );

        this.router.get(
            `${this.path}/:id`,
            authentication,
            authorization([CASHIER_ROLE, ADMIN_ROLE]),
            validationMiddleware(IsUUIDDTO, "params"),
            this.orderCtrl.getOrderById
        );

        this.router.delete(
            `${this.path}/:id`,
            authentication,
            authorization([CASHIER_ROLE, ADMIN_ROLE]),
            validationMiddleware(IsUUIDDTO, "params"),
            this.orderCtrl.deleteOrder
        );

        this.router.put(
            `${this.path}/:id`,
            authentication,
            authorization([CASHIER_ROLE, ADMIN_ROLE]),
            validationMiddleware(IsUUIDDTO, "params"),
            validationMiddleware(UpdateForPaymentOrderDTO, "body"),
            this.orderCtrl.updateForPaymentOrder
        );

        // oder-product
        this.router.post(
            `${this.path}-product`,
            authentication,
            authorization([CASHIER_ROLE, ADMIN_ROLE]),
            validationMiddleware(CreateOrderProductDTO, "body"),
            this.orderCtrl.createOrderProduct
        );

        this.router.put(
            `${this.path}-product/:id`,
            authentication,
            authorization([CASHIER_ROLE, ADMIN_ROLE]),
            validationMiddleware(IsUUIDDTO, "params"),
            validationMiddleware(UpdateOrderProductDTO, "body"),
            this.orderCtrl.updateQtyOrderProduct
        );

        this.router.delete(
            `${this.path}-product/:id`,
            authentication,
            authorization([CASHIER_ROLE, ADMIN_ROLE]),
            validationMiddleware(IsUUIDDTO, "params"),
            this.orderCtrl.deleteOrderProduct
        );

        this.router.get(
            `${this.path}-product/:id`,
            authentication,
            authorization([CASHIER_ROLE, ADMIN_ROLE]),
            validationMiddleware(IsUUIDDTO, "params"),
            this.orderCtrl.getOrderProductById
        );


    }
}

export default OrderRoute;