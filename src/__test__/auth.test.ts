import request from "supertest";
import app from "../server";

// test login
describe("RUNNING EXPRESS", () => {
    it("SUCCESS 200 OK", async () => {
        const res = await request(app).post("/api/v1/auth/login").send({
            "email": "admin@gmail.com",
            "password": "Password123"
        });

        expect(res.status).toEqual(200);
        expect(res.body).toHaveProperty("status_code");
    });

    it("REJECTED LOGIN 406 user not role admin or cashier", async () => {
        const res = await request(app).post("/api/v1/auth/login").send({
            "email": "user@gmail.com",
            "password": "Password123"
        });

        expect(res.status).toEqual(406);
    });
});
