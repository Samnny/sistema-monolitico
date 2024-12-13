import { Sequelize } from "sequelize-typescript";
import { ClientModel } from "./client.model";
import ClientRepository from "./client.repository";
import Client from "../domain/client.entity";
import Id from "../../@shared/domain/value-object/id.value-object";
import Address from "../../invoice/value-object/address";

describe("Client repository test", () => {
    
    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: "sqlite",
            storage: ":memory:",
            logging: false,
            sync: { force: true }
        });

        await sequelize.addModels([ClientModel]);
        await sequelize.sync();
    });

    afterEach(async () => {
        await sequelize.close();
    })

    it("should create a client", async () => {

        const client = new Client({
            id: new Id("1"),
            name: "Client",
            email: "client@gmail.com",
            document: "12345678",
            address: new Address(
                "Rua 2",
                "10",
                "60540578",
                "Fortal",
                "Casa",
                "CE",
            )
        })
        const repository = new ClientRepository();
        await repository.add(client);

        const clientModel = await ClientModel.findOne({ where: { id: "1" }});

        expect(clientModel).toBeDefined();
        expect(clientModel.id).toBe(client.id.id);
        expect(clientModel.name).toBe(client.name);
        expect(clientModel.email).toBe(client.email);
        expect(clientModel.street).toBe(client.address.street);
        expect(clientModel.createdAt).toStrictEqual(client.createdAt);
        expect(clientModel.updatedAt).toStrictEqual(client.updatedAt);
    })

    it("should find a client", async () => {
        
        const client = await ClientModel.create({
            id: "1",
            name: "Client",
            email: "client@gmail.com",
            document: "12345678",
            street: "Rua 2",
            number: "10",
            zipcode: "60540578",
            city: "Fortal",
            complement: "Casa",
            state: "CE",
            createdAt: new Date(),
            updatedAt: new Date()
        })
        const repository = new ClientRepository();
        const result = await repository.find(client.id)

        expect(result.id.id).toEqual(client.id);
        expect(result.name).toEqual(client.name);
        expect(result.email).toEqual(client.email);
        expect(result.address.street).toEqual(client.street);
        expect(result.createdAt).toEqual(client.createdAt);
        expect(result.updatedAt).toEqual(client.updatedAt);
    })
})