import express, { NextFunction, Request, Response, Router } from "express";
import { vacationService } from "../4-services/vacation-service";
import { fileSaver } from "uploaded-file-saver";
import { VacationModel } from "../3-models/vacation-model";
import { UploadedFile } from "express-fileupload";
import { StatusCode } from "../3-models/enums";
import { asyncWrapProviders } from "async_hooks";
import { securityMiddleware } from "../6-middleware/security-middleware";


class VacationController {
  public router: Router = express.Router();

  public constructor() {
    // this.router.get("/api/vacations",securityMiddleware.verifyToken, this.getAllVacations);
    this.router.get("/api/vacations", this.getAllVacations);
    this.router.get("/api/vacations/export", this.generateVacationCsv);
    // this.router.post("/api/vacations", securityMiddleware.verifyAdmin, this.addVacation);
    this.router.post("/api/vacations", this.addVacation);
    this.router.get("/api/vacations/images/:imageName", this.getImage);
    this.router.get("/api/vacations/:_id", this.getOneVacation);
    // this.router.put("/api/vacations/:_id", securityMiddleware.verifyAdmin, this.updateVacation);
    this.router.put("/api/vacations/:_id", this.updateVacation);
    // this.router.delete("/api/vacations/:_id", securityMiddleware.verifyAdmin, this.deleteVacation);
    this.router.delete("/api/vacations/:_id", this.deleteVacation);
  }

  private async getAllVacations(request: Request, response: Response) {
    // const filter = request.body.filter; //To test in postman
    const filter = request.query.filter as string;

    const vacations = await vacationService.getAllVacations(filter);
    response.json(vacations);
  }
  private async getOneVacation(request: Request, response: Response) {
    const _id = request.params._id;
    const vacation = await vacationService.getOneVacation(_id);
    response.json(vacation);
  }

  private async addVacation(request: Request, response: Response) {
    const vacation = new VacationModel(request.body);
    const dbVacation = await vacationService.addVacation(
      vacation,
      request.files?.image as UploadedFile
    );
    response.status(StatusCode.Created).json(dbVacation);
  }

  private async updateVacation(request: Request, response: Response) {
    request.body._id = request.params._id;
    const vacation = new VacationModel(request.body);
    const dbVacation = await vacationService.updateVacation(
      vacation,
      request.files?.image as UploadedFile
    );
    response.json(dbVacation);
  }

  private async deleteVacation(request: Request, response: Response) {
    const _id = request.params._id;
    await vacationService.deleteVacation(_id);
    response.sendStatus(StatusCode.NoContent);
  }

  private async getImage(request: Request, response: Response) {
    const imageName = request.params.imageName;
    const imagePath = fileSaver.getFilePath(imageName);
    response.sendFile(imagePath);
  }

  private async generateVacationCsv(request: Request, response: Response) {
    const csvData = await vacationService.generateVacationCsv();
    response.setHeader("Content-Type", "text/csv");
    response.setHeader(
      "Content-Disposition",
      "attachment; filename=vacations.csv"
    );
    response.status(200).send(csvData);
  }
}

export const vacationController = new VacationController();
