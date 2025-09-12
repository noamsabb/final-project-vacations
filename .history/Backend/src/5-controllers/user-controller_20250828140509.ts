import express, { Request, Response, Router } from "express";
import { CredentialsModel } from "../3-models/credentials-model";
import { StatusCode } from "../3-models/enums";
import { UserModel } from "../3-models/user-model";
import { userService } from "../4-services/user-service";

class UserController {
  // Router object - holds all routes:
  public router: Router = express.Router();

  // Register routes:
  public constructor() {
    this.router.post("/api/register", this.register);
    this.router.post("/api/login", this.login);
    this.router.post("/api/users/:_id/like", this.likeVacation);
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

  private async likeVacation(request: Request, response: Response){
    const userId = request.params._id;  // Get user ID from URL parameter
    const vacationId = request.body.vacationId;  // Get vacation ID from request body

    await userService.likeVacation(userId, vacationId);
    response.status(StatusCode.Created).json({ message: "Vacation liked successfully" });

    console.log(`User ${userId} liked vacation ${vacationId}`);
  }
}

export const userController = new UserController();
