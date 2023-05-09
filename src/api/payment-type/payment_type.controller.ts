import expressAsyncHandler from "express-async-handler";
import { Request, Response } from "express";
import { apiResponse } from "@/utils/apiResponse.utils";
import PaymentTypeService from "./payment_type.service";
import { StatusCodes as STATUS } from "http-status-codes";


class PaymentTypeController {
    private paymentSvc = new PaymentTypeService();

    public getAllPayment = expressAsyncHandler(async (req: Request, res: Response) => {
        const data = await this.paymentSvc.getAllPayment();

        res.status(200).json(apiResponse(STATUS.OK, "Success get all payment", data));
    });

    public getPaymentById = expressAsyncHandler(async (req: Request, res: Response) => {
        const { id } = req.params;

        const data = await this.paymentSvc.getPaymentById(id);

        res.status(200).json(apiResponse(STATUS.OK, "Success get payment by id", data));
    });

    public createPayment = expressAsyncHandler(async (req: Request, res: Response) => {
        const data = req.body;

        const created = await this.paymentSvc.createPayment(data);

        res.status(201).json(apiResponse(201, "Success create payment", created));
    });

    public updatePayment = expressAsyncHandler(async (req: Request, res: Response) => {
        const { id } = req.params;
        const data = req.body;

        const updated = await this.paymentSvc.updatePayment(id, data);

        res.status(200).json(apiResponse(STATUS.OK, "Success update payment", updated));
    });

    public deletePayment = expressAsyncHandler(async (req: Request, res: Response) => {
        const { id } = req.params;

        const deleted = await this.paymentSvc.deletePayment(id);

        res.status(200).json(apiResponse(STATUS.OK, `Success delete ${deleted} payment`));
    });
}

export default PaymentTypeController;