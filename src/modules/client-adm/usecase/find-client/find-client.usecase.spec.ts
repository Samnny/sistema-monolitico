import Id from "../../../@shared/domain/value-object/id.value-object"
import Client from "../../domain/client.entity"
import FindClientUsecase from "./find-client.usecase"

const client = new Client({
    id: new Id("1"),
    name: "Client 1",
    email: "client@gmail.com",
    address: "Address 1"
})
const MockRepository = () => {
    return {
        add: jest.fn(),
        find: jest.fn().mockReturnValue(Promise.resolve(client))
    }
}

describe("Find client usecase unit test", () => {

    it("should find a client", async () => {
        
        const repository = MockRepository();
        const usecase = new FindClientUsecase(repository);
        const input = {
            id: "1"
        }
        const result = await usecase.execute(input);

        expect(repository.find).toHaveBeenCalled();
        expect(result.id).toBe(input.id)
        expect(result.name).toBe(client.name)
        expect(result.email).toBe(client.email)
        expect(result.address).toBe(client.address)
        expect(result.createdAt).toBe(client.createdAt)
        expect(result.updatedAt).toBe(client.updatedAt)
    })
})