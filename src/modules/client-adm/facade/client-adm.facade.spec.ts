import { Sequelize } from "sequelize-typescript";
import { ClientModel } from "../repository/client.model";
import ClientRepository from "../repository/client.repository";
import AddClientUsecase from "../usecase/add-client/add-client.usecase";
import ClientAdmFacade from "./client-adm.facade";
import FindClientUsecase from "../usecase/find-client/find-client.usecase";
import ClientAdmFacadeFactory from "../factory/client-adm.facade.factory";
import Address from "../../invoice/value-object/address";

describe("Client adm facade test", () => {
    
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
        
        const repository = new ClientRepository();
        const addUsecase = new AddClientUsecase(repository);
        const facade = new ClientAdmFacade({
            addUsecase: addUsecase,
            findUsecase: undefined
        })
        const input = {
            id: "1",
            name: "Client",
            email: "client@gmail.com",
            document: "12345678",
            address: new Address(
                "Rua 2",
                "10",
                "60540578",
                "Fortal",
                "Casa",
                "CE"
            )
        }

        await facade.add(input)

        const client = await ClientModel.findOne({ where: { id: "1" }});

        expect(client).toBeDefined();
        expect(client.id).toBe(input.id);
        expect(client.name).toBe(input.name);
        expect(client.email).toBe(input.email);
        expect(client.document).toBe(input.document)
        expect(client.street).toBe(input.address.street)
    })

    it("should find a client", async () => {
        
        const facade = ClientAdmFacadeFactory.create();
        
        await ClientModel.create({
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

        const client = await facade.find({ id: "1" });

        expect(client).toBeDefined();
        expect(client.id).toBe("1");
        expect(client.name).toBe("Client");
        expect(client.email).toBe("client@gmail.com");
        expect(client.address.state).toBe("CE");
    })
})