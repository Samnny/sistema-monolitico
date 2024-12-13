import { app, sequelize } from "../express";
import request from "supertest";

describe("E2E test checkout", () => {

    beforeEach(async () => {
        await sequelize.sync({ force: true })
    })

    afterAll(async () => {
        await sequelize.close()
    })

    it("create checkout", async () => {

        const response = await request(app)
            .post("/checkout")
            .send({
                orderId: "order",
                amount: 100,
            })
        expect(response.status).toBe(200)
        expect(response.body.orderId).toBe("order")
        expect(response.body.amount).toBe(100)
        expect(response.body.status).toBe("approved")
    })
})