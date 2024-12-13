import express, { Request, Response } from "express";
import PaymentFacadeFactory from "../../modules/payment/factory/payment.facade.factory";
import PlaceOrderUsecase from "../../modules/checkout/usecase/place-order/place-order.usecase";
import ClientAdmFacadeFactory from "../../modules/client-adm/factory/client-adm.facade.factory";
import ProductAdmFacadeFactory from "../../modules/product-adm/factory/facade.factory";
import StoreCatalogFacadeFactory from "../../modules/store-catalog/factory/facade.factory";
import InvoiceFacadeFactory from "../../modules/invoice/factory/facade.factory";
export const checkoutRoute = express.Router();

checkoutRoute.post("/", async (req: Request, res: Response) => {

    const payment = PaymentFacadeFactory.create();

    try {
        const input = {
            orderId: req.body.orderId,
            amount: req.body.amount
        };

        const output = await payment.process(input);
        res.status(200).send(output);
    } catch (err) {
        res.status(500).send(err);
    }
});