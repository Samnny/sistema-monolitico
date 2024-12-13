import Address from "../../../invoice/value-object/address";
import ClientGateway from "../../gateway/client.gateway";
import { FindClientInputDto, FindClientOutputDto } from "./find-client.usecase.dto";

export default class FindClientUsecase {

    private _clientRepository: ClientGateway;

    constructor(clientRepository: ClientGateway) {
        this._clientRepository = clientRepository
    }

    async execute(input: FindClientInputDto): Promise<FindClientOutputDto> {
        const client = await this._clientRepository.find(input.id);

        return {
            id: client.id.id,
            name: client.name,
            email: client.email,
            document: client.document,
            address: new Address(
              client.address.street,
              client.address.number,
              client.address.zip,
              client.address.city,
              client.address.complement,
              client.address.state,
            ),
            createdAt: client.createdAt,
            updatedAt: client.updatedAt
        }
    }
}