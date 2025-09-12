import express, { NextFunction, Request, Response } from "express";
import { vacationService } from "../4-services/vacation-service";

class DataController {

    public readonly router = express.Router();

    public constructor() {
        this.router.get("/___", this.getAll___);
    }

    private async getAll___(request: Request, response: Response, next: NextFunction) {
	   const targets = await vacationService.get__();
	        response.json(targets);

}

export const dataController = new DataController();
