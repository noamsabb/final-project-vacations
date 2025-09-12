import express, { Request, Response, Router } from "express";
import { CredentialsModel } from "../3-models/credentials-model";
import { StatusCode } from "../3-models/status-code";
import { UserModel } from "../3-models/user-model";
import { userService } from "../4-services/user-service";

class UserController {

    // Router object - holds all routes: 
    public router: Router = express.Router();

    // Register routes: 
    public constructor() {
        this.router.post("/api/register", this.register);
        this.router.post("/api/login", this.login);
    }

    // Register a new user: 
    private async register(request: Request, response: Response) {
        const user = new UserModel(request.body);
        const token = await userService.register(user);
        response.status(StatusCode.Created).json(token);
    }

    // Login as existing user: 
    private async login(request: Request, response: Response) {
        const credentials = new CredentialsModel(request.body);
        const token = await userService.login(credentials);
        response.json(token);
    }
}

export const userController = new UserController();
