import { HttpExceptionNotFound } from "@/exceptions/HttpException";
import { ICreatePayment } from "./payment_type.dto";
import Payment from "@/models/payment.model";

class PaymentTypeService {
    public createPayment = async (payment: ICreatePayment): Promise<Payment> => {
        const { name, type, logo } = payment;

        const created = await Payment.create({
            name,
            type,
            logo
        });

        return created;
    };

    public getAllPayment = async (): Promise<Payment[]> => {
        const data = await Payment.findAll();

        return data;
    };

    public getPaymentById = async (id: string): Promise<Payment> => {
        const data = await Payment.findOne({
            where: {
                id
            }
        });

        if (!data) {
            throw new HttpExceptionNotFound("Payment id not found");
        }

        return data;
    };

    public updatePayment = async (id: string, payment: ICreatePayment): Promise<Payment | null> => {
        const { name, type, logo } = payment;


        const data = await Payment.findOne({
            where: {
                id
            }
        });
        if (!data) {
            throw new HttpExceptionNotFound("Payment id not found");
        }

        await Payment.update({
            name,
            type,
            logo
        }, {
            where: {
                id
            }
        });

        const show = await Payment.findOne({
            where: {
                id
            }
        });

        return show;
    };

    public deletePayment = async (id: string): Promise<number> => {
        const deleted = await Payment.destroy({
            where: {
                id
            }
        });

        if (!deleted) {
            throw new HttpExceptionNotFound("Payment id not found");
        }

        return deleted;
    };

}

export default PaymentTypeService;