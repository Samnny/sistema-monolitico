import express, { Request, Response } from "express";
import ClientAdmFacadeFactory from "../../modules/client-adm/factory/client-adm.facade.factory";
import Address from "../../modules/invoice/value-object/address";
export const clientRoute = express.Router();

clientRoute.post("/", async (req: Request, res: Response) => {
    const clientFacadeFactory = ClientAdmFacadeFactory.create();

    try {
        const clientDto = {
            id: req.body.id,
            name: req.body.name,
            email: req.body.email,
            document: req.body.document,
            address: new Address(
                req.body.street,
                req.body.number,
                req.body.zipCode,
                req.body.city,
                req.body.complement,
                req.body.state,
            )
        };

        const output = await clientFacadeFactory.add(clientDto);
        res.status(200).send({});
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
});

