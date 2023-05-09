import { Router } from "express";
import OrderController from "./order.controller";
import { Routes } from "@/interfaces/routes.interface";
import authentication from "@/middleware/authentication.middleware";

class OrderRoute implements Routes {
    public path = "/order";
    public router = Router();
    private orderCtrl = new OrderController();

    constructor() {
        this.initializedRoutes();
    }

    private initializedRoutes(): void {
        this.router.post(
            `${this.path}-product`,
            authentication,
            this.orderCtrl.createOrderProduct
        );

        this.router.put(
            `${this.path}-product/:id`,
            authentication,
            this.orderCtrl.updateQtyOrderProduct
        );
    }
}

export default OrderRoute;