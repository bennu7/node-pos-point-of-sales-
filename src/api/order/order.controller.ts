import expressAsyncHandler from "express-async-handler";
import { Request, Response } from "express";
import { StatusCodes as STATUS } from "http-status-codes";

import { apiResponse } from "@/utils/apiResponse.utils";
import { ICreaateOrderProduct, ICreateOrder } from "./order.dto";
import OrderService from "./order.service";

class OrderController {
    private orderSvc = new OrderService();

    public getOrders = expressAsyncHandler(async (req: Request, res: Response) => {
        const data = await this.orderSvc.getOrders();

        res.status(STATUS.OK).json(
            apiResponse(STATUS.OK, "Success get all orders", data)
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
}

export default OrderController;