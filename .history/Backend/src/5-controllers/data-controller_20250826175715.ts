import express, { NextFunction, Request, Response, Router } from "express";
import { vacationService } from "../4-services/vacation-service";

class DataController {
  public router: Router = express.Router();

  public constructor() {
    this.router.get("/api/vacations", this.getAllVacations);
  }

  private async getAllVacations(request: Request,response: Response,) {
    const vacations = await vacationService.getAllVacations();
    response.json(vacations);
  }
}

export const dataController = new DataController();
