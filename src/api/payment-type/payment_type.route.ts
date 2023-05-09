import PaymentTypeController from "./payment_type.controller";
import { Routes } from "@/interfaces/routes.interface";
import authentication from "@/middleware/authentication.middleware";
import authorization from "@/middleware/authorization.middleware";
import { Router } from "express";
import { ADMIN_ROLE } from "@/utils/constant.utils";
import validationMiddleware from "@/middleware/validation.middleware";
import { CreatePaymentDTO, ParamsUuidDTO, UpdatePaymentDTO } from "./payment_type.dto";

class PaymentTypeRoute implements Routes {
    public path = "/payment-type";
    public router = Router();

    private paymentCtrl = new PaymentTypeController();

    constructor() {
        this.initializedRoutes();
    }

    private initializedRoutes(): void {
        this.router.get(
            `${this.path}`,
            authentication,
            authorization(ADMIN_ROLE as string),
            this.paymentCtrl.getAllPayment
        );
        this.router.get(
            `${this.path}/:id`,
            authentication,
            authorization(ADMIN_ROLE as string),
            validationMiddleware(ParamsUuidDTO, "params"),
            this.paymentCtrl.getPaymentById
        );
        this.router.put(
            `${this.path}/:id`,
            authentication,
            authorization(ADMIN_ROLE as string),
            validationMiddleware(ParamsUuidDTO, "params"),
            validationMiddleware(UpdatePaymentDTO, "body"),
            this.paymentCtrl.updatePayment
        );
        this.router.post(
            `${this.path}`,
            authentication,
            authorization(ADMIN_ROLE as string),
            validationMiddleware(CreatePaymentDTO, "body"),
            this.paymentCtrl.createPayment
        );
        this.router.delete(
            `${this.path}/:id`,
            authentication,
            validationMiddleware(ParamsUuidDTO, "params"),
            authorization(ADMIN_ROLE as string),
            this.paymentCtrl.deletePayment
        );
    }
}

export default PaymentTypeRoute;