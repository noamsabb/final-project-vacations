import express, { Request, Response, Router } from "express";
import { CredentialsModel } from "../3-models/credentials-model";
import { StatusCode } from "../3-models/enums";
import { UserModel } from "../3-models/user-model";
import { userService } from "../4-services/user-service";
import { securityMiddleware } from "../6-middleware/security-middleware";
import { VacationModel } from "../3-models/vacation-model";

class UserController {
  // Router object - holds all routes:
  public router: Router = express.Router();

  // Register routes:
  public constructor() {
    this.router.post("/api/register", this.register);
    this.router.post("/api/login", this.login);
    this.router.put(
      "/api/user/:_id/like",
      securityMiddleware.verifyToken,
      this.likeVacation
    );
    this.router.get(
      "/api/user/:_id/like",
      securityMiddleware.verifyToken,
      this.getLikedVacations
    );
    this.router.get(
      "/api/user/:_id/liked-filtered",
      securityMiddleware.verifyToken,
      this.getLikedVacationFiltered
    );
  }

  // Register a new user:
  private async register(request: Request, response: Response) {
    const user = new UserModel(request.body);
    const token = await userService.register(user);
    response.status(StatusCode.Created).json(token);
    console.log("New user registered");
  }

  // Login as existing user:
  private async login(request: Request, response: Response) {
    const credentials = new CredentialsModel(request.body);
    const token = await userService.login(credentials);
    response.json(token);
    console.log("user logged-in");
  }

  private async likeVacation(request: Request, response: Response) {
    const userId = request.params._id;
    const vacationId = request.body.vacationId;

    await userService.likeVacation(userId, vacationId);
    const updatedUser = await UserModel.findById(userId).exec();
    const updatedVacation = await VacationModel.findById(vacationId).exec();

    response
      .status(StatusCode.OK)
      .json({ user: updatedUser, vacation: updatedVacation });
  }

  private async getLikedVacations(request: Request, response: Response) {
    const userId = request.params._id;
    const likedVacations = await userService.getLikedVacations(userId);
    response.json(likedVacations);
  }

  private async getLikedVacationFiltered(request: Request, response: Response) {
    const filter = request.query.filter as string;
    const userId = request.params._id;
    const likedVacations = await userService.getLikedVacationFiltered(userId,filter );
    response.json(likedVacations);
  }
}

export const userController = new UserController();
