import { app, sequelize } from "../express";
import request from "supertest";

describe("E2E test invoice", () => {

    beforeEach(async () => {
        await sequelize.sync({ force: true })
    })

    afterAll(async () => {
        await sequelize.close()
    })

    it("should create invoice", async () => {

        const response = await request(app)
            .post("/invoice")
            .send({
                name: "name",
                document: "12345678",
                street: "street",
                number: "10",
                complement: "complement",
                city: "city",
                state: "state",
                zipCode: "60540578",
                items: [
                    {
                        id: "1",
                        name: "product",
                        price: 100
                    },
                    {
                        id: "2",
                        name: "product",
                        price: 200
                    }
                ]
            })

        expect(response.status).toBe(200);

        const invoiceResponse = await request(app).get("/invoice/"+response.body.id).send();

        expect(invoiceResponse.status).toBe(200);
        expect(invoiceResponse.body.id).toBe(response.body.id);
        expect(invoiceResponse.body.name).toBe("name");
        expect(invoiceResponse.body.document).toBe("12345678");
        expect(invoiceResponse.body.address.street).toBe("street");
        expect(invoiceResponse.body.address.number).toBe("10");
        expect(invoiceResponse.body.address.complement).toBe("complement");
        expect(invoiceResponse.body.address.city).toBe("city");
        expect(invoiceResponse.body.address.state).toBe("state");
        expect(invoiceResponse.body.address.zipCode).toBe("60540578");
        expect(invoiceResponse.body.items[0].id).toBe("1");
        expect(invoiceResponse.body.items[0].name).toBe("product");
        expect(invoiceResponse.body.items[0].price).toBe(100);
        expect(invoiceResponse.body.items[1].id).toBe("2");
        expect(invoiceResponse.body.items[1].name).toBe("product");
        expect(invoiceResponse.body.items[1].price).toBe(200);
    })

})