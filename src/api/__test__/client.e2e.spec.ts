import { app, sequelize } from "../express";
import request from "supertest";

describe("E2E test client", () => {

    beforeEach(async () => {
        await sequelize.sync({ force: true })
    })

    afterAll(async () => {
        await sequelize.close()
    })

    it("should create a client", async () => {

        const response = await request(app)
            .post("/client")
            .send({
                name: "Client",
                email: "client@gmail.com",
                document: "12345678",
                street: "Street",
                number: "10",
                zipCode: "12345678",
                city: "City",
                complement: "Complement",
                state: "State",
            })

        expect(response.status).toBe(200)
    })
})