import Address from "../../../invoice/value-object/address";
import AddClientUsecase from "./add-client.usecase";

const MockRepository = () => {
    return {
        add: jest.fn(),
        find: jest.fn(),
    }
}

describe("Add client usecase unit test", () => {

    it("should add a client", async () => {
        
        const repository = MockRepository();
        const usecase = new AddClientUsecase(repository);
        const input = {
            name: "Client 1",
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
        const result = await usecase.execute(input);

        expect(repository.add).toHaveBeenCalled();
        expect(result.id).toBeDefined()
        expect(result.name).toBe(input.name)
        expect(result.email).toBe(input.email)
        expect(result.address.state).toBe(input.address.state)
    })
})