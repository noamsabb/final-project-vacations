import { expect } from "chai";
import { describe, it, before } from "mocha";
import supertest from "supertest";
import { app } from "../src/app";
import { IVacationModel } from "../src/3-models/vacation-model";
import path from "path";
import { StatusCode } from "../src/3-models/enums";


describe("Testing VacationController", () => {

    let token: string;

    before(async () => {
        const credentials = { email: "marge@gmail.com", password: "1234" };
        const response = await supertest(app.server).post("/api/login").send(credentials);
        token = response.body;
    });

    it("should return vacation array", async () => {
        const response = await supertest(app.server).get("/api/vacations")
            .auth(token, { type: "bearer" });
        const result = response.body;
        expect(result.vacations).to.be.an('array');
        expect(result.vacations.length).to.be.greaterThanOrEqual(0);
        if (result.vacations.length > 0) {
            expect(result.vacations[0]).to.contain.keys("_id", "destination", "description", "startDate", "endDate", "price", "likes");
        }
    });

    it("should add a new vacation with image", async () => {
        const imagePath = path.join(__dirname, "..", "src", "1-assets", "images", "Bali.jpg");
        
        const futureDate = new Date();
        futureDate.setMonth(futureDate.getMonth() + 2);
        const endDate = new Date(futureDate);
        endDate.setMonth(endDate.getMonth() + 1);

        const response = await supertest(app.server).post("/api/vacations")
            .auth(token, { type: "bearer" })
            .field("destination", "Test Destination")
            .field("description", "This is a test vacation for automated testing")
            .field("startDate", futureDate.toISOString().split('T')[0])
            .field("endDate", endDate.toISOString().split('T')[0])
            .field("price", "1500")
            .attach("image", imagePath);

        const dbVacation: IVacationModel = response.body;

        expect(response.status).to.be.equal(StatusCode.Created);
        expect(dbVacation).to.not.be.empty;
        expect(dbVacation).to.contain.keys("_id", "destination", "description", "startDate", "endDate", "price", "imageName", "likes");
        expect(dbVacation.destination).to.be.equal("Test Destination");
    });

    it("should return a page 404 error", async () => {
        const response = await supertest(app.server).get("/api/nothing-here");
        expect(response.status).to.be.equal(StatusCode.NotFound);
    });

    it("should return a resource 404 error", async () => {
        const response = await supertest(app.server).get("/api/vacations/6e91e29b9c08fc560ce2cf3a")
            .auth(token, { type: "bearer" });
        expect(response.status).to.be.equal(StatusCode.NotFound);
    });

});