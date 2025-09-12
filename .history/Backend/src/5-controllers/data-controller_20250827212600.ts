import express, { NextFunction, Request, Response, Router } from "express";
import { vacationService } from "../4-services/vacation-service";
import { fileSaver } from "uploaded-file-saver";
import { VacationModel } from "../3-models/vacation-model";
import { UploadedFile } from "express-fileupload";
import { StatusCode } from "../3-models/enums";
import { asyncWrapProviders } from "async_hooks";

class DataController {
  public router: Router = express.Router();

  public constructor() {
    this.router.get("/api/vacations", this.getAllVacations);
    this.router.get("/api/vacations/:_id", this.getOneVacation);
    this.router.post("/api/vacations", this.addVacation);
    this.router.get("/api/vacations/images/:imageName", this.getImage);
    this.router.put("/api/vacations/:_id", this.updateVacation);

    
  }

  private async getAllVacations(request: Request,response: Response,) {
    const vacations = await vacationService.getAllVacations();
    response.json(vacations);
  }
  private async getOneVacation(request: Request,response: Response,) {
    const _id = request.params._id;
    const vacation = await vacationService.getOneVacation(_id);
    response.json(vacation);
  }

  private async addVacation(request: Request, response: Response){
    const vacation = new VacationModel(request.body);
    const dbVacation = await vacationService.addVacation(vacation, request.files?.image as UploadedFile);
    response.status(StatusCode.Created).json(dbVacation);
  }

  private async updateVacation(request: Request, response: Response){
    request.body._id = request.params._id;
    const vacation = new VacationModel(request.body);
    const dbVacation = await vacationService.updateVacation(vacation, request.files?.image as UploadedFile);
    response.json(dbVacation);
  }

  private async deleteVacation(request: Request, response: Response){
    const _id = request.params._id;
    await vacationService.deleteVacation(_id);
    response.sendStatus(StatusCode.NoContent);
  }

  private async getImage(request: Request, response: Response) {
        const imageName = request.params.imageName; 
        const imagePath = fileSaver.getFilePath(imageName); 
        response.sendFile(imagePath); 
    }
}

export const dataController = new DataController();
