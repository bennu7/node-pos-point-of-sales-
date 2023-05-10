import expressAsyncHandler from "express-async-handler";
import { Request, Response } from "express";
import { StatusCodes as STATUS } from "http-status-codes";

import { apiResponse } from "@/utils/apiResponse.utils";
import { ICreaateOrderProduct, IUpdatePaymentOrder } from "./order.dto";
import OrderService from "./order.service";

class OrderController {
    private orderSvc = new OrderService();

    public getOrders = expressAsyncHandler(async (req: Request, res: Response) => {
        const data = await this.orderSvc.getOrders();

        res.status(STATUS.OK).json(
            apiResponse(STATUS.OK, "Success get all orders", data)
        );
    });

    public getOrderById = expressAsyncHandler(async (req: Request, res: Response) => {
        const { id } = req.params;

        const data = await this.orderSvc.getOrderById(id);

        res.status(STATUS.OK).json(
            apiResponse(STATUS.OK, "Success get Order by id", data)
        );
    });

    public deleteOrder = expressAsyncHandler(async (req: Request, res: Response) => {
        const { id } = req.params;

        const { order, order_product } = await this.orderSvc.deleteOrder(id);

        res.status(STATUS.OK).json(
            apiResponse(STATUS.OK, `Success delete ${order} order and ${order_product} order product`)
        );
    });

    public updateForPaymentOrder = expressAsyncHandler(async (req: Request, res: Response) => {
        const { id } = req.params;
        const data = req.body as IUpdatePaymentOrder;

        const updated = await this.orderSvc.updateForPaymentOrder(id, data);

        res.status(STATUS.OK).json(
            apiResponse(STATUS.OK, "User successfully paid for the Order", updated)
        );
    });

    // *handling by routing order-product
    public getOrderProductById = expressAsyncHandler(async (req: Request, res: Response) => {
        const { id } = req.params;

        const data = await this.orderSvc.getOrderProductById(id);

        res.status(STATUS.OK).json(
            apiResponse(STATUS.OK, "Success get Order Product by id", data)
        );
    });

    public createOrderProduct = expressAsyncHandler(async (req: Request, res: Response) => {
        const data = req.body as ICreaateOrderProduct;

        const created = await this.orderSvc.createOrderProduct(data);

        res.status(STATUS.CREATED).json(
            apiResponse(STATUS.CREATED, "Success create order product", created)
        );
    });

    public updateQtyOrderProduct = expressAsyncHandler(async (req: Request, res: Response) => {
        const { id } = req.params;
        const data = req.body;

        const updated = await this.orderSvc.updateQtyOrderProduct(id, data);

        res.status(STATUS.OK).json(
            apiResponse(STATUS.OK, "Success update quantity order product", updated)
        );
    });

    public deleteOrderProduct = expressAsyncHandler(async (req: Request, res: Response) => {
        const { id } = req.params;

        const deleted = await this.orderSvc.deleteOrderProduct(id);

        res.status(STATUS.OK).json(
            apiResponse(STATUS.OK, `Success delete ${deleted} order product`)
        );
    });
}

export default OrderController;