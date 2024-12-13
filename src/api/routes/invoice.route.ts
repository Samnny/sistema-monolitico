import express, { Request, Response } from "express";
import InvoiceFacadeFactory from "../../modules/invoice/factory/facade.factory";
export const invoiceRoute = express.Router();

invoiceRoute.post("/", async (req: Request, res: Response) => {
    const invoiceFacadeFactory = InvoiceFacadeFactory.create();

    try {
        const invoice = {
            name: req.body.name,
            document: req.body.document,
            street: req.body.street,
            number: req.body.number,
            complement: req.body.complement,
            city: req.body.city,
            state: req.body.state,
            zipCode: req.body.zipCode,
            items: req.body.items
        };

        const output = await invoiceFacadeFactory.generate(invoice);
        
        res.status(200).send({
            id: output.id
        });
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
});


invoiceRoute.get("/:id", async (req: Request, res: Response) => {
    const invoiceFacadeFactory = InvoiceFacadeFactory.create();
    try {
        const input = {
            id: req.params.id
        };
        const output = await invoiceFacadeFactory.find(input);
        res.status(200).send(output);
    } catch (err) {
        console.log(err)
        res.status(500).send(err);
    }
});