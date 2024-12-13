import { IsEmail } from "sequelize-typescript";
import Id from "../../@shared/domain/value-object/id.value-object";
import Client from "../domain/client.entity";
import ClientGateway from "../gateway/client.gateway";
import { ClientModel } from "./client.model";
import Address from "../../invoice/value-object/address";

export default class ClientRepository implements ClientGateway {
    
    async add(client: Client): Promise<void> {
        await ClientModel.create({
            id: client.id.id,
            name: client.name,
            email: client.email,
            document: client.document,
            street: client.address.street,
            number: client.address.number,
            zipcode: client.address.zip,
            city: client.address.city,
            complement: client.address.complement,
            state: client.address.state,
            createdAt: client.createdAt,
            updatedAt: client.updatedAt
        })
    }

    async find(id: string): Promise<Client> {
        
        const client = await ClientModel.findOne({ where: { id } })

        if(!client) {
            throw new Error("Client not found")
        }

        return new Client({
            id: new Id(client.id),
            name: client.name,
            email: client.email,
            document: client.document,
            address: new Address(
                client.street,
                client.number,
                client.zipcode,
                client.city,
                client.complement,
                client.state
            ),
            createdAt: client.createdAt,
            updatedAt: client.updatedAt
        })
    }
}