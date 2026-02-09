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
        // await app.start();
        const credentials = { email: "marge@gmail.com", password: "1234" };
        const response = await supertest(app.server).post("/api/login").send(credentials);
        token = response.body;
    });


    //Get All vacations, no filter, no pagination 
    it("should return all vacations when no page/limit are provided", async () => {
    const response = await supertest(app.server)
        .get("/api/vacations")
        .auth(token, { type: "bearer" });

    expect(response.status).to.equal(StatusCode.OK);

    const result = response.body;

    // Expect top-level response keys
    expect(result).to.have.keys("vacations", "total");

    // vacations should be an array
    expect(result.vacations).to.be.an("array");

    // total should match length
    expect(result.total).to.equal(result.vacations.length);

    // If there are any vacations, validate their shape
    if (result.vacations.length > 0) {
        expect(result.vacations[0]).to.include.keys(
            "_id",
            "destination",
            "description",
            "startDate",
            "endDate",
            "price",
            "likes"
        );
    }
});

//Test Get all vacations with pagination system
it("should return paginated vacations when page and limit are provided", async () => {
    const page = 1;
    const limit = 2;

    const response = await supertest(app.server)
        .get(`/api/vacations?page=${page}&limit=${limit}`)
        .auth(token, { type: "bearer" });

    expect(response.status).to.equal(StatusCode.OK);

    const result = response.body;

    // Expect pagination fields
    expect(result).to.have.keys("vacations", "total", "page", "totalPages");

    // Vacations should be an array
    expect(result.vacations).to.be.an("array");

    // Length of vacations must not exceed the limit
    expect(result.vacations.length).to.be.at.most(limit);

    // Page should equal what we requested
    expect(result.page).to.equal(page);

    // totalPages must be a positive number
    expect(result.totalPages).to.be.greaterThan(0);

    // If there are any vacations, validate their shape
    if (result.vacations.length > 0) {
        expect(result.vacations[0]).to.include.keys(
            "_id",
            "destination",
            "description",
            "startDate",
            "endDate",
            "price",
            "likes"
        );
    }
});

    //Get vacations filtered "upcoming", no pagination 
it("should return only upcoming vacations when filter=upcoming", async () => {
    const response = await supertest(app.server)
        .get("/api/vacations?filter=upcoming")
        .auth(token, { type: "bearer" });

    expect(response.status).to.equal(StatusCode.OK);

    const result = response.body;

    // Expected fields in response
    expect(result).to.have.keys("vacations", "total");

    expect(result.vacations).to.be.an("array");

    // If we have vacations, check that all are in the future
    if (result.vacations.length > 0) {
        const now = new Date();
        for (const vacation of result.vacations) {
            const startDate = new Date(vacation.startDate);
            expect(startDate.getTime()).to.be.greaterThan(now.getTime());
            expect(vacation).to.include.keys(
                "_id",
                "destination",
                "description",
                "startDate",
                "endDate",
                "price",
                "likes"
            );
        }
    }
});


it("should add a new vacation with valid values", async () => {
    const imagePath = path.join(__dirname, "..", "src", "1-assets", "images", "Bali.jpg");

    // Future dates
    const startDate = new Date();
    startDate.setMonth(startDate.getMonth() + 1);
    const endDate = new Date(startDate);
    endDate.setDate(startDate.getDate() + 7);

    const response = await supertest(app.server)
        .post("/api/vacations")
        .auth(token, { type: "bearer" })
        .field("destination", "Tokyo, Japan")
        .field("description", "Explore the vibrant city of Tokyo in spring")
        .field("startDate", startDate.toISOString().split("T")[0])
        .field("endDate", endDate.toISOString().split("T")[0])
        .field("price", "2200")
        .attach("image", imagePath);

    expect(response.status).to.equal(StatusCode.Created);

    const dbVacation: IVacationModel = response.body;

    expect(dbVacation).to.include.keys(
        "_id",
        "destination",
        "description",
        "startDate",
        "endDate",
        "price",
        "imageName",
        "likes"
    );
    expect(dbVacation.destination).to.equal("Tokyo, Japan");
});

it("should fail to add a vacation with invalid dates", async () => {
    const imagePath = path.join(__dirname, "..", "src", "1-assets", "images", "Tokyo.jpg");

    // Invalid: endDate before startDate
    const startDate = new Date();
    startDate.setMonth(startDate.getMonth() + 2);
    const endDate = new Date(startDate);
    endDate.setDate(startDate.getDate() - 5);

    const response = await supertest(app.server)
        .post("/api/vacations")
        .auth(token, { type: "bearer" })
        .field("destination", "Tokyo, Japan")
        .field("description", "This vacation should fail because of bad dates")
        .field("startDate", startDate.toISOString().split("T")[0])
        .field("endDate", endDate.toISOString().split("T")[0])
        .field("price", "2200")
        .attach("image", imagePath);

    expect(response.status).to.equal(StatusCode.BadRequest);

    // Optional: check for validation error message in body
    expect(response.body.message).to.match(/date/i);
});

    it("should return a page 404 error", async () => {
        const response = await supertest(app.server).get("/api/nothing-here");
        expect(response.status).to.be.equal(StatusCode.NotFound);
    });


});